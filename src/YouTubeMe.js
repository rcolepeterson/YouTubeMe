/*global YT*/
'use strict';
var possible = this.possible || {};
(function() {
  /**
     * JS proxy to interface with the YouTube API.
     * @param {object} params
     *
       {
            videoId: "tXL7tA5070k", //video Id.
            width: 500,
            height: 300,
            container: 'player', //div to target
            onPlayerReady: onPlayerReady //callback
        }
     *
     */
  var YouTubeMe = function(params) {
    this.initialize(params);
  };
  var p = YouTubeMe.prototype;
  //defaults
  p.pwidth = 500;
  p.pheight = 300;
  p.onReady = function() {};
  p.onStateChange = function() {
    console.log('cool');
  };
  p.playerVars = {
    autoplay: 0,
    controls: 1,
    modestbranding: 0,
    rel: 0,
    showInfo: 0
  };

    /**
     * Initialize instance. Apply params.
     * @param  {[type]} params [description]
     */
    p.initialize = function(params) {
        if (!params.videoId || !params.container){
            throw Error('missing video id or container');
        }

        for ( var i in params){
            this[i] = params[i];
        }
    };

  /**
     * [playVideo description]
     * @return {[type]} [description]
     */
    p.playVideo = function() {
        if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
            var that = this;
            window.onYouTubeIframeAPIReady = function() {
                that.loadPlayer();
            };

            var u = '//www.youtube.com/iframe_api';
            var h = document.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            s.async = true; s.src = u;
            s.onload = s.onreadystatechange = function () {
              if (!s.readyState || /loaded|complete/.test(s.readyState)) {
                s.onload = s.onreadystatechange = null; if (h && s.parentNode) { h.removeChild(s) } s = undefined;
              }
            };
            h.insertBefore(s, h.firstChild);


      var u = '//www.youtube.com/iframe_api';
      var h = document.getElementsByTagName('head')[0];
      var s = document.createElement('script');
      s.async = true;
      s.src = u;
      s.onload = s.onreadystatechange = function() {
        if (!s.readyState || /loaded|complete/.test(s.readyState)) {
          s.onload = s.onreadystatechange = null;
          if (h && s.parentNode) {
            h.removeChild(s);
          }
          s = undefined;
        }
      };
      h.insertBefore(s, h.firstChild);
    } else {
      this.loadPlayer(this.container, this.videoId);
    }
  };

  /**
     * [loadPlayer description]
     * @return {[type]} [description]
     */
  p.loadPlayer = function() {
    this.ytPlayer = new YT.Player(this.container, {
      videoId: this.videoId,
      width: this.pwidth,
      height: this.pheight,
      frameborder: 0,
      events: {
        onReady: this.onReady,
        onStateChange: this.onStateChange
      },
      playerVars: this.playerVars
    });
  };

  /**
     * [stopVideo description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
  p.stopVideo = function() {
    this.ytPlayer.stopVideo();
  };

  possible.YouTubeMe = YouTubeMe;
})();
