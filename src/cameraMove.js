var keyState = [];
var havePointerLock = null;
var binMouseLock = false;

/*
* Pour bouger utilisez soit les flêches (avancer, reculer, regarder à droite et à gauche)
* ou alors
* utilisez WASD pour vous déplacer et la souris pour regarder
*/

function keyIsPressed() {
	console.log('Key Code (pressed) : ' + event.keyCode);
	keyState[event.keyCode] = true;
}

function keyIsReleased() {
//	console.log('Key Code (released) : ' + event.keyCode);
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

function lockPointer() {
	havePointerLock = 'pointerLockElement' in document ||
    				  	'mozPointerLockElement' in document ||
    					'webkitPointerLockElement' in document;

 	objCanvas.requestPointerLock = objCanvas.requestPointerLock ||
								     objCanvas.mozRequestPointerLock ||
								     objCanvas.webkitRequestPointerLock;
	// Demander au naviguateur de bloquer la souris
	objCanvas.requestPointerLock();

	// Pointer was just locked
	// Enable the mousemove listener
	if (!binMouseLock) {
		objCanvas.addEventListener("mousemove", test, false);
		console.log('mouse locked');
		binMouseLock = true;
	}
}

function test(e) {
	console.log(e.pageX+';'+e.pageY);
}

function cameraLoop() {
    var camera = objScene3D.camera;
    var binMovement = false;

	// Regarder à gauche et à droite
	if (keyState[37] || keyState[39]) {
		binMovement = true;

        // 37: Flèche à gauche ; 39: Flèche à droite
        var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        var intDirection = (keyState[37]) ? -1 : 1;
        var fltAngle = (intDirection*speedCamera) * Math.PI / 90; // Tourner 2 degrés
        var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
        var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
        setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }

    // Avancer ou reculer
    if ((keyState[38]||keyState[87]) || (keyState[40]||keyState[83])) {
    	binMovement = true;

	    // 38: Flèche en haut ; 40: Flèche en bas
	    // 87: W ; 83: S
	    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
	    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
	    var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
	    var intDirection = (keyState[38]||keyState[87]) ? 1 : -1;

	    var fltXPrime = (intDirection*speedWalk) * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
	    var fltZPrime = (intDirection*speedWalk) * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

	    //console.log('fltXPrime : '+ fltXPrime +' ; fltZPrime : '+ fltZPrime);

	    setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
	    setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
	    setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
	    setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }

    // Aller à gauche ou à droite
    if (keyState[65] || keyState[68]) {
    	binMovement = true;

    	// 65: A ; 65: D
	    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
	    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
	    var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
	    var intDirection = (keyState[65]) ? 1 : -1;

	    var fltXPrime = (intDirection*speedWalk) * 0.2 * Math.cos(Math.acos(fltZ / fltRayon));
	    var fltZPrime = (intDirection*speedWalk) * 0.2 * Math.sin(Math.asin(fltX / -fltRayon));

	    //console.log('fltXPrime : '+ fltXPrime +' ; fltZPrime : '+ fltZPrime);

	    setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
	    setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
	    setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
	    setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }

    if (!(document.pointerLockElement === objCanvas) &&
		!(document.mozPointerLockElement === objCanvas) &&
		!(document.webkitPointerLockElement === objCanvas) &&
		binMouseLock) {
		// Pointer was just unlocked
		// Disable the mousemove listener
		objCanvas.removeEventListener("mousemove", test, false);
		console.log('mouse unlocked');

		binMouseLock = false;
	}

    // Permet de ne pas réafficher si il n'y en a pas besoins
    if (binMovement) {
		effacerCanevas(objgl);
	    dessiner(objgl, objProgShaders, objScene3D);
    }

    setTimeout(cameraLoop, 10);
}