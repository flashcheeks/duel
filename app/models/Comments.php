<?php

class Comments extends Eloquent {
    
    protected $guarded = array();
    protected $table = 'comments'; // table name

    // model function to store form data to database
    public static function saveFormData($data)
    {
		$data['article_id'] = 1;

		if (empty($data['challenge']))
        	$data['challenge'] = null;

        DB::table('comments')->insert($data);
    }
}