<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\SourceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('keycloak.auth')->group(function () {
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{newsProvider}', [NewsController::class, 'showByProvider']);
    Route::get('/news/{newsProvider}/category/{newsCategoryId}', [NewsController::class, 'showByCategory']);
    Route::get('/news/{newsProvider}/source/{newsSourceId}', [NewsController::class, 'showBySource']);
    Route::get('/news/{newsProvider}/author/{newsAuthorId}', [NewsController::class, 'showByAuthor']);
    Route::get('/news/user', [NewsController::class, 'showByUserSetting']);

    Route::prefix('provider')->group(function () {
        Route::get('/', [ProviderController::class, 'index']);
        Route::get('/{newsProvider}', [ProviderController::class, 'show']);
    });

    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::get('/{newsCategory}', [CategoryController::class, 'show']);
        Route::get('/provider/{newsProviderId}', [CategoryController::class, 'showByProvider']);
    });

    Route::prefix('source')->group(function () {
        Route::get('/', [SourceController::class, 'index']);
        Route::get('/{newsSource}', [SourceController::class, 'show']);
        Route::get('/provider/{newsProviderId}', [SourceController::class, 'showByProvider']);
    });

    Route::prefix('author')->group(function () {
        Route::get('/', [AuthorController::class, 'index']);
        Route::get('/{newsAuthor}', [AuthorController::class, 'show']);
        Route::get('/provider/{newsProviderId}', [AuthorController::class, 'showByProvider']);
    });
});
