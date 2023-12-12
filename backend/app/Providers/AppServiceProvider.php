<?php

namespace App\Providers;

use App\Auth\KeycloakUserProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->bind(KeycloakUserProvider::class, function ($app) {
        //     dd($app['config']['auth.providers.keycloak.model']);
        //     return new KeycloakUserProvider(
        //         $app['hash'],
        //         $app['config']['auth.providers.keycloak.model']
        //     );
        // });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
