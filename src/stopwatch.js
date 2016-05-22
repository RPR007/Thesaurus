function stopwatch() {
    var time2 = 0
    setInterval(function() {
        if(time2 <= time) {
            draw(time2,time)
            time2++;
            //console.log((time - time2)+1)
            // Rafraichir la page si le temps est écoulé
            if (((time-time2)+1) == 0) {
                document.exitPointerLock = document.exitPointerLock    ||
                                            document.mozExitPointerLock ||
                                            document.webkitExitPointerLock;

                document.exitPointerLock();
                alert('Temps écoulé !');
                location.reload();
            }
        }
    }, 1000);
    
//    console.log(objCanvas.width*(3/4))
}

function draw(time1,time2) {
    var objCanvas = document.getElementById('stopwatch');
    var objC2D = objCanvas.getContext('2d');
    
    clear();
    
    objC2D.strokeStyle = 'green';
    objC2D.lineWidth = 10;
    objC2D.beginPath();
    objC2D.arc(objCanvas.width/2,objCanvas.height/2,(objCanvas.width/2)-(objC2D.lineWidth/2),-Math.PI/2,((2*Math.PI)*(time1/time2))-(Math.PI/2),false);
    objC2D.stroke();
    
    var strTexte = time2-time1;
    objC2D.fillStyle = 'black';
    objC2D.font = '18pt Verdana';
    objC2D.textAlign = 'center';
    objC2D.fillText(strTexte, objCanvas.width/2,objCanvas.height/2);
   // objC2D.strokeText(strTexte, objCanvas.width/2,40);
}

function clear() {
    var objCanvas = document.getElementById('stopwatch');
    var objC2D = objCanvas.getContext('2d');
    
    objC2D.clearRect(0, 0, objCanvas.width, objCanvas.height);
}