function enterAerialMode() {
	if (!aerial) {
		aerial = true
        
        cibleCameraX = getCibleCameraX(camera)
        cibleCameraZ = getCibleCameraZ(camera)
        positionCamera = getPositionsXYZ(camera)
    
        setPositionsCameraXYZ([13, 22, 15], camera);
        setCiblesCameraXYZ([13, 0, 15], camera);
        setOrientationsXYZ([0, 0, -1], camera);

        drawMap();
	}
}

function exitAerialMode() {
	if (aerial) {
		aerial = false
	
	    setPositionsCameraXYZ(positionCamera, camera);
	    setCibleCameraX(cibleCameraX, camera);
	    setCibleCameraZ(cibleCameraZ, camera);
	    setOrientationsXYZ([0, 1, 0], camera);

	    drawMap();
	}
}

function drawMap() {
	objScene3D.tabObjets3D = objet();
    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}