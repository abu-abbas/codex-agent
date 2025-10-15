<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    public function paginateTransactions(int $perPage = 15): LengthAwarePaginator
    {
        return Transaction::query()
            ->latest()
            ->paginate($perPage);
    }

    public function upsertTransaction(array $payload): Transaction
    {
        $transactedAt = $payload['createdAt'] instanceof Carbon
            ? $payload['createdAt']
            : Carbon::parse($payload['createdAt']);

        return DB::transaction(function () use ($payload, $transactedAt) {
            return Transaction::updateOrCreate(
                ['external_id' => $payload['id']],
                [
                    'customer_name' => $payload['customerName'],
                    'amount' => $payload['amount'],
                    'notes' => $payload['notes'] ?? null,
                    'transacted_at' => $transactedAt
                ]
            );
        });
    }
}
