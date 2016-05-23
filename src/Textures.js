// Textures.js

var TEX_TRANSPARENT = 0;
var TEX_METAL = 1;
var TEX_PLANCHER = 1;
var TEX_PLAFOND= 1;

function creerTextures(objgl) {

    // il faut ajouter l'image plancher.jpg sur github
    var tabImages = ['img/Transparent.gif', 'img/Brick.jpg'];
    //var tabImages = ['img/Transparent.gif', 'img/metal.jpg'];
    
	var tabObjTextures = new Array();
	for (var i = 0; i < tabImages.length; i++) {    
		// L'image de la texture
		var objImage = new Image();
		objImage.src = tabImages[i];

		// Cr�er La texture
        var objTexture = objgl.createTexture();

        objgl.bindTexture(objgl.TEXTURE_2D, objTexture);
        objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, 1, 1, 0, objgl.RGBA, objgl.UNSIGNED_BYTE,new Uint8Array([0, 0, 0, 0])); // red
          
        // C'est nécessaire de mettre le onload pour les utilisateurs de firefox et de chrome
        objImage.onload = function() {    
		   // La s�lectionner
		   objgl.bindTexture(objgl.TEXTURE_2D, objTexture);

		   // Ins�rer l'image � l'int�rieur de la texture
    	   objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA,
                         objgl.UNSIGNED_BYTE, objImage);

		    // La param�trer
		    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
		    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.LINEAR);
		    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.CLAMP_TO_EDGE);
		    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.CLAMP_TO_EDGE);
		    
        }
        
	 	// Ins�rer cette texture dans un tableau de textures
		tabObjTextures.push(objTexture);
	}
    
	return tabObjTextures;
}
