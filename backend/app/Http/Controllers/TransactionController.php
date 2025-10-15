<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::query()
            ->latest()
            ->paginate($request->integer('per_page', 15));

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

        $transaction = DB::transaction(function () use ($validated) {
            return Transaction::updateOrCreate(
                ['external_id' => $validated['id']],
                [
                    'customer_name' => $validated['customerName'],
                    'amount' => $validated['amount'],
                    'notes' => $validated['notes'] ?? null,
                    'transacted_at' => $validated['createdAt']
                ]
            );
        });

        return TransactionResource::make($transaction)
            ->response()
            ->setStatusCode(201);
    }
}
