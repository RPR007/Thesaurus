function creerVertexFleche(objgl) {
    var objVertex = objgl.createBuffer();

    var x = 0.0;   // Largeur
    var y = 1.0;    //  Hauteur sur la map

    if(!aerial) {
        tabVertex = 
        [
             0.4+x, 0.0+y, 0.85,    //0: Avant arrière droit
             0.6+x, 0.0+y, 0.85,    //1: Avant arrière gauche
    
             0.4+x,-0.2+y, 0.6,    //2: Milieu bas droit
             0.6+x,-0.2+y, 0.6,    //3: Milieu bas gauche
    
             0.4+x, 0.2+y, 0.6,    //4: Milieu haut droit
             0.6+x, 0.2+y, 0.6,    //5: Milieu haut gauche
    
             0.4+x,-0.1+y, 0.6,    //6: Milieu bas droit/2
             0.6+x,-0.1+y, 0.6,    //7: Milieu bas gauche/2
    
             0.4+x, 0.1+y, 0.6,    //8: Milieu haut droit/2
             0.6+x, 0.1+y, 0.6,    //9: Milieu haut gauche/2
    
             0.4+x,-0.1+y, 0.2,    //10: Arrière bas droit/2
             0.6+x,-0.1+y, 0.2,    //11: Arrière bas gauche/2
    
             0.4+x, 0.1+y, 0.2,    //12: Arrière haut droit/2
             0.6+x, 0.1+y, 0.2     //13: Arrière haut gauche/2
        ];
    } else {
       tabVertex = 
        [
            0.25, 0.0, 0.25,
            0.75, 0.0, 0.25,
            
            0.25, 0.0, 0.45,
            0.75, 0.0, 0.45,
            
            0.15, 0.0, 0.45,
            0.90, 0.0, 0.45,
            
            0.50, 0.0, 0.75
        ]; 
    }

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length/3; objVertex.intTailleElem = 3;
   
   return objVertex;   
}

function creerCouleursVertexFleche(objgl) {
    var objCouleurs = objgl.createBuffer();
    tabCouleurs = new Array();
    
    if(!aerial) {
        for (var i = 0; i < 14; i++) {
            if (i == 0 || i == 1)
                tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
            else
                tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge
        }
    } else {
        for (var i = 0; i < 7; i++) {
                tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge
          
        }
    }
   
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objCouleurs.intNbElems = tabCouleurs.length/4; objCouleurs.intTailleElem = 4;
       
    return objCouleurs;
}

function creerTexelsFleche(objgl) {
        var objTexelsCube = objgl.createBuffer();

        if(!aerial) {
            tabTexels = [
                     1.0, 0.0,  // 1: Coin haut droit
                     1.0, 1.0,  // 2: Coin bas droit
                     0.0, 1.0,  // 3: Coin bas gauche
                     0.0, 0.0,  // 4: Coin haut gauche
    
    				 1.0, 0.0,  // 1: Coin haut droit
                     1.0, 1.0,  // 2: Coin bas droit
                     0.0, 1.0,  // 3: Coin bas gauche
                     0.0, 0.0,  // 4: Coin haut gauche 
                     
                     1.0, 0.0,  // 1: Coin haut droit
                     1.0, 1.0,  // 2: Coin bas droit
                     0.0, 1.0,  // 3: Coin bas gauche
                     0.0, 0.0,  // 4: Coin haut gauche
    
    				 1.0, 0.0,  // 1: Coin haut droit
                     1.0, 1.0,  // 2: Coin bas droit
                     0.0, 1.0,  // 3: Coin bas gauche
                     0.0, 0.0  // 4: Coin haut gauche 
            ]
        } else {
            tabTexels = [
                     0.0, 0.0,  // 1: Coin haut droit
                     0.0, 0.0,  // 2: Coin bas droit
                     0.0, 0.0,  // 3: Coin bas gauche
                     0.0, 0.0,  // 4: Coin haut gauche
    				 0.0, 0.0,  // 1: Coin haut droit
                     0.0, 0.0,  // 4: Coin haut gauche
    				 0.0, 0.0,  // 1: Coin haut droit
            ]
        }
   
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = 14; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = TEX_METAL; objTexelsCube.pcCouleurTexel = 0.1;

        return objTexelsCube;
    }
    
function creerMaillageVertexFleche(objgl) {
    var objMaillage = objgl.createBuffer();
   // Le maillage
    if(!aerial) {
        tabMaillageVertex =
        [ 
            // Pointe
            0, 2, 4,
            1, 3, 5,
            0, 5, 4,
            0, 5, 1,
            0, 2, 3,
            0, 1, 3,
    
            2, 3, 6,
            3, 7, 6,
            4, 5, 8,
            5, 9, 8,
    
            6, 10, 11,
            6, 7, 11,
            8, 12, 13,
            8, 9, 13,
    
            6, 10, 12,
            6, 8, 12,
            7, 11, 13,
            7, 9, 13,
    
            10, 11, 12,
            11, 13, 12
        ];
    } else {
        tabMaillageVertex =
        [ 
            // Pointe
            0, 2, 1,
            3, 2, 1,
            6, 4, 5,
        ];
    }

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);

    // Le nombre de vertex dans les triangles
    objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
    // Le nombre de vertex dans les droites
    //objMaillage.intNbElemsDroites = 8;

    return objMaillage;
}
