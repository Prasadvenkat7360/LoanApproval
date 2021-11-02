var socket;

function wsService() {
    (socket = new WebSocket("ws://localhost:20001")).onerror = function(e) {
        $.event.trigger({
            type: "socketMsg",
            message: "Error : Connecting to service.",
            time: new Date
        })
    }, socket.onmessage = function(e) {
    	var resp = JSON.parse( e.data );
    	console.log(resp.Weight)
    	localStorage.setItem("wsValue",resp.Weight);
    	socket.close()
    }, socket.onopen = function() {
        socket.send("GetWeight")
    }
}