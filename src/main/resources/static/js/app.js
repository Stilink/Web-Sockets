var app = (function () {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    var stompClient = null;
    var topic = ""
    var addPointToCanvas = function (point) {
        console.info('Intentando postear el nuevo punto');
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };


    var getMousePosition = function (evt) {
        canvas = document.getElementById("myCanvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };


    var connect = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

        });
    };

    var subscribe = (id) => {
        //console.log(stompClient)
        topic = '/app/newpoint/' + id
        console.log("pulse aca y me subscribi a" + topic)
        stompClient.subscribe(topic, function (eventbody) {
            let newPoint = JSON.parse(eventbody.body);
            addPointToCanvas(newPoint);
        });

    }

    return {

        init: function () {
            var can = document.getElementById("myCanvas");
            connect();
        },

        publishPoint: function (px, py) {
            var pt = new Point(px, py);
            console.info("publishing point at " + pt);
            addPointToCanvas(pt);
            console.info('Enviando punto a ' + topic + '...');
            stompClient.send(topic, {}, JSON.stringify(pt));
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },
        clickSubscribe: () => {
            var idNum = document.getElementById("num").value
            subscribe(idNum)
        }
    };

})();