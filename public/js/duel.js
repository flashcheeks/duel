var article_id = 1;

var dataCounter = 0;

var commentTemplate = Handlebars.compile($("#comment-template").html());
var challengeBtnTemplate = Handlebars.compile($("#challenge-btn-template").html());
var supportBtnTemplate = Handlebars.compile($("#support-btn-template").html());
var noteBtnTemplate = Handlebars.compile($("#note-btn-template").html());
var duelTemplate = Handlebars.compile($("#duel-template").html());
var noteTemplate = Handlebars.compile($("#note-template").html());
var notesTemplate = Handlebars.compile($("#notes-template").html());
var inputCommentTemplate = Handlebars.compile($("#input-comment").html());
var inputChallengeTemplate = Handlebars.compile($("#input-challenge").html());
var inputNoteTemplate = Handlebars.compile($("#input-note").html());
var articleCommentsTemplate = Handlebars.compile($("#article-comments").html());

function getArticleCommentData() {
  // fetch the data
  dataFetch("/rest_request", function(data) {

    dataCounter++;

    // set content
    var html = articleCommentsTemplate({ counter: dataCounter });
    // set content
    $(".article-comments").append(html);

    // loop commments
    for (var i in data.comments) {
      if (data.comments[i].article_id == article_id && data.comments[i].challenge == null) {

        // set user name
        var user_name = null;
        var user_comment_id = null;

        // loop users
        for (var ii in data.users) {
          if (data.users[ii].id == data.comments[i].user_id) {
            // set user name
            user_name = data.users[ii].name;
            // set user comment
            if (data.users[ii].id == user) { user_comment_id = data.comments[i].id; }
          }
        }

        // set supports counter
        var supports = 0;

        // loop support
        for (var ii in data.supports) {
          if (data.supports[ii].comment_id == data.comments[i].id) { supports++; }
        }

        // set challenge
        var challenge_user_name = null;
        var challenge_comment_id = null;
        var challenge_comment_text = null;
        var challenge_supports = 0;

        // loop commments/challenge
        for (var ii in data.comments) {
          if (data.comments[i].id != data.comments[ii].id && data.comments[ii].challenge == data.comments[i].id) {

            // loop users
            for (var iii in data.users) {
              if (data.users[iii].id == data.comments[ii].user_id) {
                // set user name
                challenge_user_name = data.users[iii].name;
                // set user comment
                if (data.users[iii].id == user) { user_comment_id = data.comments[ii].id; }
              }
            }
            
            challenge_comment_id = data.comments[ii].id;
            challenge_comment_text = data.comments[ii].comment;

            // loop support
            for (var iii in data.supports) {
              if (data.supports[iii].comment_id == data.comments[ii].id) { challenge_supports++; }
            }
          }
        }

        // comment template
        if (challenge_user_name == null) {

          var challengeBtn = challengeBtnTemplate({ id: data.comments[i].id });
          var supportBtn = supportBtnTemplate({ id: data.comments[i].id });

          var style = ""; if (user_comment_id == data.comments[i].id) { style = "myComment"; }
          // set comment
          var comment = commentTemplate({
            id: data.comments[i].id, name: user_name, icon: supportBtn, support: supports, date: "",
            comment: data.comments[i].comment, footer: challengeBtn, style: style
          });

          // set content
          $(".article-comments-"+dataCounter).append(comment);

          var challengeInput = inputChallengeTemplate({ id: data.comments[i].id });

          // set content
          $(".article-comments-"+dataCounter).append(challengeInput);

          // click handler
          $(".comment-challenge[data-challenge-id='"+data.comments[i].id+"']").on("click", function(event) {
            $(".input-challenge-container[data-challenge-id='"+$(this).attr("data-challenge-id")+"']").show();
          });

          // click handler
          $(".comment-support[data-support-id='"+data.comments[i].id+"'] button").on("click", function(event) {
            var support = $(this).parent().attr("data-support-id");
            // data submit
            dataSubmit("/supports_action", { user_id: user, comment_id: support }, function(data) {
              // fetch the data - reload
              getArticleCommentData();
            });
          });

          // click handler
          $(".input-challenge-container[data-challenge-id='"+data.comments[i].id+"'] button").on("click", function(event) {
            var challenge = $(this).parent().attr("data-challenge-id");
            // data submit
            dataSubmit("/comments_action", { user_id: user, comment: $("#input-challenge-text-"+challenge).val(), challenge: challenge }, function(data) {
              // fetch the data - reload
              getArticleCommentData();
            });
          });
      
        // duel template
        } else  {

          var style1 = ""; if (user_comment_id == data.comments[i].id) { style1 = "myComment"; }
          var style2 = ""; if (user_comment_id == challenge_comment_id) { style2 = "myComment"; }

          if (style1 == "" && style2 == "") {
            if (supports > challenge_supports) {
              style1 += " winning";
              style2 += " losing";
            } else if (challenge_supports > supports) {
              style1 += " losing";
              style2 += " winning";
            }
          }

          var supportBtn = supportBtnTemplate({ id: data.comments[i].id });
          // set content
          var comment = commentTemplate({
            id: data.comments[i].id, name: user_name, icon: supportBtn, support: supports, date: "",
            comment: data.comments[i].comment, footer: "", style: style1
          });

          var supportBtn = supportBtnTemplate({ id: challenge_comment_id });
          // set content
          comment += commentTemplate({
            id: challenge_comment_id, name: challenge_user_name, icon: supportBtn, support: challenge_supports, date: "",
            comment: challenge_comment_text, footer: "", style: style2
          });

          // set content
          var duel = duelTemplate({ duel: comment });
          // set content
          $(".article-comments-"+dataCounter).append(duel);

          // set notes
          var notes = "";

          // loop notes
          for (var ii in data.notes) {

            if (data.notes[ii].comment_id == data.comments[i].id) {
              //var style = ""; if (user_comment_id == data.comments[i].id) { style = style1; }
              // set note
              notes += noteTemplate({ id: data.comments[i].id, class: "note-left", comment: data.notes[ii].comment, style: style1 });
            }

            if (data.notes[ii].comment_id == challenge_comment_id) {
              //var style = ""; if (user_comment_id == challenge_comment_id) { style = style2; }
              // set note
              notes += noteTemplate({ id: challenge_comment_id, class: "note-right", comment: data.notes[ii].comment, style: style2 });
            }
          }

          // set content
          var content = notesTemplate({ notes: notes });
          // set content
          $(".article-comments-"+dataCounter).append(content);

          // add notes mode
          if (user_comment_id != null) {

            var noteBtn = noteBtnTemplate({ id: user_comment_id });

            // set content
            $(".article-comments-"+dataCounter).append(noteBtn);

            var noteInput = inputNoteTemplate({ id: user_comment_id });

            // set content
            $(".article-comments-"+dataCounter).append(noteInput);

            // click handler
            $(".comment-note[data-note-id='"+user_comment_id+"']").on("click", function(event) {
              $(".input-note-container[data-note-id='"+$(this).attr("data-note-id")+"']").show();
            });

            // click handler
            $(".input-note-container[data-note-id='"+user_comment_id+"'] button").on("click", function(event) {
              var note = $(this).parent().attr("data-note-id");
              // data submit
              dataSubmit("/notes_action", { comment_id: note, comment: $("#input-note-text-"+note).val() }, function(data) {
                // fetch the data - reload
                getArticleCommentData();
              });
            });
          }

          // click handler
          $(".comment-support[data-support-id='"+data.comments[i].id+"'] button").on("click", function(event) {
            var support = $(this).parent().attr("data-support-id");
            // data submit
            dataSubmit("/supports_action", { user_id: user, comment_id: support }, function(data) {
              // fetch the data - reload
              getArticleCommentData();
            });
          });

          // click handler
          $(".comment-support[data-support-id='"+challenge_comment_id+"'] button").on("click", function(event) {
            var support = $(this).parent().attr("data-support-id");
            // data submit
            dataSubmit("/supports_action", { user_id: user, comment_id: support }, function(data) {
              // fetch the data - reload
              getArticleCommentData();
            });
          });
        }    
      }
    }

    // set content
    var content = inputCommentTemplate({ });
    // set content
    $(".article-comments-"+dataCounter).append(content);

    // click handler
    $(".input-comment-container button").on("click", function(event) {
      // data submit
      dataSubmit("/comments_action", { user_id: user, comment: $("#input-comment-text").val(), challenge: null }, function(data) {
        // fetch the data - reload
        getArticleCommentData();
      });
    });

    // remove previous
    $(".article-comments-"+(dataCounter-1)).remove();

    // set height
    setTimeout(function() {
      // set height
      $(".duel-container").each(function( index ) {

        // get height
        var height = $(this).find(".comment-container:first-child .comment-text").height();
        var challenge_height = $(this).find(".comment-container:last-child .comment-text").height();

        // set height
        if (height > challenge_height) { $(this).find(".comment-container:last-child .comment-text").height(height); }
        else if (challenge_height > height) { $(this).find(".comment-container:first-child .comment-text").height(challenge_height); }

      });
    }, 50);

  });
}

function dataFetch(url, callback) {
  $.ajax({ url:url, type:"get", dataType:"json", success:function(data) { callback(data); } });
}

function dataSubmit(url, data, callback) {
  $.ajax({ url:url, type:"post", data:data, success:function(data) { callback(data); } });
}

$(document).ready(function() {

  if (user == 1) { $(".menu-header-name").html("Sam"); }
  if (user == 2) { $(".menu-header-name").html("Ben"); }
  if (user == 3) { $(".menu-header-name").html("Hayley"); }

  // fetch the data
  setInterval(function() {
    // fetch the data
    dataFetch("/rest_update", function(time) {
      if (time != latest) { 
        // update latest
        latest = time;
        // fetch the data
        getArticleCommentData();
      }
    });
  }, 500);

  // fetch the data
  getArticleCommentData();

});