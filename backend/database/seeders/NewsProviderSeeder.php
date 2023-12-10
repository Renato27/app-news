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
                ]);
                NewsProvider::updateOrCreate([
                    'name' => 'nytimes',
                ],[
                    'name' => 'nytimes',
                ]);
                NewsProvider::updateOrCreate(
                [
                    'name' => 'guardianapis',
                ],[
                    'name' => 'guardianapis',
                ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
