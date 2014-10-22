<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comments</title>
</head>
<body>

    {{ Form::open(array('url' => 'comments_action')) }}

        <p>UserId:</p>
        
        <p>{{ Form::text('user_id') }}</p>

        <p>Comment:</p>
        
        <p>{{ Form::text('comment') }}</p>

        <p>Challenge:</p>
        
        <p>{{ Form::text('challenge') }}</p>

        <p>{{ Form::submit('Submit') }}</p>

    {{ Form::close() }}

</body>
</html>