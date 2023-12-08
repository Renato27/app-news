<?php

namespace App\Services;

use jcobhams\NewsApi\NewsApi;

class GetNewsDataService implements GetNewsDataServiceInterface
{
    private string $providerName;
    private string $apiKey;

    public function setProviderName(string $name): void
    {
        $this->providerName = $name;
    }

    public function setApiKey(): void
    {
        $this->apiKey = config("news-providers.{$this->providerName}.apiKey");
    }

    private function newsApiExecute()
    {
        $newsApi = new NewsApi($this->apiKey);
        $categories = $newsApi->getCategories();
        $data = [];
        foreach($categories as $category) {

            if(!$category) continue;

            $response = $newsApi->getTopHeadLines(null, null, null, $category);
            $data[$category][] = $response["articles"];

            foreach($data[$category] as $article) {

                if(!isset($article["publishedAt"]) || !isset($article["source"])) continue;

                $article["publishedAt"] = $article["publishedAt"];
                $article["source"] = $article["source"];
                $article["result"] = $article;
            }
        }


        return $data;

    }

    private function nYTimesExecute()
    {

    }

    private function guardianExecute()
    {

    }

    private function saveDatabase(array $articles)
    {

    }

    public function handle(): void
    {
        $name = $this->providerName;

        switch ($name) {
            case 'value':
                # code...
                break;

            default:
                # code...
                break;
        }
    }
}
