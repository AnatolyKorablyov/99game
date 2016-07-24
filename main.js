goog.provide("Sample");

//goog.require("ispring.sample.Foo");
/*
goog.require("ispring.sample.Bar2");
goog.require("ispring.sample.Bar3");
goog.require("ispring.sample.IBar");
*/

goog.require("ispring.sample.GameController");
//goog.require("ispring.sample.CMyGame");

/**
 * @export
 */
Sample.start = function()
{
	var myGame = ispring.sample.GameController;
	var canvas = document.querySelector("canvas");
	var game = new myGame(canvas);
};