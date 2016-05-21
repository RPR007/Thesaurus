
function creerPlancher(objgl) {
    var objPlancher = new Object();
    objPlancher.fltProfondeur = 1024;
    objPlancher.fltLargeur = 1024;
    objPlancher.fltHauteur = 0;

    return objPlancher;
}

function creerVertexPlancher(objgl, fltLargeur, fltProfondeur) {
    //Plancher est un carre qui couvre le niveau, donc juste 4 elements sont necessaires.
	var tabVertex = [
	         fltLargeur, -1.0, 0.0,
	         fltLargeur, -1.0, fltLargeur,
	         0.0, -1.0, fltLargeur,
	         0.0, -1.0, 0.0
        ];
    
    var objVertexPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertexPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertexPlancher.intNbElems = 4; objVertexPlancher.intTailleElem = 3;
    return objVertexPlancher;
}

function creerCouleursPlancher(objgl) {
    tabCouleurs = []; 
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0,1.0,1.0,1.0]);

    var objCouleursPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
    objCouleursPlancher.intNbElems = 4; objCouleursPlancher.intTailleElem = 4;
    return objCouleursPlancher;
}

function creerTexelsPlancher(objgl, fltLargeur, fltProfondeur) {
     var tabTexels = [
             1.0, 0.0,
             1.0, 1.0,
             0.0, 1.0,
             0.0, 0.0
        ];
    
    var objTexelsPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsPlancher.intNbElems = 4; objTexelsPlancher.intTailleElem = 2;
    objTexelsPlancher.intNoTexture = TEX_PLANCHER; objTexelsPlancher.pcCouleurTexel = 0.5;
    
    return objTexelsPlancher;
  }

function creerMaillagePlancher(objgl) {

       var tabMaillage =
            [ 
             1, 2, 0,
             3, 2, 0,
            ];

	    var objMaillagePlancher = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlancher);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        objMaillagePlancher.intNbElemsTriangles = 6;
        objMaillagePlancher.intNbElemsDroites = 0;
		
        return objMaillagePlancher;
    }
  
