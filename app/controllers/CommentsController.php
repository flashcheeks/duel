<?php

class CommentsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
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
        $data =  Input::except(array('_token'));
        
        $rule  =  array(
            'user_id' => 'required|exists:users,id',
            'comment' => 'required',
            'challenge' => 'exists:comments,id',
        );

        $validator = Validator::make($data,$rule);

        if ($validator->fails())
        {
            /*return Redirect::to('comments')
                ->withErrors($validator->messages());*/

            return 'false';
        }
        else
        {
        	Update::saveFormData(array("time"=>time()));
            Comments::saveFormData(Input::except(array('_token')));

            /*return Redirect::to('comments')
                ->withMessage('success');*/

            return 'true';
        }
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