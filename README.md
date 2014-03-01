YouTubeMe
=========

JS proxy to interface with the YouTube API.

<h5>Usage example.</h5>
	<div id="playerDiv"></div>
	var ytubeMe = new possible.YouTubeMe({
		videoId: "tXL7tA5070k",
		width: 500,
		height: 300,
		container: 'playerDiv',
		onReady: onReady,
		onStateChange: onStateChange
	});
	
    //YouTube event listeners.
    var onReady = function(event) {
        $('body').append("<p>onPlayerReady event has fired.</p>");
    }

    var onStateChange = function(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            $('body').append("<p>onPlayerStateChange: PLAYING event has fired.</p>");
        }

        if (event.data == YT.PlayerState.PAUSED) {
            $('body').append("<p>onPlayerStateChange: PAUSED event has fired.</p>");
        }
    }

<a href="http://rcolepeterson.com/YouTubeMe/example/index.html" target="_blank">DEMO</a>
