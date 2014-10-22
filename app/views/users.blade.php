<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Users</title>
</head>
<body>

    {{ Form::open(array('url' => 'users_action')) }}

        <p>Name:</p>
        
        <p>{{ Form::text('name') }}</p>

        <p>{{ Form::submit('Submit') }}</p>

    {{ Form::close() }}

</body>
</html>