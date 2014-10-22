<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Supports</title>
</head>
<body>

    {{ Form::open(array('url' => 'supports_action')) }}

        <p>UserId:</p>
        
        <p>{{ Form::text('user_id') }}</p>

        <p>CommentId:</p>
        
        <p>{{ Form::text('comment_id') }}</p>

        <p>{{ Form::submit('Submit') }}</p>

    {{ Form::close() }}

</body>
</html>