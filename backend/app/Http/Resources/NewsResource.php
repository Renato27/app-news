<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'published_at' => $this->published_at,
            'article_title' => $this->article_title,
            'description' => $this->description,
            'provider' => $this->newsProvider->web_name,
            'image_url' => $this->image_url,
            'url' => $this->url,
            'result' => json_decode($this->result, true),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'category' => $this->newsCategory,
            'author' => $this->newsAuthor,
            'source' => $this->newsSource,
            'user_setting' => $this->newsProvider->userSetting ?? null,
        ];
    }
}
