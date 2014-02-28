//http://stackoverflow.com/questions/1114024/constructors-in-javascript-objects
var possible = this.possible || {};
(function($) {
    "use strict";
    /**
     * [YouTubeMe description]
     * @param {[type]} params [description]
     */
    var YouTubeMe = function(params) {
        this.initialize(params);
    }
    var p = YouTubeMe.prototype;
    
    p.pwidth = 300;
    p.pheight = 900;
    
    /**
     * [initialize description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
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
        if ( params.onPlayerReady)
            this.onPlayerReady = params.onPlayerReady;
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
            console.log(this.container + "already hav ethis.container videoId " + this.videoId);
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
                'onReady': this.onPlayerReady
                //,
                //'onStateChange': this.onPlayerStateChange
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
