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
            $startDate = $this->input('startDate');
            $endDate = $this->input('endDate');
            $search = [];
            foreach ($this->all() as $key => $value) {
                if($key == 'searchTerm' || $key == 'startDate' || $key == 'endDate') continue;

                if(is_null($value)) continue;

                if($value == 'null' || $value == 'undefined'){
                    $this->merge([$key => null]);
                }else{
                    $search[$key] = $value;
                }
            }

            if(count($search)){
                $query->where($search);
            }

            if($searchTerm){
                $query->where('article_title', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            }

            if($startDate && $endDate){
                $query->whereBetween('published_at', [$startDate, $endDate]);
            }
        };
    }
}
