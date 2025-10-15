<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Transaction */
class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->external_id,
            'customerName' => $this->customer_name,
            'amount' => $this->amount,
            'notes' => $this->notes,
            'createdAt' => $this->transacted_at?->toISOString()
        ];
    }
}
