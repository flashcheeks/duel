function OptaFootball() {

  var self = this;

  /**
   * VARS
   */
  this.basePath = null;
  this.compData = null;

  /**
   * INIT
   */
  this.init = function() { getStyles(); getWidgetData(); }

  /**
   * DESTORY
   */
  this.destroy = function(id) {
    // destroy opta widget
    if (typeof $jqOpta !== "undefined") {
      for (var i in $jqOpta.widgets) {
        if ("#"+id == $jqOpta.widgets[i].optaWidget.idx) {
          $jqOpta.widgets[i].destroy(true); } } }

    // remove config object
    for (var i in config) {
      if (config[i].opta == id) {
        config.splice(i, 1); break; } }
  }

  /**
   * STYLES
   */
  function getStyles() {
    // set main styles
    setStyles(self.basePath+"reader/css/tto-widgets.css");
    setStyles("http://widget.cloud.opta.net/2.0/css/widgets.opta.css");
    // set IE styles
    if (Browser.IsIe()) {
      if (Browser.Version() < 8) { setStyles("http://widget.cloud.opta.net/2.0/css/ie7.widgets.opta.css"); }
      else if (Browser.Version() < 9) { setStyles("http://widget.cloud.opta.net/2.0/css/ie8.widgets.opta.css"); }
      else if (Browser.Version() < 10) { setStyles("http://widget.cloud.opta.net/2.0/css/ie9.widgets.opta.css"); }
    }
  }

  function setStyles(href) {
    if ($("link[href='"+href+"']").length == 0) { var css = $("<link>");
      css.attr({ rel:"stylesheet", type:"text/css", href:href });
      $("head").append(css); }
  }

  /**
   * BROWSER
   */
  var Browser = {
    IsIe: function () { return navigator.appVersion.indexOf("MSIE") != -1; },
    Navigator: navigator.appVersion,
    Version: function() {
      var version = 999; // we assume a sane browser
      if (navigator.appVersion.indexOf("MSIE") != -1)
        // bah, IE again, lets downgrade version number
        version = parseFloat(navigator.appVersion.split("MSIE")[1]);
      return version;
    }
  };

  /**
   * DATA
   */
  function getWidgetData() {
    if (widgetData != null) { initWidgets(); }
    else { dataFetch(self.basePath+"data/opta-football-widgets.json", function(data) {
      widgetData = data; initWidgets(); }); }
  }

  function getCompData() {
    dataFetch(self.basePath+"data/opta-football-comps.json", function(data) {
      self.compData = data; initWidgets(); });
  }

  function getArticleData() {
    dataFetch("http://features.thesundaytimes.co.uk/public/sport/footballdata/opta-football-articles.php", function(data) {
      articleData = data; initWidgets(); });
  }

  function dataFetch(url, callback) {
    $.ajax({ url:url, type:"get", dataType:"json", success:function(data) { callback(data); } });
  }

  /**
   * WIDGETS
   */
  function initWidgets() {
    // set data flag
    var dataRequired = false;
    // find custom elements
    $(".optaFootball").each(function(index) {
      // only check widget if element empty
      if (!$(this).html()) {

        // create attributes
        var attributes = {};
        // loop through attributes
        $.each($(this).get(0).attributes, function(i, attrib) {
          attributes[attrib.name.replace("data-","")] = attrib.value; });

        // comp data required
        if (attributes.widget == "standings" && self.compData == null) {
          dataRequired = true; getCompData();

        // article data required
        } else if (attributes.widget == "fixtures" && attributes.match_link == "true" && articleData == null) {
          dataRequired = true; getArticleData();

        // article data required
        } else if (attributes.widget == "fixtures_plus" && attributes.results == "true" && articleData == null) {
          dataRequired = true; getArticleData();
        
        // article data required
        } else if (attributes.widget == "match_summary" && articleData == null) {
          dataRequired = true; getArticleData();
        }
      }
    });

    // continue initialising
    if (!dataRequired) {

      // set build flag
      var widgetBuilt = false;
      // find custom elements
      $(".optaFootball").each(function(index) {
        // only build widget if element empty
        if (!$(this).html()) {
          
          //console.log("times-opta-widget-"+widgetCount);

          // add clear fix
          $(this).addClass("clear-fix");
          
          // create and set id
          var id = "times-opta-widget-"+widgetCount;
          $(this).attr("id", id);

          // create attributes
          var attributes = {};
          // loop through attributes
          $.each($(this).get(0).attributes, function(i, attrib) {
            attributes[attrib.name.replace("data-","")] = attrib.value; });

          // set dimentions
          if (attributes["width"]) {
            $(this).width(attributes["width"]);
          }
          if (attributes["height"]) {
            $(this).height(attributes["height"]);
            $(this).addClass("scroll");
          }
          // dimention edge case
          if (attributes.widget == "seasonstandings") {
            $(this).width(parseInt(attributes["width"])+20);
          }

          // set float
          if (attributes["float"]) {
            $(this).css("float", attributes["float"]);
            // set margin
            if (attributes["float"] == "left") { $(this).css("margin-right", "20px"); }
            if (attributes["float"] == "right") { $(this).css("margin-left", "20px"); }
          }

          // fixtures video case check
          if ((attributes["widget"] == "fixtures" || attributes["widget"] == "fixtures_plus") && attributes["competition"] != 8) {
            $(this).attr("data-article_link", "false");
            $(this).attr("data-video_link", "false");
          }

          // build widget
          var widget = buildWidget(attributes);
          // create opta string
          var opta = "<opta";
          // add widget attributes
          for (var key in widget) { opta += " "+key+"=\""+widget[key]+"\""; }
          // complete opta string
          opta += "></opta>";
          // create opta element
          $(this).html(opta);
          
          // update config
          config.push({ id: id, attributes: attributes, widget: widget });
          
          // set build flag
          widgetBuilt = true;
          // inc counter
          widgetCount++;
        }
      });

      // continue initialising
      if (widgetBuilt) {
        if (typeof $jqOpta === "undefined") {
          // update opta params with callback
          _optaParams.callbacks = [loadWidget];
          // load opta script
          $.getScript("http://widget.cloud.opta.net/2.0/js/widgets.opta.js");

        } else { // init widget
          $jqOpta.widgetStart(_optaParams);
        }
      }
    }
  }

  function buildWidget(attributes) {
    // loop though widgets
    for (var i in widgetData) {
      if (widgetData[i].widget == attributes.widget) {

        // create widget
        var widget = { sport: "football", widget: attributes.widget };

        // edge case check
        if (attributes.widget != "teamcompare" && attributes.widget != "playercompare") {
          // add season and competition
          widget.season = attributes.season;
          widget.competition = attributes.competition;
        }

        // edge case check
        if (attributes.widget == "standings") {
          for (var ii in self.compData) {
            if (self.compData[ii].comp == widget.competition) {
              // add standings styles
              if (self.compData[ii].table) {
                widget.style_top = self.compData[ii].table[0] + 1;
                widget.style_secondary = self.compData[ii].table[1] + 1;
                widget.style_bottom = self.compData[ii].table[2] + 1;
              }
            }
          }
        }

        // loop though widget presets
        for (var ii in widgetData[i].presets) {
          // get preset
          var preset = widgetData[i].presets[ii];
          // set attribute
          if (attributes[preset.preset] == "true") {
            for (var iii in preset.params) {
              widget[preset.params[iii].param] = preset.params[iii].dfault;
            }
          }
        }

        // loop though widget params
        for (var ii in widgetData[i].params) {
          // get param
          var param = widgetData[i].params[ii];
          // set default but do not override presets
          if (param.dfault && !widget[param.param]) {
            widget[param.param] = param.dfault;
          }
          // set attribute
          if (attributes[param.param]) {
            // match param options
            if (param.option && $.inArray(attributes[param.param], param.option)) {
              widget[param.param] = attributes[param.param];
            // no param options
            } else {
              widget[param.param] = attributes[param.param];
            }
          }
        }

        // return
        return widget;
      }
    }
  }

  /**
   * WIDGET LOAD
   */
  function loadWidget(widget, data, id) {
    // loop though config
    for (var i in config) {
      if (widget.parent().attr("id") == config[i].id) {
        
        // check activity
        if (config[i].active != true) {
          // update config
          config[i].opta = widget.attr("id"); 
          config[i].data = data;
          config[i].active = true;
        }

        // fixtures
        if (config[i].attributes["widget"] == "fixtures") {
          // add article and video link
          if (config[i].attributes["match_link"] == "true") {
            var args = {
              season: config[i].attributes["season"],
              comp: config[i].attributes["competition"],
              article: config[i].attributes["article_link"],
              video: config[i].attributes["video_link"]
            };
            fixturesArticleVideoLinks(config[i].opta, args, false);
          }
          // match summary
          fixturesMatchSummary(config[i].opta);
          // set empty message
          fixturesEmptyMessage(config[i].opta, config[i].attributes["results"]);
          // enable link tracking
          enableLinkTracking(config[i].opta);
          // send analytics event
          if (config[i].attributes["results"] == "true") {
            analytics("load", "widget", "results");
          }
        }

        // fixtures plus
        if (config[i].attributes["widget"] == "fixtures_plus") {
          // add article and video link
          if (config[i].attributes["results"] == "true") {
            var args = {
              season: config[i].attributes["season"],
              comp: config[i].attributes["competition"],
              article: config[i].attributes["article_link"],
              video: config[i].attributes["video_link"]
            };
            fixturesArticleVideoLinks(config[i].opta, args, true);
          }
          // set empty message
          fixturesEmptyMessage(config[i].opta, config[i].attributes["results"]);
          // enable link tracking
          enableLinkTracking(config[i].opta);
          // send analytics event
          if (config[i].attributes["results"] == "true") {
            analytics("load", "widget", "results");
          }
        }

        // season standings
        if (config[i].attributes["widget"] == "seasonstandings") {
          // reduce p tag width
          widget.parent().width(parseInt(widget.parent().width())-20);
          // title tag
          $(".opta-seasonstandings > h2 span").html("Season Standings");
        }

        // match summary
        if (config[i].attributes["widget"] == "match_summary") {
          var season = config[i].attributes["season"];
          var comp = config[i].attributes["competition"];
          var match = config[i].attributes["match"];
          // setup video player
          if (config[i].attributes["video_link"] != null) {
            matchSummaryVideo(config[i].opta, season, comp, match);
          }
        }

        // link tracking - standings, team_ranking
        if (config[i].attributes["widget"] == "standings" ||
            config[i].attributes["widget"] == "teamranking" ||
            config[i].attributes["widget"] == "playerranking" ||
            config[i].attributes["widget"] == "tournamenttree" ||
            config[i].attributes["widget"] == "matchstats" ||
            config[i].attributes["widget"] == "match_summary" ||
            config[i].attributes["widget"] == "timeline") {
          // enable link tracking
          enableLinkTracking(config[i].opta);
        }

        // title tags
        if (config[i].attributes["widget"] == "teamranking") {
          $(".opta-teamranking > h2 span").html("Team Ranking");
        } else if (config[i].attributes["widget"] == "playerranking") {
          $(".opta-playerranking > h2 span").html("Player Ranking");
        } else if (config[i].attributes["widget"] == "actionareas") {
          $(".opta-actionareas > h2 span").html("Action Areas");
        } else if (config[i].attributes["widget"] == "averageposition") {
          $(".opta-averageposition > h2 span").html("Average Position");
        } else if (config[i].attributes["widget"] == "formation") {
          $(".opta-formation > h2 span").html("Formation");
        } else if (config[i].attributes["widget"] == "matchstats") {
          $(".opta-matchstats .matchstats-lineup > h2 span").append(" — Lineup");
        } else if (config[i].attributes["widget"] == "optafacts") {
          $(".opta-optafacts > h2 span").html("Facts");
        }

        // load callback
        //self.loadWidget(config[i].attributes["widget"]);

        // send analytics event
        //console.log("load widget: "+config[i].attributes["widget"]);
        analytics("load", "widget", config[i].attributes["widget"]);
      }
    }
  }

  //this.loadWidget = function(widget) {
    //console.log("load-"+widget);
  //}

  /**
   * WIDGET CONTROLLERS
   */
  function fixturesEmptyMessage(id, results) {
    if ($("#"+id).find(".fixtures.opta-empty").length > 0) {
      var type = "fixtures"; if (results == "true") { type = "results"; }
      $("#"+id).find(".fixtures.opta-empty p").html("There are no "+type+" available");
    }
  }

  function fixturesMatchSummary(id) {
    // loop though matches
    $("#"+id).find(".match").each(function(index) {
      // check trigger flag
      if ($(this).attr("data-match-trigger") != "true") {
        // get button element
        var button = $(this).find("button");
        // set events
        button.on("click", function(event) { event.stopPropagation(); });
        $(this).on("click", function(event) { fixturesMatchSummaryClick($(this)); });
      }
      // set trigger flag
      $(this).attr("data-match-trigger", "true");
    });
  }

  function fixturesMatchSummaryClick(element) {
    // open summary
    if (element.find("button.details-collapsed").length > 0) {
      element.find("button.details-collapsed").trigger("click");
      // send analytics event
      analytics("click", "widget", "matchsummary");
    // close summary
    } else if (element.find("button.details-expanded").length > 0) {
      element.find("button.details-expanded").trigger("click"); 
    }
  }

  function fixturesArticleVideoLinks(id, args, plus) {
    // set flag
    var firstVideo = true;
    // check attribute
    if ($("#"+id).parent().attr("data-video_open") == "false") { firstVideo = false; }

    // set match element
    var matchElement = ".match";
    if (plus) { matchElement = ".scoreline"; }

    // loop though matches
    $("#"+id).find(matchElement).each(function(index) {
      // check trigger flag
      if ($(this).attr("data-article-trigger") != "true") {
        // set trigger flag
        $(this).attr("data-article-trigger", "true");

        // get link - fixtures only 
        var href = $(this).find(".match-score > a").attr("href");
        // set match
        var match = (plus) ? $(this).attr("data-match") : getQueryParamByName(href, "match");

        // loop though article data
        for (var i in articleData) {
          if (articleData[i].c == args.comp && articleData[i].s == args.season) {
            // loop though matches
            for (var ii in articleData[i].ms) {
              if (articleData[i].ms[ii].m == match) {

                // article
                if (args.article != null) {
                  // create reference to element
                  var element = $(this).find(".match-time");
                  // replace time with report text
                  element.html("Match<br/>report");
                  // add style class
                  element.addClass("report");
                  // create data attribute
                  element.attr("data-url", articleData[i].ms[ii].a);
                  // create link
                  element.on("click", function(event) { event.stopPropagation();
                    window.open($(this).attr("data-url"), "_blank"); });
                }

                // video
                if (args.video != null) {

                  // fixtures plus
                  if (plus) {
                    // create reference to element
                    var element = $(this).find("td:last-child");
                    // replace time with report text
                    element.html("Video<br/>highlights");
                    // add style class
                    element.addClass("video");
                    // create data attribute
                    element.attr("data-match", articleData[i].ms[ii].m);
                    element.attr("data-video", articleData[i].ms[ii].v);

                    // create reference to element
                    var lastElement = ($(this).next().hasClass("aggregate")) ? $(this).next() : $(this);
                    // create player div
                    lastElement.after("<tr class=\"videoContainer\"><td colspan=\"7\" id=\"vp"+articleData[i].ms[ii].m+"\" class=\"videoPlayer video-player\" data-video-id=\""+articleData[i].ms[ii].v+"\"></td></tr>");

                  // fixtures
                  } else {
                    // create link div
                    $(this).append("<div class=\"video\">Video<br/>highlights</div>");
                    // create data attribute
                    $(this).find(".video").attr("data-match", articleData[i].ms[ii].m);
                    $(this).find(".video").attr("data-video", articleData[i].ms[ii].v);
                    // create player div
                    $(this).next().after("<div class=\"videoContainer\"><div id=\"vp"+articleData[i].ms[ii].m+"\" class=\"videoPlayer video-player\" data-video-id=\""+articleData[i].ms[ii].v+"\"></div></div>");
                  }

                  // create link
                  $(this).find(".video").on("click", function(event) {
                    event.stopPropagation();
                    fixturesMatchHighlightsClick($(this)); });

                  // open video
                  if (firstVideo == true) {
                    // set flag
                    firstVideo = false;
                    // set animation speed
                    animateDuration = 0;
                    // trigger click
                    $(this).find(".video").trigger("click");
                    // set animation speed
                    animateDuration = animateDurationDefault;
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  function fixturesMatchHighlightsClick(element) {
    // get ids
    var match = element.attr("data-match");
    var video = element.attr("data-video");
    // set video element
    element = $("#vp"+match);

    // close video
    if (element.attr("data-active") == "true") {
      // remove video
      removeVideo();      
    
    // open video
    } else {
      // remove video
      removeVideo();

      // set data and styles
      element.attr("data-active", "true");
      element.parent().addClass("active");

      // set height
      var height = Math.round((element.width() / 16) * 9);
      if (height > 350) { height = 350; }
      // animate
      element.animate({ height: height+"px" }, animateDuration);

      // create player
      videoElement = element;
      videoEmbed = video;
      // load script
      loadVideoScript();

      // send analytics event
      analytics("click", "widget", "video");
    }
  }

  function matchSummaryVideo(id, season, comp, match) {
    // loop though article data
    for (var i in articleData) {
      if (articleData[i].c == comp && articleData[i].s == season) {
        // loop though matches
        for (var ii in articleData[i].ms) {
          if (articleData[i].ms[ii].m == match) {
            // create player div
            $("#"+id).before("<h2 class=\"videoHeader\"><span>Match Highlights</span></h2>");
            $("#"+id).before("<div class=\"videoContainer\"><div id=\"vp"+articleData[i].ms[ii].m+"\" class=\"videoPlayer video-player match_summary\" data-video-id=\""+articleData[i].ms[ii].v+"\"></div></div>");

            // remove video
            removeVideo();

            // set video element
            var element = $("#vp"+articleData[i].ms[ii].m);

            // set height
            var height = Math.round((element.width() / 16) * 9);
            if (height > 350) { height = 350; }
            // animate
            element.animate({ height: height+"px" }, animateDuration);

            // create player
            videoElement = element;
            videoEmbed = articleData[i].ms[ii].v;
            // load script
            loadVideoScript();
          }
        }
      }
    }
  }

  /**
   * VIDEO
   */
  function loadVideoScript() {
    // tto token service
    if (typeof tto !== "undefined") {
      // init video token
      tto.sportOoyalaAccountType = 'prod';
      tto.sportTokenServiceUrl = 'http://feedengine.thetimes.co.uk/tokenservice/generate/';
      tto.ooyalaBacklotAccount = 'epl';
      // init video
      tto.sportVideoPlayer = new tto.SportVideoPlayer("#"+videoElement.attr("id"));
      setTimeout(function(){ tto.sportVideoPlayer.render(); }, animateDuration);
      // set player ref
      ttoPlayer = tto.sportVideoPlayer;
      // send analytics event
      analytics("video", "account", "token");

    // load tto token service script
    //} else {
      //$.getScript(self.basePath+"reader/js/vendor/tto-video.js", function() { loadVideoScript(); });
    //}

    // ooyala player - insecure player!!
    } else {
      // init video script
      if (typeof OO !== "undefined") { initVideoPlayer(); }
      else { $.getScript(videoScript, function() { initVideoPlayer(); }); }
    }
  }

  function initVideoPlayer() {
    videoPlayer = OO.Player.create(videoElement.attr("id"), videoEmbed, {});
    // send analytics event
    analytics("video", "account", "open");
  }

  function removeVideo() {
    if (ttoPlayer) {
      // destory player
      tto.sportVideoPlayer.player.destroy();
      ttoPlayer = null;
    }
    if (videoPlayer) {
      // destory player
      videoPlayer.destroy();
      videoPlayer = null;
    }
    if (videoElement) {
      // set data and styles
      videoElement.attr("data-active", "false");
      videoElement.parent().removeClass("active");
      // close element
      videoElement.animate({height:0}, animateDuration);
      videoElement = null;
    }
  }

  /**
   * LINK TRACKING
   */
  function enableLinkTracking(id) {

    // disable opta link tracking
    $jqOpta.enableLinkTracking = function() {};

    // loop though links
    $("#"+id).find("a").each(function(index) {
      
      // get link
      var href = $(this).attr("href");
      // override opta link
      if (href.substr(0, 5) == "true?") {

        // get link params
        var season = getQueryParamByName(href, "season");
        var comp = getQueryParamByName(href, "competition");
        var match = getQueryParamByName(href, "match");
        var team = getQueryParamByName(href, "team");
        var player = getQueryParamByName(href, "player");

        // match link
        if (match) {
          $(this).on("click", function(event) {
            event.stopPropagation();
            self.matchLinkTracking(season, comp,  match);
            // send analytics event
            analytics("click", "link", "match");
          });

        // player link
        } else if (player) {
          $(this).on("click", function(event) {
            event.stopPropagation();
            self.playerLinkTracking(season, comp, team, player);
            // send analytics event
            analytics("click", "link", "player");
          });

        // team link
        } else if (team) {
          $(this).on("click", function(event) {
            event.stopPropagation();
            self.teamLinkTracking(season, comp, team);
            // send analytics event
            analytics("click", "link", "team");
          });

        // competition link
        } else {
          $(this).on("click", function(event) {
            event.stopPropagation();
            self.compLinkTracking(season, comp);
            // send analytics event
            analytics("click", "link", "competition");
          });
        }

        // override link
        $(this).attr("href", "javascript:console.log('overrided link')");
      }
    });
  }

  function getQueryParamByName(query, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(query);
    var results = (results == null) ? "" :
      decodeURIComponent(results[1].replace(/\+/g, " "));
    return results;
  }

  this.compLinkTracking = function(season, comp) {
    console.log("comp");
  }

  this.matchLinkTracking = function(season, comp, match) {
    console.log("match");
  }

  this.teamLinkTracking = function(season, comp, team) {
    console.log("team");
  }

  this.playerLinkTracking = function(season, comp, team, player) {
    console.log("player");
  }

  /**
   * ANALYTICS
   */
  function analytics(category, action, label, value) {
    // load analytics script
    if (typeof ga === "undefined" || ga.getByName == null) {
      $.getScript(self.basePath+"common/js/analytics.js", function() {
        analytics(category, action, label, value); });
    // define tracker
    } else if (!ga.getByName("footballWidgets")) {    
      ga("create", "UA-29101250-9", "auto", {"name": "footballWidgets"});
      analytics(category, action, label, value);
    // send event
    } else {
      //console.log("analytics: "+category+" "+action+" "+label+" "+value);
      ga("footballWidgets.send", "event", category, action, label, value);
    }
  }

  // set model
  var config = [];

  // set index counter
  var widgetCount = 0;

  // set data
  var widgetData = null;
  var articleData = null;

  // set animation
  var animateDuration = 500;
  var animateDurationDefault = 500;

  // video refernce
  var ttoPlayer = null; // tto object
  var videoEmbed = null; // embed code
  var videoPlayer = null; // player object
  var videoElement = null; // dom element

  var videoScript = "http://player.ooyala.com/v3/NzUwODU5MDkxMWQyNmI0ZWZhOTViMzI0?platform=html5-priority&tweaks=android-enable-hls";
}

// opta account settings
var _optaParams = { custID:"db98cff9f9612c01bbf3435964748e95", timezone:0 };

// initialise opta widget
var OptaFootballInit = function(args) {
  // create singleton
  if (typeof _optaFootball === "undefined") {
    _optaFootball = new OptaFootball();
  }
  // update arguments
  for (var i in args) {
    if (args[i] != null) {
      _optaFootball[i] = args[i];
    }
  }
  // init object
  _optaFootball.init();
}

// remove opta widget
var OptaFootballDestroy = function(id) {
  // destory object
  if (typeof _optaFootball !== "undefined") {
    _optaFootball.destroy(id);
  }
}