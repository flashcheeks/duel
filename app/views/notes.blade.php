<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Notes</title>
</head>
<body>

    {{ Form::open(array('url' => 'notes_action')) }}

        <p>CommentId:</p>
        
        <p>{{ Form::text('comment_id') }}</p>

        <p>Comment:</p>
        
        <p>{{ Form::text('comment') }}</p>

        <p>{{ Form::submit('Submit') }}</p>

    {{ Form::close() }}

</body>
</html>