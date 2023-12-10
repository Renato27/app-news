<?php

use App\Http\Controllers\NewsController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['keycloak.auth'])->group(function () {
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{newsProvider}', [NewsController::class, 'showByProvider']);
    Route::get('/news/{newsProvider}/category/{newsCategoryId}', [NewsController::class, 'showByCategory']);
    Route::get('/news/{newsProvider}/source/{newsSourceId}', [NewsController::class, 'showBySource']);
    Route::get('/news/{newsProvider}/author/{newsAuthorId}', [NewsController::class, 'showByAuthor']);
    Route::get('/news/user', [NewsController::class, 'showByUserSetting']);
});
