// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Materials = require('Materials');
const Textures = require('Textures');

// How to log messages to the console (uncomment line below to activate)
Diagnostics.log('Logging...\n');

// How to access scene objects
var planeTracker = Scene.root.find('planeTracker0');
var plane_tramMap = planeTracker.child('target_plane');
var material_tramMap = Materials.get('mat_tram_map');
var texture_target_myki = Textures.get('myki_card');
var texture_tram_map = Textures.get('TramMap');

// Store a reference to the transform of the plane
const planeTransform = planeTracker.transform;

const mapTransform = plane_tramMap.transform;

TouchGestures.onTap(material_tramMap).subscribe(function(gesture) {
  //TODO:  https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/touchgesturesmodule
  Diagnostics.log(`tapped...`);
  Diagnostics.log(
    `${plane_tramMap.materialIdentifier === material_tramMap.identifier}`
  );
});

//==============================================================================
// Scale the plane when pinching it with two fingers
//==============================================================================

// Subscribe to pinch gestures on the plane
TouchGestures.onPinch(plane_tramMap).subscribe(function(gesture) {
  Diagnostics.log('...this pinches.....');
  // Store the last known x and y-axis scale values of the plane
  const lastScaleX = mapTransform.scale.x.pinLastValue();
  const lastScaleY = mapTransform.scale.y.pinLastValue();

  // Update the scale of the plane by multiplying the last known scale with the
  // scale returned by the gesture
  mapTransform.scaleX = gesture.scale.mul(lastScaleX);
  mapTransform.scaleY = gesture.scale.mul(lastScaleY);
  // planeTransform.scaleY = gesture.scale.mul(lastScaleY);
});

//==============================================================================
// Move the plane across the screen when dragging it with a finger
//==============================================================================

// Subscribe to pan gestures on the plane
// TouchGestures.onPan(plane_tramMap).subscribe(function(gesture) {
//   Diagnostics.log('...panning.....');
//   // Translate the position of the finger on the screen to the plane's
//   // co-ordinate system
//   const gestureTransform = Scene.unprojectToFocalPlane(gesture.location);

//   // Update the position of the plane
//   plane_tramMap.x = gestureTransform.x;
//   plane_tramMap.y = gestureTransform.y;
// });

//==============================================================================
//
//
//  *********************** LEGACY ***********************
//
//
//==============================================================================
// TouchGestures.onTap().subscribe(function(gesture) {
//   planeTracker.trackPoint(gesture.location);
// });

// TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
//   planeTracker.trackPoint(gesture.location, gesture.state);
// });

// TouchGestures.onPinch().subscribe(function(gesture) {
//   var lastScaleX = planeTracker.transform.scaleX.pinLastValue();
//   planeTracker.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

//   var lastScaleY = planeTracker.transform.scaleY.pinLastValue();
//   planeTracker.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

//   var lastScaleZ = planeTracker.transform.scaleZ.pinLastValue();
//   planeTracker.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
// });

// TouchGestures.onRotate(planeTracker).subscribe(function(gesture) {
//   var lastRotationY = planeTracker.transform.rotationY.pinLastValue();
//   planeTracker.transform.rotationY = Reactive.add(
//     lastRotationY,
//     Reactive.mul(-1, gesture.rotation)
//   );
// });
