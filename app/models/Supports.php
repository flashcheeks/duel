<?php

class Supports extends Eloquent {
    
    protected $guarded = array();
    protected $table = 'supports'; // table name

    // model function to store form data to database
    public static function saveFormData($data)
    {
        DB::table('supports')->insert($data);
    }
}