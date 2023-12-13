<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsFilterRequest;
use App\Http\Resources\NewsResource;
use App\Models\NewsData;
use App\Models\NewsProvider;
use App\Services\NewsService;
use App\Services\UserService;

class NewsController extends Controller
{
    public function index()
    {
        return NewsData::all();
    }

    public function showByProvider(NewsProvider $newsProvider, NewsFilterRequest $request)
    {
        if (filter_var($request->saveToFeed, FILTER_VALIDATE_BOOLEAN)) {
            app(UserService::class)->saveUserWithSettings($request->all(), $newsProvider->id);
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

    public function showByUserSettingAndProvider(NewsProvider $newsProvider)
    {
        try {
            $news = app(NewsService::class)->newsByProviderAndUserSettings($newsProvider);

            return NewsResource::collection($news);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }

    }
}
