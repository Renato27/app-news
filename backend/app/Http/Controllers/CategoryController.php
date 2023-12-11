<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\NewsCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(NewsCategory::all());
    }

    public function show(NewsCategory $newsCategory)
    {
        return new CategoryResource($newsCategory);
    }

    public function showByProvider($newsProviderId)
    {
        $newsCategories = NewsCategory::where('news_provider_id', $newsProviderId)->get();

        return CategoryResource::collection($newsCategories);
    }
}
