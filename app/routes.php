<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

/*
Route::get('/register', function()
{
	return View::make('register');
});

Route::post('register_action', function()
{
    $obj = new RegisterController() ;
    return $obj->store();
});

// login
Route::get('login', array('uses' => 'HomeController@showLogin'));
Route::post('login', array('uses' => 'HomeController@doLogin'));
// logout
Route::get('logout', array('uses' => 'HomeController@doLogout'));
*/


Route::get('/users', function() { return View::make('users'); });
Route::post('users_action', function() { $obj = new UsersController(); return $obj->store(); });

Route::get('/comments', function() { return View::make('comments'); });
Route::post('comments_action', function() { $obj = new CommentsController(); return $obj->store(); });

Route::get('/supports', function() { return View::make('supports'); });
Route::post('supports_action', function() { $obj = new SupportsController(); return $obj->store(); });

Route::get('/notes', function() { return View::make('notes'); });
Route::post('notes_action', function() { $obj = new NotesController(); return $obj->store(); });

Route::get('/rest', function() { return View::make('rest'); });
Route::get('/rest_request', function() { $obj = new RestController(); return $obj->index(); });

//Route::get('/article/{id}', function() { return View::make('article')->with('id', $id); });
Route::get('/article/{id}', 'ArticleController@index');

Route::get('/rest_update', function() { $obj = new UpdateController(); return $obj->index(); });
