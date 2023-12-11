<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_data', function (Blueprint $table) {
            $table->id();
            $table->string('published_at')->nullable();
            $table->text('article_title')->nullable();
            $table->text('description')->nullable();
            $table->text('url')->nullable();
            $table->text('image_url')->nullable();
            $table->json('result')->nullable();
            $table->foreignId('news_provider_id')->constrained('news_providers');
            $table->foreignId('news_category_id')->constrained('news_categories');
            $table->foreignId('news_author_id')->constrained('news_authors');
            $table->foreignId('news_source_id')->constrained('news_sources');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_data');
    }
}
