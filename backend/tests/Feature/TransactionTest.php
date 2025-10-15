<?php

namespace Tests\Feature;

use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_transactions_via_api(): void
    {
        $payload = [
            'id' => '123e4567-e89b-12d3-a456-426614174000',
            'customerName' => 'John Doe',
            'amount' => 12000,
            'notes' => 'Test order',
            'createdAt' => now()->toISOString()
        ];

        $response = $this->postJson('/api/transactions', $payload);

        $response->assertCreated();
        $this->assertDatabaseHas('transactions', [
            'external_id' => $payload['id'],
            'customer_name' => $payload['customerName']
        ]);
    }
}
