var keyState = [];
var clickState = [];

/*
* Pour bouger utilisez soit les flêches (avancer, reculer, regarder à droite et à gauche)
* ou alors
* utilisez WASD pour vous déplacer et la souris pour regarder
*/

function lockStatus() {
	return document.pointerLockElement === objCanvas ||
		   document.mozPointerLockElement === objCanvas ||
		   document.webkitPointerLockElement === objCanvas;
}

function events() {
	var canv = document.getElementById('monCanvas');
	canv.addEventListener('keydown', keyIsPressed, false);
	canv.addEventListener('keyup', keyIsReleased, false);
	canv.addEventListener('mousedown', clickDown, false);
	canv.addEventListener('mouseup', clickUp, false);
	canv.addEventListener('click', lockPointer, false);
	canv.addEventListener('wheel', wheelListener, false);
}

function keyIsPressed(e) {
//	console.log('Key Code (pressed) : ' + e.keyCode);
	keyState[e.keyCode] = true;
}

function keyIsReleased(e) {
//	console.log('Key Code (released) : ' + event.keyCode);
    
    // Faire exploser le mur devant nous
    if (e.keyCode == 66 || e.keyCode == 32) {
    	//console.log('bombe(s) : '+nbombs);
        boom();
    }
    
    // Entrer dans le mode aérien
    if(e.keyCode == 33 || e.keyCode == 80) {
        enterAerialMode();
    }

    // Sortir du mode aérien
    if (e.keyCode == 34) {
    	exitAerialMode();
    }
	keyState[e.keyCode] = false;
}

function clickDown(e) {
	clickState[e.which] = true;
}

function clickUp(e) {
	if (e.which == 2) {
		console.log('bombe(s) : '+nbombs);
        boom();
	}

	clickState[e.which] = false;
}

function lockPointer(e) {
	// Lock la souris seulement quand elle ne l'est pas
	if (!lockStatus()) {
	 	objCanvas.requestPointerLock = objCanvas.requestPointerLock ||
									    objCanvas.mozRequestPointerLock ||
									    objCanvas.webkitRequestPointerLock;
		// Demander au naviguateur de bloquer la souris
		objCanvas.requestPointerLock();
	
		if ('onpointerlockchange' in document) {
		  	document.addEventListener('pointerlockchange', lockChange, false);
		} else if ('onmozpointerlockchange' in document) {
		  	document.addEventListener('mozpointerlockchange', lockChange, false);
		} else if ('onwebkitpointerlockchange' in document) {
			document.addEventListener('webkitpointerlockchange', lockChange, false);
		}
	}
}

function lockChange(e) {
	if(lockStatus()) {
    	console.log('The pointer lock status is now locked');
		objCanvas.addEventListener("mousemove", moveView, false);
  } else {
    	console.log('The pointer lock status is now unlocked');
		objCanvas.removeEventListener("mousemove", moveView, false);
  }
}

function wheelListener(e) {
	if (e.deltaY != 0) {
		moveForwardBackward((e.deltaY<0)?2:-2);

		effacerCanevas(objgl);
	    dessiner(objgl, objProgShaders, objScene3D);
	}
}