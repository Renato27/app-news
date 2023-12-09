<?php

namespace App\Services;

interface GetNewsDataServiceInterface
{
    public function setProviderName(string $name): self;

    public function setApiKey(): self;

    public function handle(): bool;
}
