<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration</title>
</head>
<body>

    @if ($errors->any())

    <ul style="color:red;">

    {{ implode('', $errors->all('<li>:message</li>')) }}

    </ul>

    @endif

    @if (Session::has('message'))

    <p>{{ Session::get('message') }}</p>

    @endif

    {{ Form::open(array('url' => 'register_action')) }}

        <p>Name :</p>

        <p>{{ Form::text('name') }}</p>

        <p>Email :</p>

        <p>{{ Form::text('email') }}</p>

        <p>Password :</p>

        <p>{{ Form::password('password') }}</p>

        <p>Confirm Password :</p>

        <p>{{ Form::password('cpassword') }}</p>

        <p>{{ Form::submit('Submit') }}</p>

    {{ Form::close() }}

</body>
</html>