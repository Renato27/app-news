<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('dark_mode')->default(false);
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('news_provider_id')->constrained('news_providers');
            $table->foreignId('news_source_id')->constrained('news_sources');
            $table->foreignId('news_author_id')->constrained('news_authors');
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
        Schema::dropIfExists('user_settings');
    }
}
