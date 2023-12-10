<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsResource;
use App\Models\NewsProvider;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return NewsProvider::all();
    }

    public function showByProvider(NewsProvider $newsProvider)
    {
        $news = $newsProvider->news()->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByCategory(NewsProvider $newsProvider, $newsCategoryId)
    {
        $news = $newsProvider->news()->where('news_category_id', $newsCategoryId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showBySource(NewsProvider $newsProvider, $newsSourceId)
    {
        $news = $newsProvider->news()->where('news_source_id', $newsSourceId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByAuthor(NewsProvider $newsProvider, $newsAuthorId)
    {
        $news = $newsProvider->news()->where('news_author_id', $newsAuthorId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByUserSetting()
    {
        $user = auth()->user();
        $userSetting = $user->userSetting;
        $news =  NewsProvider::find($userSetting->news_provider_id)->news()
            ->where('news_category_id', $userSetting->news_category_id)
            ->where('news_source_id', $userSetting->news_source_id)
            ->where('news_author_id', $userSetting->news_author_id)
            ->paginate(4);

        return NewsResource::collection($news);
    }
}
