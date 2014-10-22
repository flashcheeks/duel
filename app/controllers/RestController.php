<?php

class RestController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = Users::get();
	    $comments = Comments::get();
	    $supports = Supports::get();
	    $notes = Notes::get();

	    $usersJson = array();
	    $commentsJson = array();
	    $supportsJson = array();
	    $notesJson = array();

	    // build users
		foreach ($users as $user) {
			array_push($usersJson, array('id'=>$user->id, 'name'=>$user->name));
		}

	    // build comments
	    foreach ($comments as $comment) {
	      array_push($commentsJson, array('id'=>$comment->id, 'article_id'=>$comment->article_id, 'user_id'=>$comment->user_id, 'comment'=>$comment->comment, 'challenge'=>$comment->challenge));
	    }

	    // build supports
	    foreach ($supports as $support) {
	      array_push($supportsJson, array('id'=>$support->id, 'user_id'=>$support->user_id, 'comment_id'=>$support->comment_id));
	    }

	    // build notes
	    foreach ($notes as $note) {
	      array_push($notesJson, array('id'=>$note->id, 'comment_id'=>$note->comment_id, 'comment'=>$note->comment));
	    }

	    // build json
		$json = array('users'=>$usersJson, 'comments'=>$commentsJson, 'supports'=>$supportsJson, 'notes'=>$notesJson);

		// display json
		echo json_encode($json);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
     	//   
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}
}