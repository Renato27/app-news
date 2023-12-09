<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ServiceProviders extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            \App\Services\GetNewsDataServiceInterface::class,
            \App\Services\GetNewsDataService::class
        );
    }
}
