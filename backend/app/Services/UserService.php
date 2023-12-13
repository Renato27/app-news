<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function saveUserWithSettings($settings, $providerId)
    {
        if(!isset(auth()->user()->token)) return;

        $userToken = auth()->user()->token;
        $name = $userToken->name;
        $email = $userToken->email;
        $user = User::create([
            'name' => $name,
            'email' => $email,
        ]);

        if(!$user){
            return response()->json([
                'message' => 'User not created'
            ], 500);
        }

        $user->userSettings()->updateOrCreate([
            'user_id' => $user->id,
        ],[
            'news_provider_id' => $providerId,
            'news_category_id' => $settings['category'] ?? null,
            'news_source_id' => $settings['source'] ?? null,
            'news_author_id' => $settings['author'] ?? null,
        ]);
    }
}
