<?php

echo '

{
  "articles": [{
    "id": 1
  }],

  "users": [{
    "id": 1,
    "name": "Callum"
  },{
    "id": 2,
    "name": "Ben"
  },{
    "id": 3,
    "name": "Hayley"
  },{
    "id": 4,
    "name": "Stefano"
  }],

  "comments": [{
    "id": 1,
    "article_id": 1,
    "user_id": 1,
    "comment": "Tens of thousands of workers have joined protests today demanding a pay increase.",
    "challenge": null,
    "created_at": null
  },{
    "id": 2,
    "article_id": 1,
    "user_id": 2,
    "comment": "The TUC has organised protests in London, Glasgow and Belfast under the banner Britain Needs a Pay Rise.",
    "challenge": 1,
    "created_at": null
  },{
    "id": 3,
    "article_id": 1,
    "user_id": 3,
    "comment": "Tens of thousands of workers have joined protests today demanding a pay increase.",
    "challenge": null,
    "created_at": null
  },{
    "id": 4,
    "article_id": 1,
    "user_id": 3,
    "comment": "Tens of thousands of workers have joined protests today demanding a pay increase.",
    "challenge": null,
    "created_at": null
  },{
    "id": 5,
    "article_id": 1,
    "user_id": 2,
    "comment": "The TUC has organised protests in London, Glasgow and Belfast under the banner Britain Needs a Pay Rise.",
    "challenge": 4,
    "created_at": null
  }],

  "supports": [{
    "id": 1,
    "user_id": 3,
    "comment_id": 1
  },{
    "id": 2,
    "user_id": 5,
    "comment_id": 2
  }],

  "notes": [{
    "id": 1,
    "comment_id": 1,
    "comment": "This is a note - 1",
    "created_at": null
  },{
    "id": 2,
    "comment_id": 1,
    "comment": "This is a note - 2",
    "created_at": null
  },{
    "id": 3,
    "comment_id": 4,
    "comment": "This is a note - 3",
    "created_at": null
  },{
    "id": 4,
    "comment_id": 2,
    "comment": "This is a note - 4",
    "created_at": null
  }]
}

';
