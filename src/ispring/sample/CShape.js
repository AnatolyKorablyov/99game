goog.provide("ispring.sample.CShape");

goog.scope(function() {
    /**
     * @constructor
     */

    function CCoord()
    {
        this.X = 0;
        this.Y = 0;
    }
    ispring.sample.CShape = goog.defineClass(null, {
        constructor: function() {
            /** (private)
             *
             * @type {Path2D}
             */
            this.m_shape = new Path2D();
            /** (private)
             * 
             * @type {string}
             */
            this.m_color = "";
            /** (private)
             * 
             * @type {number}
             */
            this.m_rotation = 0;
            this.m_startRotation = 0;
            /** (private)
             *
             * @type {CCoord}
             */
            this.m_pos = new CCoord();
        },

        /**
         * @param {Path2D} param1
         */
        SetPath: function(param1) {
            this.m_shape = new Path2D(param1);
        },
        /**
         * 
         * @param {string} color
         */
        SetColor: function(color)
        {
            this.m_color = color;
        },
        /**
         *
         * @param {number} rotation
         */
        SetRotation: function(rotation)
        {
            this.m_rotation = rotation;
        },
        /**
         *
         * @param {number} rotation
         */
        SetStartRotation: function(rotation)
        {
            this.m_startRotation = rotation;
        },
        /**
         *
         * @param {number} posX
         * @param {number} posY
         */
        SetPosition: function(posX, posY)
        {
            this.m_pos.X = posX;
            this.m_pos.Y = posY;
        },
        GetPath: function()
        {
            return this.m_shape;
        },
        GetColor: function() 
        {
            return this.m_color;
        },
        GetRotation: function()
        {
            return this.m_rotation;
        },
        GetPosition: function()
        {
            return this.m_pos;
        },
        GetStartRotation: function()
        {
            return this.m_startRotation;
        }
    });
});