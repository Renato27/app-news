<?php

namespace App\Http\Controllers;

use App\Http\Resources\SourceResource;
use App\Models\NewsSource;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    public function index()
    {
        return SourceResource::collection(NewsSource::all());
    }

    public function show(NewsSource $newsSource)
    {
        return new SourceResource($newsSource);
    }

    public function showByProvider($newsProviderId)
    {
        $newsSources = NewsSource::where('news_provider_id', $newsProviderId)->get();

        return SourceResource::collection($newsSources);
    }
}
