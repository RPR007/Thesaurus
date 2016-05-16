var keyState = [];

function keyIsPressed() {
	console.log('Key Code (pressed) : ' + event.keyCode);
	keyState[event.keyCode] = true;
}

function keyIsReleased() {
	console.log('Key Code (released) : ' + event.keyCode);
	keyState[event.keyCode] = false;
}

function mouseLook() {
	var correctionY = 0;
	var correctionX = 0;

	if (document.body.clientHeight>720)
		correctionY = (document.body.clientHeight-720)/2;

	if (document.body.clientWidth>1280)
		correctionX= (document.body.clientWidth-1280)/2;
	//console.log('Position souris : x='+ (event.clientX-correctionX) +'; y='+ (event.clientY-correctionY));
}

function cameraLoop() {
    var camera = objScene3D.camera;
	// Regarder à gauche et à droite
	if (keyState[37] || keyState[39]) { 
        // 37:  Flèche-à-gauche; 39:Flèche-à-droite
        var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        var intDirection = (keyState[37]) ? -1 : 1;
        var fltAngle = intDirection * Math.PI / 90; // Tourner 2 degrés
        var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
        var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
        setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }

    // Avancer ou reculer
    if (keyState[38] || keyState[40]) {
	    // 38:  Flèche-en-haut; 40:Flèche-en-bas
	    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
	    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
	    var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
	    var intDirection = (keyState[38]) ? 1 : -1;

	    var fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
	    var fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

	    setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
	    setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
	    setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
	    setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }

    setTimeout(cameraLoop, 10);
}