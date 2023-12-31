<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsProvider extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'webName',
        'image_url'
    ];

    public function categories()
    {
        return $this->hasMany(NewsCategory::class);
    }

    public function sources()
    {
        return $this->hasMany(NewsSource::class);
    }

    public function authors()
    {
        return $this->hasMany(NewsAuthor::class);
    }

    public function userSetting()
    {
        return $this->hasOne(UserSetting::class);
    }

    public function news()
    {
        return $this->hasMany(NewsData::class);
    }
}
