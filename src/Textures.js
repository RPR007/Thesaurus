// Textures.js

var TEX_TRANSPARENT = 0;
var TEX_METAL = 1;
var TEX_PLANCHER = 2;

function creerTextures(objgl) {

    var tabImages = ['img/Transparent.gif', 'img/metal.jpg', 'img/plancher.jpg'];
    var tabloadImages = [0,0]
    
	var tabObjTextures = new Array();
	for (var i = 0; i < tabImages.length; i++) {    
		// L'image de la texture
		var objImage = new Image();
		objImage.src = tabImages[i];

		// Cr�er La texture
        var objTexture = objgl.createTexture();
        //Etienne: A-t'on vraiment besoin de mettre les images dans une onload = function()?  Devrait fonctionner sinon.
        //Je ne sais pas où tu as vu ça, pas besoins de onload pour les textures

       // La s�lectionner
	   objgl.bindTexture(objgl.TEXTURE_2D, objTexture);

	   // Ins�rer l'image � l'int�rieur de la texture
	   objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA,
                     objgl.UNSIGNED_BYTE, objImage);

	    // La param�trer
	    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.NEAREST);
	    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST);
	    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.CLAMP_TO_EDGE);
	    objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.CLAMP_TO_EDGE);
        
	 	// Ins�rer cette texture dans un tableau de textures
		tabObjTextures.push(objTexture);
	}

   // while(!tabloadImages[0] && !tabloadImages[1]);
    
	return tabObjTextures;
}
