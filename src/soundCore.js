/*
  play all the sounds 
*/
 var sounds = new Object()

 function initSounds() {
      var objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/init.wav')
      objSon.load()
      sounds.initLevel = objSon

      var objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/bomb.wav')
      objSon.load()
      sounds.bomb = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/teleport.wav')
      objSon.load()
      sounds.teleport = objSon;

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/treasure.wav')
      objSon.load()
      sounds.treasure = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/arrow.wav')
      objSon.load()
      sounds.arrow = objSon

      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/finish.wav')
      objSon.load()
      sounds.finish = objSon;
      
      objSon = document.createElement('audio')
      objSon.setAttribute('src', 'sounds/timeout.wav')
      objSon.load()
      sounds.timeOut = objSon;
      
  }