function creerVertexFleche(objgl) {
        var objVertex = objgl.createBuffer();

        tabVertex = 
        [
            -0.25, 0.0, 1.0,    //0: Avant arrière droit
             0.25, 0.0, 1.0,    //1: Anavt arrière gauche

            -0.25,-1.0, 0.0,    //2: Milieu bas droit
             0.25,-1.0, 0.0,    //3: Milieu bas gauche

            -0.25, 1.0, 0.0,    //4: Milieu haut droit
             0.25, 1.0, 0.0,    //5: Milieu haut gauche

            -0.25,-0.5, 0.0,    //6: Milieu bas droit/2
             0.25,-0.5, 0.0,    //7: Milieu bas gauche/2

            -0.25, 0.5, 0.0,    //8: Milieu haut droit/2
             0.25, 0.5, 0.0,    //9: Milieu haut gauche/2

            -0.25,-0.5,-2.0,    //10: Arrière bas droit/2
             0.25,-0.5,-2.0,    //11: Arrière bas gauche/2

            -0.25, 0.5,-2.0,    //12: Arrière haut droit/2
             0.25, 0.5,-2.0     //13: Arrière haut gauche/2
        ];

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
        objVertex.intNbElems = tabVertex.length/3; objVertex.intTailleElem = 3;
       
       return objVertex;   
    }
  
    function creerCouleursVertexFleche(objgl) {
        var objCouleurs = objgl.createBuffer();
        tabCouleurs = new Array();

        for (var i = 0; i < objVertex.intNbElems; i++) {
            if (i == 0 || i == 1)
                tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
            else
                tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge
        }
       
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleurs.intNbElems = tabCouleurs.length/4; objCouleurs.intTailleElem = 4;
           
        return objCouleurs;
    }

   function creerMaillageVertexFleche(objgl) {
        var objMaillage = objgl.createBuffer();
       // Le maillage                        
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

        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageVertex), objgl.STATIC_DRAW);

        // Le nombre de vertex dans les triangles
        objMaillage.intNbElemsTriangles = tabMaillageVertex.length;
        // Le nombre de vertex dans les droites
        //objMaillage.intNbElemsDroites = 8;

        return objMaillage;
    }