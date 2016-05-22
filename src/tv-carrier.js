function creerVertexTeleTransporteur(objgl, fltLargeur, fltProfondeur) {
	var tabVertex = [
	         -0.25, -1, -0.25,
	         0.25, -1, -0.25,
	         0.25, -1, 0.25,
	         -0.25, -1, 0.25,
			 
			 -0.25, 0.25, 0.25,
	         -0.25, 0.25, -0.25,
	         0.25, 0.25, -0.25,
	         0.25, 0.25, 0.25
        ];
    
    var objVertexTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertexTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertexTeleTransporteur.intNbElems = tabVertex.length/3; objVertexTeleTransporteur.intTailleElem = 3;
    return objVertexTeleTransporteur;
}

function creerCouleursTeleTransporteur(objgl) {
    tabCouleurs = []; 
    for (var i = 0; i < 8; i++)
        tabCouleurs = tabCouleurs.concat([1.0,0.0,0.0,0.0]);

    var objCouleursTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
    objCouleursTeleTransporteur.intNbElems = 8; objCouleursTeleTransporteur.intTailleElem = 4;
    return objCouleursTeleTransporteur;
}

function creerTexelsTeleTransporteur(objgl, fltLargeur, fltProfondeur) {
     var tabTexels = [
                 1.0, 0.0,  // 1: Coin haut droit
                 1.0, 1.0,  // 2: Coin bas droit
                 0.0, 1.0,  // 3: Coin bas gauche
                 0.0, 0.0,  // 4: Coin haut gauche

				 1.0, 0.0,  // 1: Coin haut droit
                 1.0, 1.0,  // 2: Coin bas droit
                 0.0, 1.0,  // 3: Coin bas gauche
                 0.0, 0.0  // 4: Coin haut gauche 
        ];
    
    var objTexelsTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsTeleTransporteur.intNbElems = tabTexels.length/2; objTexelsTeleTransporteur.intTailleElem = 2;
    objTexelsTeleTransporteur.intNoTexture = TEX_PLANCHER; objTexelsTeleTransporteur.pcCouleurTexel = 0;
    
    return objTexelsTeleTransporteur;
  }

function creerMaillageTeleTransporteur(objgl) {
		var objMaillageCube = objgl.createBuffer();
		
       var tabMaillage = [
            3,2,0,
			1,2,0,
			7,6,4,
			5,6,4
        ];

	    var objMaillageTeleTransporteur = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleTransporteur);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        objMaillageTeleTransporteur.intNbElemsTriangles = tabMaillage.length;
        objMaillageTeleTransporteur.intNbElemsDroites = 0;
		
        return objMaillageTeleTransporteur;
    }