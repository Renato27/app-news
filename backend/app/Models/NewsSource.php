<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsSource extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'news_provider_id',
    ];

    public function newsProvider()
    {
        return $this->belongsTo(NewsProvider::class);
    }
}
