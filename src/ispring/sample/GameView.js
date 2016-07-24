goog.provide("ispring.sample.GameView");

goog.require("ispring.sample.Definition");
goog.require("ispring.sample.CShape");

goog.scope(function() {
    const GAME_CONFIG = ispring.sample.Definition;
    const config = new GAME_CONFIG();

    /**
     * @constructor
     */
    ispring.sample.GameView = goog.defineClass(null, 
        {
        constructor: function(canvas) 
        {
            this._canvasSize = {width: canvas.width, height: canvas.height};
            this._context = canvas.getContext("2d");

            this._speedNode = document.getElementById("speed");
            this._resultNode = document.getElementById("result");
            this._topResultNode = document.getElementById("topResult");

        },
        DrawShapes: function(shapes)
        {
            this._context.clearRect(0, 0, this._canvasSize.width, this._canvasSize.height);
            for (var i = 0; i < shapes.length; ++i)
            {
                this._context.save();
                this._context.translate(shapes[i].GetPosition().X, shapes[i].GetPosition().Y);
                this._context.rotate(shapes[i].GetRotation());
                this._context.fillStyle = shapes[i].GetColor();
                this._context.fill(shapes[i].GetPath());
                this._context.restore();
            }
        },
        DrawText: function(score, speed, record)
        {
            this._speedNode.innerHTML = "Speed: " + Math.ceil(speed*100)/100;
            this._resultNode.innerHTML = "Score: " + Math.ceil(score*100)/100;
            this._topResultNode.innerHTML = "Record: " + record;
        }
    });
});