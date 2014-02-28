(function() {
    

/**
     * [onPlayerReady description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    var onPlayerReady = function(event) {
        console.log("player onReady");
    }

    // Usage example
    var ytubeMe = new possible.YouTubeMe({
        videoId: "tXL7tA5070k",
        width: 500,
        height: 300,
        container: 'player',
        onPlayerReady:onPlayerReady
    });


    
    /**
     * [onPlayerStateChange description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    var onPlayerStateChange = function(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            console.log("onPlayerStateChange");
        }
    }

    ytubeMe.playVideo();

    $("#loadnaother").on("click", function() {
        var ytubeMe2 = new possible.YouTubeMe({
            videoId: "T2dSE6_utcE",
            container: 'player2'
        });

        ytubeMe2.playVideo();
    })

})();
