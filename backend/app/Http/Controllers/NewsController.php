<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsFilterRequest;
use App\Http\Resources\NewsResource;
use App\Models\NewsData;
use App\Models\NewsProvider;
use App\Services\UserService;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return NewsData::all();
    }

    public function showByProvider(NewsProvider $newsProvider, NewsFilterRequest $request)
    {
        if(filter_var($request->saveToFeed, FILTER_VALIDATE_BOOLEAN)){
            app(UserService::class)->saveUserWithSettings($request->all());
        }

        $news = $newsProvider->news()->where($request->getSearchCallback())->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByCategory($newsCategoryId)
    {
        $news = NewsData::where('news_category_id', $newsCategoryId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showBySource($newsSourceId)
    {
        $news = NewsData::where('news_source_id', $newsSourceId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByAuthor($newsAuthorId)
    {
        $news = NewsData::where('news_author_id', $newsAuthorId)->paginate(4);

        return NewsResource::collection($news);
    }

    public function showByUserSetting()
    {
        $user = auth()->user();
        $userSetting = $user->userSetting;
        $news =  NewsData::where([
            'news_provider_id' => $userSetting->news_provider_id,
            'news_category_id' => $userSetting->news_category_id,
            'news_source_id' => $userSetting->news_source_id,
            'news_author_id' => $userSetting->news_author_id,
            ])->paginate(4);

        return NewsResource::collection($news);
    }
}
