<?php

return [

    'providers' => [
        'news_api' => [
            'url' => 'https://newsapi.org/v2/top-headlines',
            'apiKey' => env('NEWS_API_KEY')
        ],
        'nytimes' => [
            'url' => 'https://api.nytimes.com/svc/topstories/v2/home.json',
            'apiKey' => env('NYTIMES_API_KEY')
        ],
        'guardianapis' => [
            'url' => 'https://content.guardianapis.com/search',
            'apiKey' => env('GUARDIANAPIS_API_KEY')
        ]
    ]
];
