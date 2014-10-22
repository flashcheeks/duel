<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Article</title>

  <link rel="stylesheet" href="<?php echo url('css/flatly/bootstrap.min.css'); ?>" />
  <link rel="stylesheet" href="<?php echo url('css/style.css'); ?>" />

  <script>
  var user = <?php echo $id ?>;
  var latest = <?php echo $latest ?>;
  </script>

</head>
<body>

  <script id="comment-template" type="text/x-handlebars-template">
  <div class="comment-container {{ style }}" data-comment-id="{{{ id }}}">
    <div class="comment-header-row clear-fix">
      <div class="comment-name">{{{ name }}}</div>
      <div class="comment-support-row clear-fix">
        <div class="comment-support">{{{ support }}}</div>
        <div class="comment-support-icon">{{{ icon }}}</div>
      </div>
    </div>
    <div class="comment-body-row">
      <div class="comment-date">{{{ date }}}</div>
      <div class="comment-text">{{{ comment }}}</div>
    </div>
    <div class="comment-footer-row clear-fix">
      {{{ footer }}}
    </div>
  </div>
  </script>

  <script id="duel-template" type="text/x-handlebars-template">
  <div class="duel-container clear-fix">
    {{{ duel }}}
  </div>
  </script>

  <script id="challenge-btn-template" type="text/x-handlebars-template">
  <div class="comment-challenge" data-challenge-id="{{{ id }}}">
    <button type="button" class="btn btn-danger">duel</button>
  </div>
  </script>

  <script id="support-btn-template" type="text/x-handlebars-template">
  <div class="comment-support" data-support-id="{{{ id }}}">
    <button type="button" class="btn btn-default">+</button>
  </div>
  </script>

  <script id="note-template" type="text/x-handlebars-template">
  <div class="note-container {{ style }} {{{ class }}}" data-note-id="{{{ id }}}">
    <div class="note-text">{{{ comment }}}</div>
  </div>
  </script>

  <script id="notes-template" type="text/x-handlebars-template">
  <div class="notes-container clear-fix">
    {{{ notes }}}
  </div>
  </script>

  <script id="input-comment" type="text/x-handlebars-template">
  <hr/>
  <div class="input-comment-container">
    <textarea id="input-comment-text" name="input-comment-text" rows="4" value="" /></textarea><br/>
    <button type="button" class="btn btn-primary">submit</button>
  </div>
  </script>

  <script id="input-challenge" type="text/x-handlebars-template">
  <div class="input-challenge-container" data-challenge-id="{{{ id }}}">
    <textarea id="input-challenge-text-{{{ id }}}" name="input-challenge-text-{{{ id }}}" rows="4" value="" /></textarea><br/>
    <button type="button" class="btn btn-danger">duel</button>
  </div>
  </script>

  <script id="note-btn-template" type="text/x-handlebars-template">
  <div class="comment-note" data-note-id="{{{ id }}}">
    <button type="button" class="btn btn-info">add note</button>
  </div>
  </script>

  <script id="input-note" type="text/x-handlebars-template">
  <div class="input-note-container" data-note-id="{{{ id }}}">
    <textarea id="input-note-text-{{{ id }}}" name="input-note-text-{{{ id }}}" rows="2" value="" /></textarea><br/>
    <button type="button" class="btn btn-info">note</button>
  </div>
  </script>

  <script id="article-comments" type="text/x-handlebars-template">
  <div class="article-comments-{{{ counter }}}"></div>
  </script>

  <div class="menu-header">
    <div class="menu-header-logo"><img src="<?php echo url('img/logo.png'); ?>" /></div>
    <div class="menu-header-name"></div>
  </div>

  <div class="page-container">
    <div class="container">

      <h1><br/>Workers stage massive rallies for pay rise</h1>
      <div><img src="http://www.thetimes.co.uk/tto/multimedia/archive/00788/165046797_Marchingo_788474c.jpg" width="100%"></div>
      <div class="byline">David Rankin</div>
      <div>
        <p>Tens of thousands of workers have joined protests today demanding a pay increase.</p>
        <p>The TUC has organised protests in London, Glasgow and Belfast under the banner Britain Needs a Pay Rise.</p>
        <p>Midwives went on strike for the first time in their history this week, following the government’s decision not to pay a recommended 1% increase to all NHS staff. Hospital radiographers and prison officers will take strike action next week in the same dispute. </p>
        <p>TUC general secretary Frances O’Grady said: “Today tens of thousands of people will join the TUC’s Britain Needs a Pay Rise march.</p>
        <p>“Our message is that after the longest and deepest pay squeeze in recorded history, it’s time to end the lock-out that has kept the vast majority from sharing in the economic recovery.</p>
        <p>“The average worker is £50-a-week worse off than in 2007 and 5m earn less than the living wage. Meanwhile, top directors now earn 175 times more than the average worker.</p>
      </div>

      <hr/>
      <div class="article-comments"></div>

    </div>
  </div>

  <script type="text/javascript" src="<?php echo url('js/jquery.min.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo url('js/handlebars.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo url('js/duel.js'); ?>"></script>

</body>
</html>