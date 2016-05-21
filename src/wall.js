function creerMur(objgl,wall) {
        var objCube = objgl.createBuffer();

        var tabVertex = []
        var node1 = JSON.parse(wall.v)
        var node2 = JSON.parse(wall.w)
        
        if(node1.y == node2.y) {
            // Horizontal
            if(!aerial) {
            tabVertex = [
                // Face Avant
                node1.x,height,node1.y+1, // 0 Haut Droit
                node1.x,-1.0,node1.y+1, // 1 Bas Droit
                node1.x,-1.0,node1.y, // 2 Bas Gauche
                node1.x, height,node1.y, // 3 Haut Gauche
                
                // Face Arriere
                node2.x+1,height,node2.y+1, // 4 Haut Droit
                node2.x+1,-1.0,node2.y+1, // 5 Bas Droit
                node2.x+1,-1.0,node2.y, // 6 Bas Gauche
                node2.x+1, height,node2.y, // 7 Haut Gauche
                
                // Coter Droit
                node2.x+1,height,node2.y+1, // 8 Haut Droit
                node2.x+1,-1.0,node2.y+1, // 9 Bas Droit
                node1.x,-1.0,node1.y+1, // 10 Bas Gauche
                node1.x,height,node1.y+1, // 11 Haut Gauche
                
                // Coter Gauche
                node2.x+1, height,node2.y, // 12 Haut Droit
                node2.x+1,-1.0,node2.y, // 13 Bas Droit
                node1.x,-1.0,node1.y, // 14 Bas Gauche
                node1.x, height,node1.y, // 15 Haut Gauche
            ]
            } else {
                tabVertex = [
                // Haut
                node2.x+1, height,node2.y, // 12 Haut Droit
                node2.x+1,height,node2.y+1, // 13 Bas Droit
                node1.x,height,node1.y+1, // 14 Bas Gauche
                node1.x, height,node1.y, // 15 Haut Gauche
                ]
            }
        } else {
            // Vertical
            if(!aerial) {
            tabVertex = [
                // Face Avant
                node1.x+1,2.0,node1.y, // 0 Haut Droit
                node1.x+1,-1.0,node1.y, // 1 Bas Droit
                node1.x,-1.0,node1.y, // 2 Bas Gauche
                node1.x, 2.0,node1.y, // 3 Haut Gauche
                
                // Face Arriere
                node2.x+1,2.0,node2.y+1, // 4 Haut Droit
                node2.x+1,-1.0,node2.y+1, // 5 Bas Droit
                node2.x,-1.0,node2.y+1, // 6 Bas Gauche
                node2.x, 2.0,node2.y+1, // 7 Haut Gauche
                
                // Coter Droit
                node2.x+1,2.0,node2.y+1, // 8 Haut Droit
                node2.x+1,-1.0,node2.y+1, // 9 Bas Droit
                node1.x+1,-1.0,node1.y, // 10 Bas Gauche
                node1.x+1,2.0,node1.y, // 11 Haut Gauche
                
                // Coter Gauche
                node2.x, 2.0,node2.y+1, // 12 Haut Droit
                node2.x,-1.0,node2.y+1, // 13 Bas Droit
                node1.x,-1.0,node1.y, // 14 Bas Gauche
                node1.x, 2.0,node1.y // 15 Haut Gauche
            ]
            } else {
                 tabVertex = [
                node2.x, 2.0,node2.y+1, // 12 Haut Droit
                node2.x+1,2.0,node2.y+1, // 13 Bas Droit
                node1.x+1,2.0,node1.y, // 14 Bas Gauche
                node1.x, 2.0,node1.y, // 15 Haut Gauche
                ]
            }
        }

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
        objCube.intNbElems = tabVertex.length/3 ; objCube.intTailleElem = 3;

        return objCube;
    }

    function creerCouleursMur(objgl) {
        var objCouleursCube = objgl.createBuffer();

        if(!aerial) {
        tabCouleurs = []
        for(var i = 0; i< 16;i++)
          tabCouleurs = tabCouleurs.concat([0.0, 0.0, 0.0, 1.0]);
        } else {
            for(var i = 0; i< 4;i++)
          tabCouleurs = tabCouleurs.concat([0.0, 0.0, 0.0, 1.0]);
        }
        
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = tabCouleurs.length; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

     // Relier un texel à un vertex
    function creerTexelsMur(objgl) {
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
                 0.0, 0.0,  // 4: Coin haut gauche \
        ] 
        } else {
        tabTexels = [
                 0.0, 0.0,  // 1: Coin haut droit
                 0.0, 0.0,  // 2: Coin bas droit
                 0.0, 0.0,  // 3: Coin bas gauche
                 0.0, 0.0  // 4: Coin haut gauche 
        ] 
        }
        
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = tabTexels.length/2; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = TEX_METAL; objTexelsCube.pcCouleurTexel = 1.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageMur(objgl) {
        var objMaillageCube = objgl.createBuffer();
    
        // Le maillage
        if(!aerial) {
        tabMaillageCube = [
            3,2,0,
			1,2,0,
			7,6,4,
			5,6,4,
			11,8,10,
			9,10,8,
			13,14,12,
			15,14,12
        ]
        } else {
            tabMaillageCube = [
                 3,2,0,
			     1,2,0,
            ]
        }
     
            
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = tabMaillageCube.length;
        // Le nombre de vertex pour les droites
        objMaillageCube.intNbElemsDroites = 0;
        return objMaillageCube;
    }
