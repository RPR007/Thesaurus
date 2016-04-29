var objgl = null;
var objProgShaders = null;
var objScene3D = null;
  
function demarrer() {
    var objCanvas = document.getElementById('monCanvas');
    objgl = initWebGL(objCanvas);  // Initialise le contexte WebGL
    //   objProgShaders = initShaders(objgl);
    objScene3D = initScene3D(objgl); // Créer la scène

    effacerCanevas(objgl); 
    dessiner(objgl, objProgShaders, objScene3D);
}

function initScene3D(objgl) {
    var objScene3D = new Object();
    var tabObjets3D = new Array();
      
    // La caméra
    var camera = creerCamera();
    setPositionsCameraXYZ([0, 0, 10], camera);
    setCiblesCameraXYZ([0, 0, 0], camera);
    setOrientationsXYZ([0, 1, 0], camera);

    // Mettre la caméra sur la scène
    objScene3D.camera = camera;
			
    return objScene3D;
}

function dessiner(objgl, objProgShaders, objScene3D) {
    
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT|objgl.DEPTH_BUFFER_BIT);
}