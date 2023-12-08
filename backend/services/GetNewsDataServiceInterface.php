<?php

namespace App\Services;

interface GetNewsDataServiceInterface
{
    public function setProviderName(string $name): void;

    public function handle(): void;
}
