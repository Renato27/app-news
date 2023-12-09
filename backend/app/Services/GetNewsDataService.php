<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use jcobhams\NewsApi\NewsApi;

class GetNewsDataService implements GetNewsDataServiceInterface
{
    private string $providerName;
    private string $apiKey;

    public function setProviderName(string $name): GetNewsDataServiceInterface
    {
        $this->providerName = $name;
        return $this;
    }

    public function setApiKey(): GetNewsDataServiceInterface
    {
        $this->apiKey = config("news-providers.providers.{$this->providerName}.apiKey");
        return $this;
    }

    private function newsApiExecute(): bool
    {
        $newsApi = new NewsApi($this->apiKey);
        $categories = $newsApi->getCategories();

        foreach($categories as $category) {
            sleep(2);
            if(!$category) continue;

            $response = $newsApi->getTopHeadLines(null, null, null, $category);

            if($response->status != "ok") continue;

            foreach($response->articles as $article) {
                if(!isset($article->publishedAt) || !isset($article->source)) continue;

                $this->saveDatabase($this->providerName, $category, [
                    "published_at" => $article->publishedAt,
                    "source" => $article->source->name ?? null,
                    "article_title" => $article->title,
                    "description" => $article->description,
                    "author" => $article->author,
                    "url" => $article->url,
                    "result" => json_encode($article)
                ]);
            }
        }

        return true;
    }

    private function nYTimesExecute()
    {
        $apikeyQuery = "?api-key=" . $this->apiKey;
        $baseUrl = config("news-providers.providers.{$this->providerName}.url");

        $baseUrlSections = $baseUrl . "/section-list.json" . $apikeyQuery;

        $categories = Http::get($baseUrlSections)->json();

        if($categories["status"] != "OK") return false;

        foreach($categories["results"] as $category) {
            sleep(2);
            if(!isset($category["section"])) continue;

            $section = $category["section"];
            $baseUrlArticles = $baseUrl ."/all/{$section}.json" . $apikeyQuery;

            $response = Http::get($baseUrlArticles)->json();

            if(!$response) continue;

            if(isset($response["status"]) && $response["status"] != "OK") continue;

            if(!isset($response["results"])) continue;

            foreach($response["results"] as $article) {

                if($article["item_type"] != "Article") continue;

                if(!isset($article["published_date"]) || !isset($article["source"])) continue;

                $this->saveDatabase($this->providerName, $section, [
                    "published_at" => $article["published_date"],
                    "source" => $article["source"] ?? null,
                    "article_title" => $article["title"],
                    "description" => $article["abstract"],
                    "author" => $article["byline"],
                    "url" => $article["url"],
                    "result" => json_encode($article)
                ]);
            }
        }

        return true;
    }

    private function guardianExecute()
    {
        $apikeyQuery = "api-key=" . $this->apiKey;
        $baseUrl = config("news-providers.providers.{$this->providerName}.url");

        $baseUrlSections = $baseUrl . "/sections?" . $apikeyQuery;

        $categories = Http::get($baseUrlSections)->json();

        if(!$categories) return false;

        $categories = $categories["response"];

        if($categories["status"] != "ok") return false;

        foreach($categories["results"] as $category) {
            sleep(2);
            if(!isset($category["id"])) continue;

            if($category["id"] == "about") continue;

            $section = $category["id"];
            $fields = "byline,publication,thumbnail,trailText";
            $baseUrlArticles = $baseUrl ."/search?section={$section}&show-fields={$fields}&" . $apikeyQuery;

            $response = Http::get($baseUrlArticles)->json();

            if(!$response) continue;

            $response = $response["response"];

            if(isset($response["status"]) && $response["status"] != "ok") continue;

            if(!isset($response["results"])) continue;

            foreach($response["results"] as $article) {

                if($article["type"] != "article") continue;

                if(!isset($article["webPublicationDate"]) || !isset($article["fields"]["publication"])) continue;

                $author = $article["fields"]["byline"] ?? null;
                $source = $article["fields"]["publication"] ?? null;
                $description = $article["fields"]["trailText"] ?? null;

                $this->saveDatabase($this->providerName, $section, [
                    "published_at" => $article["webPublicationDate"],
                    "source" => $source,
                    "article_title" => $article["webTitle"],
                    "description" => $description,
                    "author" => $author,
                    "url" => $article["webUrl"],
                    "result" => json_encode($article)
                ]);
            }
        }

        return true;
    }

    private function saveDatabase(string $provider, string $category, array $data)
    {

        $provider = \App\Models\NewsProvider::where("name", $provider)->first();
        $category = $provider->categories()->create([
            "name" => $category
        ]);

        $category->news()->create($data);
    }

    public function handle(): bool
    {
        $name = $this->providerName;

        switch ($name) {
            case 'news_api':
                $this->newsApiExecute();
                break;
            case 'nytimes':
                $this->nYTimesExecute();
                break;
            case 'guardianapis':
                $this->guardianExecute();
                break;
        }
        return true;
    }
}
