<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'address',
        'email',
        'phone',
        'birth_date',
        'gender',
        'occupation',
        'sports_hobbies',
        'marital_status',
        'diagnosis'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function anamnesis()
    {
        return $this->hasOne(Anamnesis::class);
    }

    //Scope filter
    public function scopeFilter($query, array $filters)
    {
        foreach ($filters as $key => $value) {
            if (!empty($value)) {
                switch ($key) {
                    case "first_name":
                        $query->where("first_name", "ilike", "%{$value}%");
                        break;
                }
            }
        }
    }
}
