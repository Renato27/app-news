<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserSetting extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'news_provider_id',
        'news_source_id',
        'news_author_id',
        'news_category_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function newsProvider()
    {
        return $this->belongsTo(NewsProvider::class);
    }

    public function newsSource()
    {
        return $this->belongsTo(NewsSource::class);
    }

    public function newsAuthor()
    {
        return $this->belongsTo(NewsAuthor::class);
    }

    public function newsCategory()
    {
        return $this->belongsTo(NewsCategory::class);
    }

    public function newsData()
    {
        return $this->belongsToMany(NewsData::class);
    }
}
