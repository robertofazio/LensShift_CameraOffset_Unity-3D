#pragma strict
// Set an off-center projection, where perspective's vanishing
// point is not necessarily in the center of the screen.
//
// left/right/top/bottom define near plane size, i.e.
// how offset are corners of camera's near plane.
// Tweak the values and you can see camera's frustum change.

@script ExecuteInEditMode

public var GuiVisible : boolean = true;

// Register the window for drag
var windowRect : Rect = Rect (400, 20, 400, 200);

// Make camera wobble in a funky way!
var originalProjection : Matrix4x4;
var p00 : float;
var p01 : float;
var pHorizLensShift : float;
var pCamXPos : float;
var p04 : float;
var p05 : float;
var pVertLensShift : float;
var pCamYPos : float;
var p08 : float;
var p09 : float;
var p10 : float;
var p11 : float;
var p12 : float;
var p13 : float;
var p14 : float;
var p15 : float;

originalProjection = camera.projectionMatrix;

function Update () {

	if (Input.GetKey("i")) {
	GuiVisible =! GuiVisible;
	}

    var p : Matrix4x4 = originalProjection;
    
    // change some values from the original matrix
    p.m00 += p00;
    p.m01 += p01;
    p.m02 += pHorizLensShift;
    p.m03 += pCamXPos;

    p.m10 += p04;
    p.m11 += p05;
    p.m12 += pVertLensShift;
    p.m13 += pCamYPos;
    
    p.m20 += p08;
    p.m21 += p09;
    p.m22 += p10;
    p.m23 += p11;

    p.m30 += p12;
    p.m31 += p13;
    p.m32 += p14;
    p.m33 += p15;
        
    camera.projectionMatrix = p;
}


function OnGUI () {

	if (GuiVisible) {
	
	// Register the window.
    windowRect = GUI.Window (0, windowRect, DoMyWindow, "My Window"); 
    
	pHorizLensShift = GUI.HorizontalSlider (Rect (20, 50, 200, 10), pHorizLensShift, -1.001, 1.001);
	GUI.Label (Rect (230,45 , 200, 20), "X offset  " +pHorizLensShift);
	pVertLensShift = GUI.HorizontalSlider (Rect (20, 80, 200, 30), pVertLensShift, -1.0, 1.0);
	GUI.Label (Rect (230,75 , 200, 20), "Y offset  " +pVertLensShift);
	}
}

function DoMyWindow (windowID : int) {
    // Make a very long rect that is 20 pixels tall. 
    // This will make the window be resizable by the top
    // title bar - no matter how wide it gets.
    GUI.DragWindow (Rect (0,0, 1000, 200));
    
}