<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorResource;
use App\Models\NewsAuthor;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        return AuthorResource::collection(NewsAuthor::all());
    }

    public function show(NewsAuthor $newsAuthor)
    {
        return new AuthorResource($newsAuthor);
    }

    public function showByProvider($newsProviderId)
    {
        $newsAuthors = NewsAuthor::where('news_provider_id', $newsProviderId)->get();

        return AuthorResource::collection($newsAuthors);
    }
}
