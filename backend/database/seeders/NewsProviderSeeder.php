<?php

namespace Database\Seeders;

use App\Models\NewsProvider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            DB::beginTransaction();
                NewsProvider::updateOrCreate([
                    'name' => 'news_api',
                ],[
                    'name' => 'news_api',
                    'webName' => 'News API',
                    'base64Logo' => 'data:image/png;base64,'.base64_encode(file_get_contents(public_path('images/news-world.png'))),
                ]);
                NewsProvider::updateOrCreate([
                    'name' => 'nytimes',
                ],[
                    'name' => 'nytimes',
                    'webName' => 'The New York Times',
                    'base64Logo' => 'data:image/jpg;base64,'.base64_encode(file_get_contents(public_path('images/the-new-york-times.jpg'))),
                ]);
                NewsProvider::updateOrCreate(
                [
                    'name' => 'guardianapis',
                ],[
                    'name' => 'guardianapis',
                    'webName' => 'The Guardian',
                    'base64Logo' => 'data:image/jpg;base64,'.base64_encode(file_get_contents(public_path('images/the-guardian-logo.jpg'))),
                ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
