
function moveView(e) {
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

function moveForwardBackward(intDirection) {
    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
    var fltXPrime = (intDirection*speedWalk) * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
    var fltZPrime = (intDirection*speedWalk) * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

    
    game(function() {
        setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
        setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    },getPositionCameraX(camera) + fltXPrime, getPositionCameraZ(camera) + fltZPrime)
  
}

function lookRightLeft(intDirection) {
    var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    var fltAngle = (intDirection*speedCamera) * Math.PI / 90; // Tourner 2 degrés
    var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
    var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
    setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
    setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
}

function cameraLoop() {
    var binMovement = false;

    if (!aerial) {
        // Regarder à gauche et à droite
        if ((keyState[37]||clickState[1]) || (keyState[39]||clickState[3])) {
            binMovement = true;
    
            // 37: Flèche à gauche ; 39: Flèche à droite
            lookRightLeft((keyState[37]||clickState[1]) ? -1 : 1);
        }
    
        // Avancer ou reculer
        if ((keyState[38]||keyState[87]) || (keyState[40]||keyState[83])) {
            binMovement = true;
    
            // 38: Flèche en haut ; 40: Flèche en bas
            // 87: W ; 83: S
            moveForwardBackward((keyState[38]||keyState[87]) ? 1 : -1);
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
    
            game(function() {
                setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
                setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
                setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
                setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
            },getPositionCameraX(camera) + fltXPrime, getPositionCameraZ(camera) + fltZPrime)
        }
    
        // Permet de ne pas réafficher si il n'y en a pas besoins
        if (binMovement) {
            effacerCanevas(objgl);
            dessiner(objgl, objProgShaders, objScene3D);
            //console.log('x:'+getPositionCameraX(camera)+',z:'+getPositionCameraZ(camera))
        }
    }

    setTimeout(cameraLoop, 10);
}