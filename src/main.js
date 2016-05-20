var objgl = null;
var objProgShaders = null;
var objScene3D = null;
var objCanvas = null;

var speedWalk = 0.3;   // Change la vitesse des mouvements
var speedCamera = 1.0;  // Change la vitesse de la vue (regarder à droite ou à gauche)
var speedCameraMouse = 0.1;

var level = null
var walls = null

function demarrer() {
    objCanvas = document.getElementById('monCanvas');
    objCanvas.focus();
    objgl = initWebGL(objCanvas);  // Initialise le contexte WebGL
    
    console.log(levels[0].length)
    level = parseLevel(levels[0]);
    walls = level.wall.edges();
    
    objProgShaders = initShaders(objgl);
    objScene3D = initScene3D(objgl); // Créer la scène

    // Attendre que les textures se charges
    setTimeout(function() {
         effacerCanevas(objgl); 
         dessiner(objgl, objProgShaders, objScene3D);
    }, 200);
   
    // Dessiner avant la loop
    dessiner(objgl, objProgShaders, objScene3D);

    // Pour des raisons d'optimisation, la loop ne dessine quand le joueur bouge
    cameraLoop();
}

function initScene3D(objgl) {
   var objScene3D = new Object();
    var tabObjets3D = new Array();
    
    // Mettre les textures dans la scène
    objScene3D.textures = creerTextures(objgl);
		 
     // Créer Murs
    for(var i = 0; i < walls.length; i++) {
        var objet3D = new Object();
        objet3D.vertex = creerMur(objgl,walls[i]); 
        objet3D.couleurs = creerCouleursMur(objgl);
        objet3D.maillage = creerMaillageMur(objgl);
        objet3D.texels = creerTexelsMur(objgl);
        objet3D.transformations = creerTransformations();
        tabObjets3D.push(objet3D);
    }
    
    // Créer plancher
    var objet3D = new Object();
    objet3D.vertex = creerVertexPlancher(objgl,levels[0].length,levels[0][0]); 
    objet3D.couleurs = creerCouleursPlancher(objgl);
    objet3D.maillage = creerMaillagePlancher(objgl);
    objet3D.texels = creerTexelsPlancher(objgl,levels[0].length,levels[0][0]);
    objet3D.transformations = creerTransformations();
    tabObjets3D.push(objet3D);
    
    // Créer plafond
    var objet3D = new Object();
    objet3D.vertex = creerVertexPlafond(objgl,levels[0].length,levels[0][0]); 
    objet3D.couleurs = creerCouleursPlafond(objgl);
    objet3D.maillage = creerMaillagePlafond(objgl);
    objet3D.texels = creerTexelsPlafond(objgl,levels[0].length,levels[0][0]);
    objet3D.transformations = creerTransformations();
    tabObjets3D.push(objet3D);
        
     // Mettre les objets 3D sur la scène
    objScene3D.tabObjets3D = tabObjets3D;
    
    // La caméra
    var camera = creerCamera();
    setPositionsCameraXYZ([12.5, 0, 15], camera);
    setCiblesCameraXYZ([12.5, 0, -20], camera);
    setOrientationsXYZ([0, 1, 0], camera);

    // Mettre la caméra sur la scène
    objScene3D.camera = camera;
	
	//Le plancher
	var plancher = creerPlancher(objgl);
	plancher.vertex = creerVertexPlancher(objgl, plancher.fltLargeur, plancher.fltProfondeur);
    plancher.couleurs = creerCouleursPlancher(objgl, [1, 1, 1, 1]);
	plancher.texels = creerTexelsPlancher(objgl, plancher.fltLargeur, plancher.fltProfondeur);
	plancher.maillage = creerMaillagePlancher(objgl);
	
	// Mettre le plancher sur la scène
	objScene3D.plancher = plancher;
			
    return objScene3D;
}

