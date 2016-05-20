
function creerPlafond(objgl) {
    var objPlafond = new Object();
    objPlafond.fltProfondeur = 1024;
    objPlafond.fltLargeur = 1024;
    objPlafond.fltHauteur = 0;

    return objPlafond;
}

function creerVertexPlafond(objgl, fltLargeur, fltProfondeur) {
    //Plafond est un carr� qui couvre le niveau, donc juste 4 �l�ments sont n�c�ssaires.
	var tabVertex = [
	         fltLargeur, height, 0.0,
	         fltLargeur, height, fltLargeur,
	         0.0, height, fltLargeur,
	         0.0, height, 0.0
        ];
    
    var objVertexPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertexPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertexPlafond.intNbElems = 4; objVertexPlafond.intTailleElem = 3;
    return objVertexPlafond;
}

function creerCouleursPlafond(objgl) {
    tabCouleurs = []; 
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0,1.0,1.0,1.0]);

    var objCouleursPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
    objCouleursPlafond.intNbElems = 4; objCouleursPlafond.intTailleElem = 4;
    return objCouleursPlafond;
}

function creerTexelsPlafond(objgl, fltLargeur, fltProfondeur) {
     var tabTexels = [
             1.0, 0.0,  // 1: Coin haut droit
             1.0, 1.0,  // 2: Coin bas droit
             0.0, 1.0,  // 3: Coin bas gauche
             0.0, 0.0,  // 4: Coin haut gauche
        ];
    
    var objTexelsPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsPlafond.intNbElems = 4; objTexelsPlafond.intTailleElem = 2;
    objTexelsPlafond.intNoTexture = TEX_PLAFOND; objTexelsPlafond.pcCouleurTexel = 1.0;
    
    return objTexelsPlafond;
  }

function creerMaillagePlafond(objgl) {

       var tabMaillage =
            [ 
             1, 2, 0,
             3, 2, 0,
            ];

	    var objMaillagePlafond = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlafond);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        objMaillagePlafond.intNbElemsTriangles = 6;
        objMaillagePlafond.intNbElemsDroites = 0;
		
        return objMaillagePlafond;
    }
  
  