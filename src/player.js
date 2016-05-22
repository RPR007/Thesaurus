function creerVertexJoueur(objgl) {
    var objVertex = objgl.createBuffer();

    tabVertex = 
    [
         0.75, 0.0, 0.25,
         0.75, 0.0, 0.75,
         0.25, 0.0, 0.75,
         0.25, 0.0, 0.25,
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    objVertex.intNbElems = tabVertex.length/3; objVertex.intTailleElem = 3;
   
   return objVertex;   
}

 function creerCouleursJoueur(objgl) {
        var objCouleursCube = objgl.createBuffer();

        tabCouleurs = []
        for(var i = 0; i< 4;i++)
          tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]);

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = tabCouleurs.length/4; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

    // Relier un texel à un vertex
    function creerTexelsJoueur(objgl) {
        var objTexelsCube = objgl.createBuffer();

        tabTexels = [  // Texels de la face avant
                          0.0, 0.0,  // 1: Coin haut droit
                          0.0, 0.0,  // 2: Coin bas droit
                          0.0, 0.0,  // 3: Coin bas gauche
                          0.0, 0.0,  // 4: Coin haut gauche

        ];

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = tabTexels.length/2; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = 1; objTexelsCube.pcCouleurTexel = 0.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageJoueur(objgl) {
        var objMaillageCube = objgl.createBuffer();
        // Le maillage                        
        tabMaillageCube =
            [ // Les 4 triangles de la face avant
                 3,2,0,
      			 1,2,0
            ];

        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = tabMaillageCube.length;
        // Le nombre de vertex pour les droites
        objMaillageCube.intNbElemsDroites = 0;

        return objMaillageCube;
    }
