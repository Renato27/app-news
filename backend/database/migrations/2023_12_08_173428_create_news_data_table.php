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
            $table->string('source')->nullable();
            $table->text('article_title')->nullable();
            $table->text('description')->nullable();
            $table->string('author')->nullable();
            $table->text('url')->nullable();
            $table->json('result');
            $table->foreignId('news_category_id')->constrained('news_categories');
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
