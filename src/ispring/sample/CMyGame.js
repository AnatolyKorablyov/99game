goog.provide("ispring.sample.CMyGame");

goog.require("ispring.sample.CShape");

goog.scope(function()
{
    /**
     *
     * @param x
     * @param y
     * @constructor
     */
    function CCoord(x, y)
    {
        this.X = x;
        this.Y = y;
    }

//    goog.math
    
    const CShape = ispring.sample.CShape;
    const FONT_COLOR = "#00F";
    const COLORS = ["#F00", "#0F0", "#00F", "#FF0"];
    const CENTER_X = 300;
    const CENTER_Y = 150;
    const RADIUS = 100;
    const SPEED = 0.04;
    const SCORE = 0;
    const TOP = 0;
    const TWO_HALVES = 2;
    const NUMBER_OF_COLORS = 4;
    const FONT = "italic 30pt Arial";
    const POS_SCORE_LABEL = new CCoord(10, 50);
    const POS_SPEED_LABEL = new CCoord(20, 80);
    const POS_RECORD_LABEL = new CCoord(350, 50);
    const ADD_SPEED = 0.01;



    //var canvas = document.querySelector("canvas");
    //var context = canvas.getContext("2d");


    /**
     * @constructor
     */
    ispring.sample.CMyGame = goog.defineClass(null, {
        constructor: function(canvas) {
            this.m_shapes = [];
            this.InitObjects();

            this.m_top = TOP;
            this.m_score = 0;
            this.m_speed = SPEED;
            this.m_rotation = 0;
            this.m_twist = true;
            this.m_changeColor = 0;
            this.m_canvasSize = {width: canvas.width, height: canvas.height}; // использовать goog.math.Size
            this.m_context = canvas.getContext("2d");

            const thisPtr = this;

            this.GoGame();
            canvas.onmouseup = function()
            {
                thisPtr.OnMouseClick();
            };

            setInterval(function(){
                thisPtr.GoGame();
            }, 1000 / 30);
        },

        GetRandomArbitary: function(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        /**
         *
         * @param {CShape} l_shape
         */
        AddShapeToArr: function (l_shape) {
            var localShape = new CShape();
            localShape.SetPath(l_shape.GetPath());
            localShape.SetColor(l_shape.GetColor());
            localShape.SetPosition(l_shape.GetPosition());
            localShape.SetRotation(l_shape.GetRotation());
            this.m_shapes.push(l_shape);
        },
        InitObjects: function()
        {
            var triangle = new CShape();

            var shape = new Path2D();
            shape.moveTo(RADIUS/2, 0);
            shape.lineTo(RADIUS, RADIUS);
            shape.lineTo(0, RADIUS);
            shape.lineTo(RADIUS/2, 0);
            triangle.SetPath(shape);
            this.m_changeColor = this.GetRandomArbitary(0, NUMBER_OF_COLORS - 1);
            triangle.SetColor(COLORS[this.m_changeColor]);
            triangle.SetPosition(CENTER_X - RADIUS / 2, CENTER_Y + RADIUS);

            this.m_shapes.push(triangle);

            shape = new Path2D();
            shape.arc(0, 0, RADIUS, 0, TWO_HALVES/NUMBER_OF_COLORS*Math.PI);
            shape.lineTo(0, 0);

            for (var i = 0; i < NUMBER_OF_COLORS; ++i)
            {
                this.m_shapes.push(new CShape());
                var num = this.m_shapes.length;
                this.m_shapes[num-1].SetPath(shape);
                this.m_shapes[num-1].SetColor(COLORS[i]);
                this.m_shapes[num-1].SetPosition(CENTER_X, CENTER_Y);
                this.m_shapes[num-1].SetRotation(2/NUMBER_OF_COLORS*Math.PI*i);
                this.m_shapes[num-1].SetStartRotation(2/NUMBER_OF_COLORS*Math.PI*i);
            }
        },
        DrawObjects: function()
        {
            this.m_context.clearRect(0, 0, this.m_canvasSize.width, this.m_canvasSize.height);
            for (var i = 0; i < this.m_shapes.length; ++i)
            {
                this.m_context.save();
                this.m_context.translate(this.m_shapes[i].GetPosition().X, this.m_shapes[i].GetPosition().Y);
                this.m_context.rotate(this.m_shapes[i].GetRotation());
                this.m_context.fillStyle = this.m_shapes[i].GetColor();
                this.m_context.fill(this.m_shapes[i].GetPath());
                this.m_context.restore();
            }
            this.m_context.fillStyle = FONT_COLOR;
            this.m_context.font = FONT;
            this.m_context.fillText("Score " + this.m_score, POS_SCORE_LABEL.X, POS_SCORE_LABEL.Y);
            this.m_context.fillText("Speed " + Math.ceil(this.m_speed*100)/100, POS_SPEED_LABEL.X, POS_SPEED_LABEL.Y);
            this.m_context.fillText("Record " + this.m_top, POS_RECORD_LABEL.X, POS_RECORD_LABEL.Y);

        },
        RotateSystem: function()
        {
        	console.log(this.m_rotation);
            if (this.m_twist)
            {
                this.m_rotation += this.m_speed;
            }
            else
            {
                this.m_rotation -= this.m_speed;
            }
            for (var i = 1; i < this.m_shapes.length; ++i)
            {
                this.m_shapes[i].SetRotation(this.m_shapes[i].GetStartRotation() + this.m_rotation);
            }
        },
        CheckColors: function()
        {
            /**
             *
             * @param {number} min
             * @param {number} max
             */
            function checkRange(min, max)
            {
                return (this.m_shapes[i].GetStartRotation() < min && max < TWO_HALVES / NUMBER_OF_COLORS * Math.PI * i &&
                    this.m_shapes[i].GetColor() == this.m_shapes[0].GetColor());
            }

            var turn = this.m_rotation / (TWO_HALVES * Math.PI);
            turn = turn % 1;
            turn = turn * 2 * Math.PI;
            console.log("as ", turn);
            if (turn < 0)
            {
                turn = Math.abs(turn);
                console.log("Minus ", turn);
                for (var i = 1; i < this.m_shapes.length; ++i)
                {
                    if (checkRange(turn, turn))
                    {
                        return true;
                    }
                }
            }
            else
            {
                for (var i = 1; i < this.m_shapes.length; ++i)
                {
                    if (turn > 3 * Math.PI / 2 && turn < 2 * Math.PI)
                    {
                        if (this.m_shapes[i].GetStartRotation() < turn - Math.PI && turn - Math.PI < TWO_HALVES / NUMBER_OF_COLORS * Math.PI * i&&
                            this.m_shapes[i].GetColor() == this.m_shapes[0].GetColor())
                        {
                            return true;
                        }
                    }
                    else if (turn > 0 && turn < Math.PI / 2)
                    {
                        if (this.m_shapes[i].GetStartRotation() < turn && turn < TWO_HALVES / NUMBER_OF_COLORS * Math.PI * i &&
                            this.m_shapes[i].GetColor() == this.m_shapes[0].GetColor())
                        {
                            return true;
                        }
                    }
                    else if (turn > Math.PI && turn < 3 * Math.PI / 2)
                    {
                        if (this.m_shapes[i].GetStartRotation() < turn && turn < TWO_HALVES / NUMBER_OF_COLORS * Math.PI * i &&
                            this.m_shapes[i].GetColor() == this.m_shapes[0].GetColor())
                        {
                            return true;
                        }
                    }
                    else
                    {
                        if (this.m_shapes[i].GetStartRotation()< turn + Math.PI  && turn + Math.PI  < TWO_HALVES / NUMBER_OF_COLORS * Math.PI * i &&
                            this.m_shapes[i].GetColor() == this.m_shapes[0].GetColor())
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        OnMouseClick: function ()
        {
            if (!this.CheckColors())
            {
                alert("FAILED!");
                if (this.m_score > this.m_top)
                {
                    this.m_top = this.m_score;

                   // window.localStorage.setItem("topResult", this.m_top);
                   // window.localStorage.getItem("topResult");
                }
                this.m_score = SCORE;
                this.m_speed = SPEED;
            }
            else
            {
                ++this.m_score;
                if (this.m_score % 5 == 0)
                {
                    this.m_speed += ADD_SPEED;
                }
                var randNumber = this.GetRandomArbitary(0, NUMBER_OF_COLORS - 1);
                while (this.m_shapes[0].GetColor() == COLORS[randNumber]) {
                    randNumber = this.GetRandomArbitary(0, NUMBER_OF_COLORS - 1);
                }
                this.m_shapes[0].SetColor(COLORS[randNumber]);
                this.m_twist = !this.m_twist;
            }
        },
        GoGame: function ()
        {
            this.DrawObjects();
            this.RotateSystem();

            //requestAnimationFrame(this.DrawObjects);
        }
    });
});

// сохранить треугольник в отдельну переменную и выпилить из масива shapes
// использовать goog.math.Coordinate
// упростить условия
// методы с маленькой буквы
// доработать оформление кода
// передать canvas параметром в конструктор
// вынести надписи с canvas-a
// переписать на MVC
// сохранять и загружать top result в localstorage

