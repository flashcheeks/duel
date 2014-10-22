<?php

class RegisterController extends \BaseController {

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
            'name'       => 'required|unique:registered_users',
            'email'      => 'required|email|unique:registered_users',
            'password'   => 'required|min:6|same:cpassword',
            'cpassword'  => 'required|min:6'
        ) ;

		$message = array(
			'cpassword.required' => 'The confirm password field is required.',
			'cpassword.min' => 'The confirm password must be at least 6 characters',
			'password.same' => 'The :attribute and confirm password field must match.'
		);

        $validator = Validator::make($data,$rule,$message);

        if ($validator->fails())
        {
            return Redirect::to('register')
                ->withErrors($validator->messages());
        }
        else
        {
            Register::saveFormData(Input::except(array('_token','cpassword')));

            return Redirect::to('register')
                ->withMessage('Data inserted');
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
