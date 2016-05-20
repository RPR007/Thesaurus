var keyState = [];
var havePointerLock = null;

/*
* Pour bouger utilisez soit les flêches (avancer, reculer, regarder à droite et à gauche)
* ou alors
* utilisez WASD pour vous déplacer et la souris pour regarder
*/

function keyIsPressed(e) {
//	console.log('Key Code (pressed) : ' + e.keyCode);
	keyState[e.keyCode] = true;
}

function keyIsReleased(e) {
//	console.log('Key Code (released) : ' + event.keyCode);
    var camera = objScene3D.camera;
    
    if (keyState[66]) { 
        if(nbombs > 0) {
            nbombs--
            
            var ux = getCibleCameraX(camera) - getPositionCameraX(camera)
            var uz =  getCibleCameraZ(camera) - getPositionCameraZ(camera)
            var px = getPositionCameraX(camera)
            var pz = getPositionCameraZ(camera)
            var wall = null
            var x = px, y = pz
        
            for(k = 0; (wall = collisionWallPrime(x,y)).collision != object.Wall; k+=0.01) {
                x = px + (k*ux)
                y = pz + (k*uz)
            }
          
            if(x != px && y != pz
                && Math.sqrt(Math.pow((x-px),2) + Math.pow((y-pz),2)) < 1.5)  {
                // on detruit le mur
                console.log(walls[wall.nwall])
                bomb(walls[wall.nwall], x,y)
                objScene3D.tabObjets3D = objet()
                binMovement = true
            }
        }
        
    }
    
	keyState[e.keyCode] = false;
}

function lockPointer(e) {
	havePointerLock = 'pointerLockElement' in document ||
    				  	'mozPointerLockElement' in document ||
    					'webkitPointerLockElement' in document;

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

function lockChange(e) {
	if(document.pointerLockElement === objCanvas ||
	   document.mozPointerLockElement === objCanvas ||
	   document.webkitPointerLockElement === objCanvas) {

    	console.log('The pointer lock status is now locked');
		objCanvas.addEventListener("mousemove", test, false);
  } else {
    	console.log('The pointer lock status is now unlocked');
		objCanvas.removeEventListener("mousemove", test, false);
  }
}

function test(e) {
	var camera = objScene3D.camera;

	// Regarder à gauche et à droite
    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    var intDirection = e.movementX;
    var fltAngle = (intDirection*speedCameraMouse) * Math.PI / 90; // Tourner 2 degrés
    var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
    var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
    setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
    setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);

    effacerCanevas(objgl);
	dessiner(objgl, objProgShaders, objScene3D);
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

        if(collision(getPositionCameraX(camera) + fltXPrime,  getPositionCameraZ(camera) + fltZPrime) != object.Wall) {
	        setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
	        setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
	        setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
	        setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
        }
	   
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

        if(collision(getPositionCameraX(camera) + fltXPrime,  getPositionCameraZ(camera) + fltZPrime) != object.Wall) {
	        setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
	        setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
	        setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
	        setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
        }
    }

    // Permet de ne pas réafficher si il n'y en a pas besoins
    if (binMovement) {
		effacerCanevas(objgl);
	    dessiner(objgl, objProgShaders, objScene3D);
	    //console.log('x:'+getPositionCameraX(camera)+',z:'+getPositionCameraZ(camera))
    }

    setTimeout(cameraLoop, 10);
}