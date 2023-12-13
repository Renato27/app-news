<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [

        ];
    }

    public function getSearchCallback()
    {
        return function($query){

            $searchTerm = $this->input('searchTerm');
            $category = $this->input('category');
            $source = $this->input('source');
            $author = $this->input('author');
            $startDate = $this->input('startDate');
            $endDate = $this->input('endDate');

            if($searchTerm){
                $query->where('article_title', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            }

            if($category){
                $query->where('news_category_id', $category);
            }

            if($source){
                $query->where('news_source_id', $source);
            }

            if($author){
                $query->where('news_author_id', $author);
            }

            if($startDate && $endDate){
                $query->whereBetween('published_at', [$startDate, $endDate]);
            }



            // foreach ($params as  $value) {
            //     if ($value) {

            //         $query->where('news_provider_id', $value)
            //         ->orWhere('news_category_id', $value)
            //         ->orWhere('news_author_id', $value)
            //         ->orWhere('news_source_id', $value)
            //         ->orWhere('published_at', 'LIKE', '%' . $value . '%')
            //         ->orWhere('article_title', 'LIKE', '%' . $value . '%')
            //         ->orWhere('description', 'LIKE', '%' . $value . '%');
            //     }
            // }
        };
    }
}
