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
        'news_category_id',
    ];

    public function newsCategory()
    {
        return $this->belongsTo(NewsCategory::class);
    }
}
