<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'external_id',
        'customer_name',
        'amount',
        'notes',
        'transacted_at'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transacted_at' => 'datetime'
    ];
}
