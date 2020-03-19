var clicEvent = (function () {



    //returns an object with 'public' functions:
    return {

        //function to initialize application
        init: function () {
            var canvas = document.getElementById("myCanvas"), context = canvas.getContext("2d")
            if (window.PointerEvent) {
                canvas.addEventListener("pointerdown", function (event) {
                    var posx = event.pageX - $('#myCanvas').offset().left;
                    var posy = event.pageY - $('#myCanvas').offset().top;
                    let p={ x:posx ,y:posy};
                    app.publishPoint(p.x, p.y);
                })
            }
            else {
                canvas.addEventListener("mousedown", function (event) {
                    alert('mousedown at ' + event.pageX + ',' + event.pageY)
                })
            }
        }
    };
})();