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

        foreach ($categories as $category) {
            sleep(2);
            if (!$category) continue;

            $response = $newsApi->getTopHeadLines(null, null, null, $category);

            if ($response->status != "ok") continue;

            foreach ($response->articles as $article) {

                $validateFields = $this->validateFields([
                    $article->source->name,
                    $article->author
                ]);

                if (!$validateFields) continue;

                $categories = [
                    "category" => $category,
                    "source" => $article->source->name ?? null,
                    "author" => $article->author ?? null
                ];

                $this->saveDatabase($this->providerName, $categories, [
                    "published_at" => $article->publishedAt,
                    "article_title" => $article->title,
                    "description" => $article->description,
                    "url" => $article->url,
                    "result" => json_encode($article)
                ]);
            }
        }

        return true;
    }

    private function nYTimesExecute()
    {
        $apikeyQuery = "api-key=" . $this->apiKey;
        $limit = "limit=12";
        $sort = "sort=newest";
        $baseUrl = config("news-providers.providers.{$this->providerName}.url");

        $baseUrlSections = $baseUrl . "/section-list.json?limit=10&" . $apikeyQuery;

        $categories = Http::get($baseUrlSections)->json();

        if ($categories["status"] != "OK") return false;

        $results = array_slice($categories["results"], 0, 10);

        foreach ($results as $category) {
            sleep(2);
            if (!isset($category["section"])) continue;

            if ($category["section"] == "admin") continue;

            $section = $category["section"];
            $baseUrlArticles = $baseUrl . "/all/{$section}.json?{$limit}&{$sort}&{$apikeyQuery}";

            $response = Http::get($baseUrlArticles)->json();

            if (!$response) continue;

            if (isset($response["status"]) && $response["status"] != "OK") continue;

            if (!isset($response["results"])) continue;

            foreach ($response["results"] as $article) {

                if ($article["item_type"] != "Article") continue;

                $validateFields = $this->validateFields([
                    $article["source"],
                    $article["byline"]
                ]);

                if (!$validateFields) continue;

                $categories = [
                    "category" => $section,
                    "source" => $article["source"] ?? null,
                    "author" => $article["byline"] ?? null
                ];

                $this->saveDatabase($this->providerName, $categories, [
                    "published_at" => $article["published_date"],
                    "article_title" => $article["title"],
                    "description" => $article["abstract"],

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
        $sort = "order-by=newest";
        $page = "page=1&page-size=12";
        $baseUrl = config("news-providers.providers.{$this->providerName}.url");

        $baseUrlSections = $baseUrl . "/sections?" . $apikeyQuery;

        $categories = Http::get($baseUrlSections)->json();

        if (!$categories) return false;

        $categories = $categories["response"];

        if ($categories["status"] != "ok") return false;

        $results = array_slice($categories["results"], 0, 10);

        foreach ($results as $category) {
            sleep(2);
            if (!isset($category["id"])) continue;

            if ($category["id"] == "about") continue;

            $section = $category["id"];
            $fields = "byline,publication,thumbnail,trailText";
            $baseUrlArticles = $baseUrl . "/search?section={$section}&show-fields={$fields}&{$page}&{$sort}&" . $apikeyQuery;

            $response = Http::get($baseUrlArticles)->json();

            if (!$response) continue;

            $response = $response["response"];

            if (isset($response["status"]) && $response["status"] != "ok") continue;

            if (!isset($response["results"])) continue;

            foreach ($response["results"] as $article) {

                if ($article["type"] != "article") continue;

                $validateFields = $this->validateFields([
                    $article["fields"]["byline"],
                    $article["fields"]["publication"]
                ]);

                if (!$validateFields) continue;

                $author = $article["fields"]["byline"];
                $source = $article["fields"]["publication"];
                $description = $article["fields"]["trailText"] ?? null;

                $categories = [
                    "category" => $section,
                    "source" => $source,
                    "author" => $author
                ];

                $this->saveDatabase($this->providerName, $categories, [
                    "published_at" => $article["webPublicationDate"],
                    "article_title" => $article["webTitle"],
                    "description" => $description,
                    "url" => $article["webUrl"],
                    "result" => json_encode($article)
                ]);
            }
        }

        return true;
    }

    private function saveDatabase(string $provider, array $categories, array $data)
    {

        $provider = \App\Models\NewsProvider::where("name", $provider)->first();
        $category = $provider->categories()->firstOrCreate([
            "name" => $categories["category"]
        ]);

        $source = $provider->sources()->firstOrCreate([
            "name" => $categories["source"]
        ]);

        $author = $provider->authors()->firstOrCreate([
            "name" => $categories["author"]
        ]);

        $data["news_source_id"] = $source->id;
        $data["news_author_id"] = $author->id;
        $data["news_category_id"] = $category->id;

        $json = $data["result"];
        unset($data["result"]);

        $news = $provider->news()->firstOrCreate($data);
        $news->result = $json;
        $news->save();
    }

    private function validateFields(array $fields): bool
    {
        foreach ($fields as $field) {
            if (!isset($field) || empty($field) || is_null($field)) {
                return false;
            }
        }
        return true;
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
