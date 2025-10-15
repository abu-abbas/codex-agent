<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct(private readonly TransactionService $transactions)
    {
    }

    public function index(Request $request)
    {
        $transactions = $this->transactions->paginateTransactions(
            $request->integer('per_page', 15)
        );

        return TransactionResource::collection($transactions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'string'],
            'customerName' => ['required', 'string', 'max:191'],
            'amount' => ['required', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string'],
            'createdAt' => ['required', 'date']
        ]);

        $transaction = $this->transactions->upsertTransaction($validated);

        return TransactionResource::make($transaction)
            ->response()
            ->setStatusCode(201);
    }
}
