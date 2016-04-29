function creerMur(objgl) {
        var objCube = objgl.createBuffer();

        tabVertex = [
             // Face avant (Z=1)
			  0.0, 0.0, 1.0,   // 0: Centre
              1.0, 1.0, 1.0,   // 1: Coin haut droit
              1.0, -1.0, 1.0,  // 2: Coin bas droit
             -1.0, -1.0, 1.0,  // 3: Coin bas gauche
              -1.0, 1.0, 1.0,  // 4: Coin haut gauche

              // Face arrière (Z=-1) 
              0.0, 0.0, -1.0,   // 5: Centre
              1.0, 1.0, -1.0,   // 6: Coin haut droit
              1.0, -1.0, -1.0,  // 7: Coin bas droit
             -1.0, -1.0, -1.0,  // 8: Coin bas gauche
              -1.0, 1.0, -1.0  // 9: Coin haut gauche
        ];

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
        objCube.intNbElems = 10; objCube.intTailleElem = 3;

        return objCube;
    }

    function creerCouleursMur(objgl) {
        var objCouleursCube = objgl.createBuffer();

        // Face avant
        tabCouleurs = [1.0, 1.0, 1.0, 1.0]; // Blanc 
        for (var i = 1; i <= 4; i++)
            tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge

        // Face arrière
        tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc 
        for (var i = 1; i <= 4; i++)
            tabCouleurs = tabCouleurs.concat([0.0, 1.0, 0.0, 1.0]); // Vert

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = 10; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

     // Relier un texel à un vertex
    function creerTexelsMur(objgl) {
        var objTexelsCube = objgl.createBuffer();

        tabTexels = [  // Texels de la face avant
                          0.5, 0.5,  // 0: Centre
                          1.0, 0.0,  // 1: Coin haut droit
                          1.0, 1.0,  // 2: Coin bas droit
                          0.0, 1.0,  // 3: Coin bas gauche
                          0.0, 0.0,  // 4: Coin haut gauche

                          // Texels de la face arrière
                          0.5, 0.5,   // 5: Centre
                          0.0, 0.0,   // 6: Coin haut droit
                          0.0, 1.0,   // 7: Coin bas droit
                          1.0, 1.0,   // 8: Coin bas gauche
                          1.0, 0.0    // 9: Coin haut gauche
        ];

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = 10; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = TEX_METAL; objTexelsCube.pcCouleurTexel = 1.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageMur(objgl) {
        var objMaillageCube = objgl.createBuffer();
        // Le maillage                        
        tabMaillageCube =
            [ // Les 4 triangles de la face avant
             0, 1, 2,
             0, 2, 3,
             0, 3, 4,
             0, 4, 1,
             // Les 4 triangles de la face arrière
             5, 6, 7,
             5, 7, 8,
             5, 8, 9,
             5, 9, 6,
             // Les 4 droites 
             1, 6,
             2, 7,
             3, 8,
             4, 9
            ];

        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = 24;
        // Le nombre de vertex pour les droites
        objMaillageCube.intNbElemsDroites = 8;

        return objMaillageCube;
    }
