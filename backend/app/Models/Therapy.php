<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapy extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'color'
    ];

    public function appointments() {
        return $this->hasMany(Appointment::class);
    }

    public function user(){
        return $this->hasMany(User::class);
    }
}
