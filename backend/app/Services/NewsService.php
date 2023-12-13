<?php

namespace App\Services;

use App\Models\NewsProvider;

class NewsService
{
    public function newsByProviderAndUserSettings(NewsProvider $newsProvider)
    {
        $userSetting = $newsProvider->userSetting;

        if (!$userSetting) {
            return [];
        }

        $newsQuery  = $newsProvider->news();

        if ($userSetting->news_category_id) {
            $newsQuery->where('news_category_id', $userSetting->news_category_id);
        }

        if ($userSetting->news_source_id) {
            $newsQuery->where('news_source_id', $userSetting->news_source_id);
        }

        if ($userSetting->news_author_id) {
            $newsQuery->where('news_author_id', $userSetting->news_author_id);
        }

        $news = $newsQuery->paginate(4);

        return $news;
    }
}