function dessiner(objgl, objProgShaders, objScene3D) {
    // La vue
    objgl.viewport(0, 0, objgl.drawingBufferWidth, objgl.drawingBufferHeight);
        
    // Matrice de projection
    var matProjection = mat4.create();
    var fltRapportCanevas = objgl.drawingBufferWidth / objgl.drawingBufferHeight;
    mat4.perspective(80, fltRapportCanevas, 0.01, 100, matProjection);
 
	// Relier la matrice aux shaders
    objgl.uniformMatrix4fv(objProgShaders.matProjection, false, matProjection);

    for (var i = 0; i < objScene3D.tabObjets3D.length; i++) {
        var vertex = objScene3D.tabObjets3D[i].vertex;
        var couleurs = objScene3D.tabObjets3D[i].couleurs;
        var texels = objScene3D.tabObjets3D[i].texels;
		var maillage = objScene3D.tabObjets3D[i].maillage;
        var transformations = objScene3D.tabObjets3D[i].transformations;
	           
        // Matrice du modèle            
        var matModeleVue = mat4.create();
        mat4.identity(matModeleVue);
    
		// Placer la caméra sur la scène
        mat4.lookAt(getPositionsCameraXYZ(objScene3D.camera),
                    getCiblesCameraXYZ(objScene3D.camera),
                    getOrientationsXYZ(objScene3D.camera), 
                    matModeleVue);
              
        // Appliquer les transformations sur le modèle 
        mat4.translate(matModeleVue, getPositionsXYZ(transformations));
        mat4.scale(matModeleVue, getEchellesXYZ(transformations));
        mat4.rotateX(matModeleVue, getAngleX(transformations) * Math.PI / 180);
        mat4.rotateY(matModeleVue, getAngleY(transformations) * Math.PI / 180);
        mat4.rotateZ(matModeleVue, getAngleZ(transformations) * Math.PI / 180);

        // Relier la matrice aux shaders
        objgl.uniformMatrix4fv(objProgShaders.matModeleVue, false, matModeleVue);

		if (maillage == null)
		// Dessiner les sous-objets
		
        for (var j = 0; j < vertex.length; j++) {
            // Relier les vertex aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex[j]);
            objgl.vertexAttribPointer(objProgShaders.posVertex, vertex[j].intTailleElem, objgl.FLOAT, false, 0, 0);

            // Relier les couleurs aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs[j]);
            objgl.vertexAttribPointer(objProgShaders.couleurVertex, couleurs[j].intTailleElem, objgl.FLOAT, false, 0, 0);

            // Activer la texture
            objgl.activeTexture(objgl.TEXTURE0 + texels[j].intNoTexture);
            objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels[j].intNoTexture]);
 
            // Relier les texels aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, texels[j]);
            objgl.vertexAttribPointer(objProgShaders.posTexel, texels[j].intTailleElem, objgl.FLOAT, false, 0, 0);
              
            // Relier le no de texture et le taux de couleur aux shaders                 
            objgl.uniform1i(objProgShaders.noTexture, texels[j].intNoTexture);
            objgl.uniform1f(objProgShaders.pcCouleurTexel, texels[j].pcCouleurTexel);
                                   
            // Dessiner
            objgl.drawArrays(vertex[j].typeDessin, 0, vertex[j].intNbElems);
        } else { // Dessiner le maillage
            // Relier les vertex aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER,vertex);
            objgl.vertexAttribPointer(objProgShaders.posVertex, vertex.intTailleElem, objgl.FLOAT, false, 0, 0);

            // Relier les couleurs aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs);
            objgl.vertexAttribPointer(objProgShaders.couleurVertex, couleurs.intTailleElem, objgl.FLOAT, false, 0, 0)
			     
			// Activer la texture
            objgl.activeTexture(objgl.TEXTURE0 + texels.intNoTexture);
            objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels.intNoTexture]);
                  
            // Relier les texels aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, texels);
            objgl.vertexAttribPointer(objProgShaders.posTexel, texels.intTailleElem, objgl.FLOAT, false, 0, 0);
               
            // Relier le no de texture et le taux de couleur aux shaders                 
            objgl.uniform1i(objProgShaders.noTexture, texels.intNoTexture);
            objgl.uniform1f(objProgShaders.pcCouleurTexel, texels.pcCouleurTexel);
               
            // Sélectionner le maillage qu'on va utiliser pour les triangles et les droites
            objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, maillage);
                
            // Dessiner les triangles
            objgl.drawElements(objgl.TRIANGLES, maillage.intNbElemsTriangles, objgl.UNSIGNED_SHORT, 0);
            // Dessiner les droites à la suite des triangles
            objgl.drawElements(objgl.LINES, maillage.intNbElemsDroites, objgl.UNSIGNED_SHORT, maillage.intNbElemsTriangles * 2);
        }
    }
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT|objgl.DEPTH_BUFFER_BIT);
}