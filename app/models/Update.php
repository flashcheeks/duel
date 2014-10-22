<?php

class Update extends Eloquent {
    
    protected $guarded = array();
    protected $table = 'update'; // table name

    // model function to store form data to database
    public static function saveFormData($data)
    {
        DB::table('update')->insert($data);
    }
}