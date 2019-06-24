//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');

// How to access scene objects
const directionalLight = Scene.root.find('directionalLight0');

// How to access class properties
const directionalLightIntensity = directionalLight.intensity;

// How to log messages to the console (uncomment line below to activate)
//Diagnostics.log('I am a console message logged from the script');

const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');

var IronMan = Scene.root.find('IronMan.obj');
var planeTracker = Scene.root.find('planeTracker0');

TouchGestures.onTap().subscribe(function(gesture) {
  planeTracker.trackPoint(gesture.location);
});

// TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
//   planeTracker.trackPoint(gesture.location, gesture.state);
// });

TouchGestures.onPinch().subscribe(function(gesture) {
  var lastScaleX = IronMan.transform.scaleX.pinLastValue();
  IronMan.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

  var lastScaleY = IronMan.transform.scaleY.pinLastValue();
  IronMan.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

  var lastScaleZ = IronMan.transform.scaleZ.pinLastValue();
  IronMan.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(IronMan).subscribe(function(gesture) {
  var lastRotationY = IronMan.transform.rotationY.pinLastValue();
  IronMan.transform.rotationY = Reactive.add(
    lastRotationY,
    Reactive.mul(-1, gesture.rotation)
  );
});
