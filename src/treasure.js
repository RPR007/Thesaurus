function creerVertexTresore(objgl) {
    var objVertex = objgl.createBuffer();

    if(!aerial) {
        tabVertex = 
        [
            // Face avant (Z=1)
            0.25, 0.25, 0.75,   // 0: Coin haut droit
            0.25, -0.25, 0.75,  // 1: Coin bas droit
            0.25, -0.25, 0.25,  // 2: Coin bas gauche
            0.25, 0.25, 0.25,  // 3: Coin haut gauche
    
            // Face arrière (Z=-1) 
            0.75, 0.25, 0.75,   // 4: Coin haut droit
            0.75, -0.25, 0.75,  // 5: Coin bas droit
            0.75, -0.25, 0.25,  // 6: Coin bas gauche
            0.75, 0.25, 0.25,   // 7: Coin haut gauche
            
             // coter droit (Z=-1) 
            0.75, 0.25, 0.75,    // 6: Coin haut droit
            0.75, -0.25, 0.75,  // 7: Coin bas droit
            0.25, -0.25, 0.75,  // 8: Coin bas gauche
            0.25, 0.25, 0.75,   // 9: Coin haut gauche
            
             // coter gauche (Z=-1) 
            0.75, 0.25, 0.25,  // 6: Coin haut droit
            0.75, -0.25, 0.25,  // 7: Coin bas droit
            0.25, -0.25, 0.25,  // 8: Coin bas gauche
            0.25, 0.25, 0.25,   // 9: Coin haut gauche
        ];
    } else {
        tabVertex = 
        [
            0.75, 0.0, 0.25,// 7
            0.75, 0.0, 0.75, //4 
            0.25, 0.0, 0.75, // 0
            0.25, 0.0, 0.25, //3 
        ]
    }

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length/3; objVertex.intTailleElem = 3;
   
   return objVertex;   
}

 function creerCouleursTresore(objgl) {
        var objCouleursCube = objgl.createBuffer();

        if(!aerial) {
            tabCouleurs = []
            for(var i = 0; i< 16;i++)
                tabCouleurs = tabCouleurs.concat([0.0, 0.0, 1.0, 1.0]);
        } else {
            tabCouleurs = []
            for(var i = 0; i< 4;i++)
                tabCouleurs = tabCouleurs.concat([0.0, 0.0, 1.0, 1.0]);
        }

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = tabCouleurs.length/4; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

    // Relier un texel à un vertex
    function creerTexelsTresore(objgl) {
        var objTexelsCube = objgl.createBuffer();

        if(!aerial) {
            tabTexels = [  // Texels de la face avant
                          1.0, 0.0,  // 1: Coin haut droit
                          1.0, 1.0,  // 2: Coin bas droit
                          0.0, 1.0,  // 3: Coin bas gauche
                          0.0, 0.0,  // 4: Coin haut gauche

                          // Texels de la face arrière
                          1.0, 0.0,   // 6: Coin haut droit
                          1.0, 1.0,   // 7: Coin bas droit
                          0.0, 1.0,   // 8: Coin bas gauche
                          0.0, 0.0,    // 9: Coin haut gauche
                          
                         1.0, 0.0,  // 1: Coin haut droit
                         1.0, 1.0,  // 2: Coin bas droit
                         0.0, 1.0,  // 3: Coin bas gauche
                         0.0, 0.0,  // 4: Coin haut gauche
        
        				 1.0, 0.0,  // 1: Coin haut droit
                         1.0, 1.0,  // 2: Coin bas droit
                         0.0, 1.0,  // 3: Coin bas gauche
                         0.0, 0.0  // 4: Coin haut gauche
            ];
        } else {
             tabTexels = [  // Texels de la face avant
                          1.0, 0.0,  // 1: Coin haut droit
                          1.0, 1.0,  // 2: Coin bas droit
                          0.0, 1.0,  // 3: Coin bas gauche
                          0.0, 0.0,  // 4: Coin haut gauche
            ];
        }

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = tabTexels.length/2; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = 1; objTexelsCube.pcCouleurTexel = 0.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageTresore(objgl) {
        var objMaillageCube = objgl.createBuffer();
        // Le maillage
        
        if(!aerial) {
            tabMaillageCube =
                [ // Les 4 triangles de la face avant
                     3,2,0,
          			 1,2,0,
          			 7,6,4,
          			 5,6,4,
          			 11,8,10,
          			 9,10,8,
          			 13,14,12,
          			 15,14,12
                ];
        } else {
             tabMaillageCube =
                [ // Les 4 triangles de la face avant
                     3,2,0,
          			 1,2,0
                ];
        }

        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = tabMaillageCube.length;
        // Le nombre de vertex pour les droites
        objMaillageCube.intNbElemsDroites = 0;

        return objMaillageCube;
    }
