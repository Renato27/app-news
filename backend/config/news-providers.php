<?php

return [

    'providers' => [
        'news_api' => [
            'url' => 'https://newsapi.org/v2/top-headlines',
            'apiKey' => env('NEWS_API_KEY')
        ],
        'nytimes' => [
            'urlArticles' => 'https://api.nytimes.com/svc/news/v3/content/all',
            'url' => 'https://api.nytimes.com/svc/news/v3/content',
            'urlSections' => 'https://api.nytimes.com/svc/news/v3/content/section-list.json',
            'apiKey' => env('NYTIMES_API_KEY')
        ],
        'guardianapis' => [
            'url' => 'https://content.guardianapis.com',
            'apiKey' => env('GUARDIANAPIS_API_KEY')
        ]
    ]
];
