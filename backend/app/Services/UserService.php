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
        $user = User::updateOrCreate([
            'email' => $email,
        ],
        [
            'name' => $name,
            'email' => $email,
        ]);

        if(!$user){
            return response()->json([
                'message' => 'User not created'
            ], 500);
        }

        foreach ($settings as $key => $value) {
            if($value == 'null' || $value == 'undefined'){
                $settings[$key] = null;
            }
        }

        $user->userSettings()->updateOrCreate([
            'news_provider_id' => $providerId,
        ],[
            'news_provider_id' => $providerId,
            'news_category_id' => $settings['news_category_id'],
            'news_source_id' => $settings['news_source_id'],
            'news_author_id' => $settings['news_author_id'],
        ]);
    }
}
