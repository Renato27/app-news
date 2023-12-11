<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProviderResource;
use App\Models\NewsProvider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    public function index()
    {
        $providers = NewsProvider::all();
        return ProviderResource::collection($providers);
    }

    public function show(NewsProvider $newsProvider)
    {
        return new ProviderResource($newsProvider);
    }
}
