<?php

namespace App\Console\Commands;

use App\Models\NewsProvider;
use App\Services\GetNewsDataServiceInterface;
use Illuminate\Console\Command;

class GetNewsDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get news data from news providers and store them in the database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        /** @var GetNewsDataServiceInterface $service */
        $service = app(GetNewsDataServiceInterface::class);

        $providers = NewsProvider::all();

        foreach ($providers as $provider) {
            $service->setProviderName($provider->name)->setApiKey();
            $service->handle();
        }

        $this->info('News data successfully stored in the database');
        return 0;
    }
}
