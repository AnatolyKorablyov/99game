goog.provide("ispring.sample.GameModel");

goog.require("ispring.sample.Definition");
goog.require("ispring.sample.CShape");

goog.scope(function() {
    /**
     * @constructor
     */
    const GAME_CONFIG = ispring.sample.Definition;
    const SHAPE = ispring.sample.CShape;
    const conf = new GAME_CONFIG();

    ispring.sample.GameModel = goog.defineClass(null, {
        constructor: function () {
            this._triangle = new SHAPE();
            this.ResetData();
        },
        
        /** (private)
         *
         * @param min
         * @param max
         * @returns {*}
         * @private
         */
        GetRandomArbitary: function(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        InitObjects: function () {
            var shape = new Path2D();
            shape.moveTo(conf._RADIUS / 2, 0);
            shape.lineTo(conf._RADIUS, conf._RADIUS);
            shape.lineTo(0, conf._RADIUS);
            shape.lineTo(conf._RADIUS / 2, 0);
            this._triangle.SetPath(shape);
            var changeColor = this.GetRandomArbitary(0, conf._NUMBER_OF_COLORS - 1);
            this._triangle.SetColor(conf._COLORS[changeColor]);
            this._triangle.SetPosition(conf._CENTER_X - conf._RADIUS / 2, conf._CENTER_Y + conf._RADIUS);


            shape = new Path2D();
            shape.arc(0, 0, conf._RADIUS, 0, conf._TWO_HALVES / conf._NUMBER_OF_COLORS * Math.PI);
            shape.lineTo(0, 0);

            for (var i = 0; i < conf._NUMBER_OF_COLORS; ++i) {
                this._shapes.push(new SHAPE());
                var num = this._shapes.length;
                this._shapes[num - 1].SetPath(shape);
                this._shapes[num - 1].SetColor(conf._COLORS[i]);
                this._shapes[num - 1].SetPosition(conf._CENTER_X, conf._CENTER_Y);
                this._shapes[num - 1].SetRotation(2 / conf._NUMBER_OF_COLORS * Math.PI * i);
                this._shapes[num - 1].SetStartRotation(2 / conf._NUMBER_OF_COLORS * Math.PI * i);
            }
        },
        ResetData: function()
        {
            this._top = window.localStorage.getItem(conf._TOP_RESULT);
            this._score = 0;
            this._speed = conf._SPEED;
            this._rotation = 0;
            this._twist = false;
            this._numberOfColors = conf._NUMBER_OF_COLORS;
            this._shapes = [];
            var changeColor = this.GetRandomArbitary(0, conf._NUMBER_OF_COLORS - 1);
            this._triangle.SetColor(conf._COLORS[changeColor]);
            this._colors = [];
            for (var i = 0; i < conf._NUMBER_OF_COLORS; ++i)
            {
                this._colors.push(conf._COLORS[i]);
            }
            this.InitObjects();
            this.RotateSystem();
        },
        RotateSystem: function()
        {
            if (this._twist)
            {
                this._rotation += this._speed;
            }
            else
            {
                this._rotation -= this._speed;
            }
            for (var i = 0; i < this._shapes.length; ++i)
            {
                var startRotate = this._shapes[i].GetStartRotation();
                this._shapes[i].SetRotation(startRotate + this._rotation);
            }
        },
        GetShapes: function() {
            return this._shapes;
        },
        GetShapesWithArrow: function() {
            return [this._triangle].concat(this._shapes);
        },
        GetRotate: function() {
            return this._rotation;
        },
        GetTwist: function()
        {
            return this._twist;
        },
        GetArrow: function()
        {
            return this._triangle;
        },
        GetTop: function()
        {
            return this._top;
        },
        GetScore: function()
        {
            return this._score;
        },
        GetSpeed: function()
        {
            return this._speed;
        },
        SetTop: function(top)
        {
            this._top = top;
        },
        IncrementScore: function()
        {
            ++this._score;
        },
        IncrementSpeed: function()
        {
            this._speed += conf._ADD_SPEED;
        },
        IncrementSectors: function()
        {
            ++this._numberOfColors;

            var r = this.GetRandomArbitary(0, 256);
            var g = this.GetRandomArbitary(0, 256);
            var b = this.GetRandomArbitary(0, 256);
            var newRandomColor='#' + r.toString(16) + g.toString(16) + b.toString(16);
            this._colors.push(newRandomColor);

            this._shapes = [];
            shape = new Path2D();
            shape.arc(0, 0, conf._RADIUS, 0, conf._TWO_HALVES / this._numberOfColors * Math.PI);
            shape.lineTo(0, 0);

            for (var i = 0; i < this._numberOfColors; ++i) {
                this._shapes.push(new SHAPE());
                var num = this._shapes.length;
                this._shapes[num - 1].SetPath(shape);
                this._shapes[num - 1].SetColor(this._colors[i]);
                this._shapes[num - 1].SetPosition(conf._CENTER_X, conf._CENTER_Y);
                this._shapes[num - 1].SetRotation(conf._TWO_HALVES / this._numberOfColors * Math.PI * i);
                this._shapes[num - 1].SetStartRotation(conf._TWO_HALVES / this._numberOfColors * Math.PI * i);
            }
        },
        SetColorArrow: function(color) {
            this._triangle.SetColor(color);
        },
        GetNumberOfColors: function() 
        {
            return this._numberOfColors;
        },
        GetColors: function () 
        {
            return this._colors;
        }
    });
});