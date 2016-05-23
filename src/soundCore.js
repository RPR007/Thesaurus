/*
  play all the sounds 
*/
 var sounds = new Object()

 function initSounds() {
      var objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Debut.wav')
      objSon.load()
      sounds.initLevel = objSon

      var objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Boom.wav')
      objSon.load()
      sounds.bomb = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Teleporte.wav')
      objSon.load()
      sounds.teleport = objSon;

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Tresor.wav')
      objSon.load()
      sounds.treasure = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Fleche.wav')
      objSon.load()
      sounds.arrow = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/Fin.wav')
      objSon.load()
      sounds.finish = objSon;
      
      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/TimeUp.wav')
      objSon.load()
      sounds.timeOut = objSon;
      
  }