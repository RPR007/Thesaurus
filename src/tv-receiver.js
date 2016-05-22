function creerVertexTeleRecepteur(objgl, fltLargeur, fltProfondeur) {
    
    if(!aerial) {
        var tabVertex = [0.5,-0.9,0.5] // Le centre du cercle;
           for (var i = 0; i <= 360; i++) {
             tabVertex = tabVertex.concat([0.5+Math.cos(i*Math.PI/180)*0.5,-0.9,0.5+Math.sin(i*Math.PI/180)*0.5]);
         }
    
         tabVertex = tabVertex.concat([0.5,height-1,0.5]) // Le centre du cercle;
           for (var i = 0; i <= 360; i++) {
             tabVertex = tabVertex.concat([0.5+Math.cos(i*Math.PI/180)*0.5,height-1.5,0.5+Math.sin(i*Math.PI/180)*0.5]);
         }
    } else {
       var tabVertex = [0.5,0,0.5] // Le centre du cercle;
       for (var i = 0; i <= 360; i++) {
         tabVertex = tabVertex.concat([0.5+Math.cos(i*Math.PI/180)*0.5,-0.9,0.5+Math.sin(i*Math.PI/180)*0.5]);
       }
    }
    
    var objVertexTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertexTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertexTeleTransporteur.intNbElems = tabVertex.length/3; objVertexTeleTransporteur.intTailleElem = 3;
    return objVertexTeleTransporteur;
}

function creerCouleursTeleRecepteur(objgl) {
    tabCouleurs = []; 
    for (var i = 0; i <= 361; i++)
        tabCouleurs = tabCouleurs.concat([0.0,0.0,1.0,0.0]);
    
    if(!aerial) {  
        for (var i = 0; i <= 361; i++)
            tabCouleurs = tabCouleurs.concat([0.0,0.0,1.0,0.0]);
    }

    var objCouleursTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
    objCouleursTeleTransporteur.intNbElems = tabCouleurs.length; objCouleursTeleTransporteur.intTailleElem = 4;
    return objCouleursTeleTransporteur;
}

function creerTexelsTeleRecpteur(objgl, fltLargeur, fltProfondeur) {
     var tabTexels = [] // Le centre du cercle;
       for (var i = 0; i <= 361; i++) {
         tabTexels = tabTexels.concat([0.0,0.0]);
     }
     
       for (var i = 0; i <= 361; i++) {
         tabTexels = tabTexels.concat([0.0,0.0]);
     }
    
    var objTexelsTeleTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsTeleTransporteur.intNbElems = tabTexels.length/2; objTexelsTeleTransporteur.intTailleElem = 2;
    objTexelsTeleTransporteur.intNoTexture = TEX_PLANCHER; objTexelsTeleTransporteur.pcCouleurTexel = 0;
    
    return objTexelsTeleTransporteur;
  }

function creerMaillageTeleRecepteur(objgl) {
		var objMaillageCube = objgl.createBuffer();
		
		var tabMaillage = []
		for(var i = 1; i <= 360; i++)  {
		    tabMaillage = tabMaillage.concat([0,i,i+1]);
		}
		if(!aerial) {  
    		for(var i = 362; i <= 360*2+2; i++)  {
    		    tabMaillage = tabMaillage.concat([362,i,i+1]);
    		}
		}
		
	    var objMaillageTeleTransporteur = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleTransporteur);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        objMaillageTeleTransporteur.intNbElemsTriangles = tabMaillage.length;
        objMaillageTeleTransporteur.intNbElemsDroites = 0;
		
        return objMaillageTeleTransporteur;
    }