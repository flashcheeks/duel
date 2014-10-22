<?php

class Users extends Eloquent {
    
    protected $guarded = array();
    protected $table = 'users'; // table name

    // model function to store form data to database
    public static function saveFormData($data)
    {
        DB::table('users')->insert($data);
    }
}