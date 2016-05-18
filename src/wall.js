function creerMur(objgl) {
        var objCube = objgl.createBuffer();

        var tabVertex = new Array()
        
        walls.forEach(function(element, index, array) {
            var node1 = JSON.parse(element.v)
            var node2 = JSON.parse(element.w)
            
            tabVertex.push(node1.x)
            tabVertex.push(-1)
            tabVertex.push(node1.y)
            
            tabVertex.push(node2.x)
            tabVertex.push(-1)
            tabVertex.push(node2.y)
            
        })
   
        console.log(tabVertex.length/3)

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
        objCube.intNbElems = 184 ; objCube.intTailleElem = 3;

        return objCube;
    }

    function creerCouleursMur(objgl) {
        var objCouleursCube = objgl.createBuffer();

        tabCouleurs = []
        for(var i = 0; i< 184;i++)
            tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]);
        
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = 184; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

     // Relier un texel à un vertex
    function creerTexelsMur(objgl) {
        var objTexelsCube = objgl.createBuffer();

        tabTexels = []
        for(var i = 0; i< 184;i++)
            tabTexels = tabCouleurs.concat([0.0, 0.0]);
            
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = 184; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = TEX_METAL; objTexelsCube.pcCouleurTexel = 1.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageMur(objgl) {
        var objMaillageCube = objgl.createBuffer();
        
        // Le maillage                        
        tabMaillageCube = []
        for(var i = 0; i< 184;i++)
            tabMaillageCube = tabMaillageCube.concat([i]);
            
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = 0;
        // Le nombre de vertex pour les droites
        objMaillageCube.intNbElemsDroites = 184;

        return objMaillageCube;
    }
