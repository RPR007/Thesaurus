// Textures.js

var TEX_TRANSPARENT = 0;
var TEX_METAL = 1;

function creerTextures(objgl) {
    var tabImages = ['img/Transparent.gif', 'img/metal.jpg'];

	var tabObjTextures = new Array();
	for (var i = 0; i < 2; i++) {    
		// L'image de la texture
		var objImage = new Image();
		objImage.src = tabImages[i];
    //    objImage.crossOrigin = "Anonymous";
        
		// Cr�er La texture
        var objTexture = objgl.createTexture();
			             
		// La s�lectionner
		objgl.bindTexture(objgl.TEXTURE_2D, objTexture);

		// Ins�rer l'image � l'int�rieur de la texture
		objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA,
                         objgl.UNSIGNED_BYTE, objImage);

		// La param�trer
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.NEAREST);
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST)
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.CLAMP_TO_EDGE);
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.CLAMP_TO_EDGE);
		
		// Ins�rer cette texture dans un tableau de textures
		tabObjTextures.push(objTexture);
	}

	return tabObjTextures;
}