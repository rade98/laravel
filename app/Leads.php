<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leads extends Model
{
    protected $fillable = ['name', 'lastname', 'birthday', 'phoneNumber'];
}
