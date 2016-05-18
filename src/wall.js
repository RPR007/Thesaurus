function creerMur(objgl) {
        var objCube = objgl.createBuffer();

        var tabVertex = new Array()
        
        walls.forEach(function(element, index, array) {
            var node1 = JSON.parse(element.v)
            var node2 = JSON.parse(element.w)
            // Horizontale
            if(node1.y == node2.y) {
                
                for(var i = -1; i < 2; i+=2) {
                    tabVertex.push(node1.x)
                    tabVertex.push(i)
                    tabVertex.push(node1.y)
            
                    tabVertex.push(node1.x)
                    tabVertex.push(i)
                    tabVertex.push(node1.y+1)
            
                    tabVertex.push(node2.x)
                    tabVertex.push(i)
                    tabVertex.push(node2.y)
            
                    tabVertex.push(node2.x)
                    tabVertex.push(i)
                    tabVertex.push(node2.y+1)
                }  
                // Vertical
            } else {
                for(var i = -1; i < 2; i+=2) {
                    tabVertex.push(node1.x)
                    tabVertex.push(i)
                    tabVertex.push(node1.y)
            
                    tabVertex.push(node1.x+1)
                    tabVertex.push(i)
                    tabVertex.push(node1.y)
            
                    tabVertex.push(node2.x)
                    tabVertex.push(i)
                    tabVertex.push(node2.y)
            
                    tabVertex.push(node2.x+1)
                    tabVertex.push(i)
                    tabVertex.push(node2.y)
                }
            }
            
        })
   
        console.log(tabVertex.length/3)

        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
        objCube.intNbElems = 736 ; objCube.intTailleElem = 3;

        return objCube;
    }

    function creerCouleursMur(objgl) {
        var objCouleursCube = objgl.createBuffer();

        tabCouleurs = []
        for(var i = 0; i< 736;i++)
            tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]);
        
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

        objCouleursCube.intNbElems = 736; objCouleursCube.intTailleElem = 4;

        return objCouleursCube;
    }

     // Relier un texel à un vertex
    function creerTexelsMur(objgl) {
        var objTexelsCube = objgl.createBuffer();

        tabTexels = []
        for(var i = 0; i< 746;i++)
            tabTexels = tabCouleurs.concat([0.0, 0.0]);
            
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

        // 10 texels
        objTexelsCube.intNbElems = 736; objTexelsCube.intTailleElem = 2;
        // 100% de la texture est utilisée
        objTexelsCube.intNoTexture = TEX_METAL; objTexelsCube.pcCouleurTexel = 1.00;

        return objTexelsCube;
    }

    // Le maillage 
    function creerMaillageMur(objgl) {
        var objMaillageCube = objgl.createBuffer();
        
        // Le maillage                        
        tabMaillageCube = []
        for(var i = 0; i< 92;i++) {
            // Triangle
            tabMaillageCube = tabMaillageCube.concat([i*8,i*8+1,i*8+4,
                                                      i*8+4,i*8+5,i*8+1,
                                                      
                                                      i*8+2,i*8+3,i*8+6,
                                                      i*8+6,i*8+7,i*8+3,
                                                      
                                                      i*8,i*8+2,i*8+6,
                                                      i*8+6,i*8+4,i*8,
                                                      
                                                      i*8+1,i*8+3,i*8+7,
                                                      i*8+5,i*8+7,i*8+1]);
        }
        
      /*  for(var i = 0; i< 92;i++) {
            // Droite
            tabMaillageCube = tabMaillageCube.concat([i*8,i*8+1,
                                                      i*8+2,i*8+3,
                                                      i*8, i*8+2,
                                                      i*8+1, i*8+3]);
            tabMaillageCube = tabMaillageCube.concat([i*8,i*8+4,
                                                      i*8+1,i*8+5,
                                                      i*8+2, i*8+6,
                                                      i*8+3, i*8+7]);
            tabMaillageCube = tabMaillageCube.concat([i*8+4,i*8+5,
                                                      i*8+6,i*8+7,
                                                      i*8+4, i*8+6,
                                                      i*8+5, i*8+7]);
        } */
            
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

        // Le nombre de vertex pour les triangles
        objMaillageCube.intNbElemsTriangles = 2208;
        // Le nombre de vertex pour les droites
       // objMaillageCube.intNbElemsDroites = 1104;
       //objMaillageCube.intNbElemsDroites = 1472;
        objMaillageCube.intNbElemsDroites = 0;
        return objMaillageCube;
    }
