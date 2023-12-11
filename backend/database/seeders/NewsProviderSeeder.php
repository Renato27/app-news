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
                    'image_url' => 'images/news-world.png',
                ]);
                NewsProvider::updateOrCreate([
                    'name' => 'nytimes',
                ],[
                    'name' => 'nytimes',
                    'webName' => 'The New York Times',
                    'image_url' => 'images/the-new-york-times.jpg',
                ]);
                NewsProvider::updateOrCreate(
                [
                    'name' => 'guardianapis',
                ],[
                    'name' => 'guardianapis',
                    'webName' => 'The Guardian',
                    'image_url' => 'images/The-guardian-logo.jpg',
                ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
