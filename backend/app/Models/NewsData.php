<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsData extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'published_at',
        'source',
        'article_title',
        'result',
        'description',
        'author',
        'url',
        'image_url',
        'news_provider_id',
        'news_category_id',
        'news_author_id',
        'news_source_id',
    ];

    public function newsCategory()
    {
        return $this->belongsTo(NewsCategory::class);
    }

    public function newsAuthor()
    {
        return $this->belongsTo(NewsAuthor::class);
    }

    public function newsSource()
    {
        return $this->belongsTo(NewsSource::class);
    }

    public function newsProvider()
    {
        return $this->belongsTo(NewsProvider::class);
    }

    public function userSettings()
    {
        return $this->belongsToMany(UserSetting::class);
    }
}
