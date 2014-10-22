<?php

class Notes extends Eloquent {
    
    protected $guarded = array();
    protected $table = 'notes'; // table name

    // model function to store form data to database
    public static function saveFormData($data)
    {
        DB::table('notes')->insert($data);
    }
}