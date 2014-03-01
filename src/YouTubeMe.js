var possible = this.possible || {};
(function($) {
    "use strict";
    /**
     * JS proxy to interface with the YouTube API.
     * @param {object} params
     *
     *  {
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
    }
    var p = YouTubeMe.prototype;
    //defaults
    p.pwidth = 500;
    p.pheight = 300;
    p.onReady = function(){};
    p.onStateChange = function(){};

    /**
     * Initialize instance. Apply params.
     * @param  {[type]} params [description]
     */
    p.initialize = function(params) {
        this.videoId = params.videoId;
        this.container = params.container;

        if (params.height !== undefined) {
            this.pheight = params.height;
        }
        if (params.width !== undefined) {
            this.pwidth = params.width;
        }

        if (params.onReady)
            this.onReady = params.onReady;

        if (params.onStateChange)
            this.onStateChange = params.onStateChange;
    }

    /**
     * [playVideo description]
     * @return {[type]} [description]
     */
    p.playVideo = function() {
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            var that = this;
            window.onYouTubeIframeAPIReady = function() {
                that.loadPlayer();
            };
            $.getScript('//www.youtube.com/iframe_api');
        } else {
            this.loadPlayer(this.container, this.videoId);
        }
    }

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
                'onReady': this.onReady,
                'onStateChange': this.onStateChange
            },
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 0,
                rel: 0,
                showInfo: 0
            }
        });
    }


    /**
     * [stopVideo description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    p.stopVideo = function(event) {
        this.ytPlayer.stopVideo();
    }

    possible.YouTubeMe = YouTubeMe;

}(jQuery));
