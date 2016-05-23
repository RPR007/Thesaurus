object = {
    Nothing : 0,
    Wall : 1,
    TvCarrier : 2,
    TvReceiver : 3,
    Treasure : 4,
    Arrow : 5
}

function collision(x,  y) {
    var collision = object.Nothing
    
    for(var i = 1; collision == object.Nothing  && i < 6; i++) {
        switch(i) {
            case object.Wall :
                collision = collisionWall(x,y).collision
                break;
            case object.TvCarrier :
                collision = collisionTvCarrier(x,y)
                break;
            case object.TvReceiver :
                collision = collisionTvReceiver(x,y)
                break;
            case object.Treasure :
                collision = collisionTresor(x,y)
                break;
            case object.Arrow :
                collision = collisionArrow(x,y)
                break;
                
        }
    }
    
    return collision
}

function collisionWall(x,y) {
    var collision = object.Nothing
    var incertidumbre = 0.05
    var i
    
    for(i = 0; collision == object.Nothing && i < walls.length; i++) {
        var node1 = JSON.parse(walls[i].v)
        var node2 = JSON.parse(walls[i].w)
        
        // Horizontale
        if(node1.y == node2.y) {
            if(x >= node1.x-incertidumbre
              && x <= node2.x+1+incertidumbre
              && y >= node1.y-incertidumbre
              && y <= node1.y+1+incertidumbre)
                collision = object.Wall
           // Vertical
        } else {
            if(x >= node1.x-incertidumbre
              && x <= node1.x+1+incertidumbre
              && y >= node1.y-incertidumbre
              && y <= node2.y+1+incertidumbre)
                collision = object.Wall
        }
    }
    
    i--
    
    return { collision : collision, nwall : i } 
}

function collisionTvCarrier(x,y) {
    var collision = object.Nothing
    var i
    
    for(i = 0; collision == object.Nothing && i < tvcarrier.length; i++) {
            if(x >= tvcarrier[i].x
              && x <= tvcarrier[i].x+1
              && y >= tvcarrier[i].y
              && y <= tvcarrier[i].y+1)
                collision = object.TvCarrier
    }
    
    return collision
}

function collisionArrow(x,y) {
    var collision = object.Nothing
    var i
    
    for(i = 0; collision == object.Nothing && i < arrows.length; i++) {
            if(x >= arrows[i].x
              && x <= arrows[i].x+1
              && y >= arrows[i].y
              && y <= arrows[i].y+1)
                collision = object.Arrow
    }

    
    return collision
}


function collisionTvReceiver(x,y) {
    var collision = object.Nothing
    var i
    
    for(i = 0; collision == object.Nothing && i < tvreceiver.length; i++) {
            if(x >= tvreceiver[i].x
              && x <= tvreceiver[i].x+1
              && y >= tvreceiver[i].y
              && y <= tvreceiver[i].y+1)
                collision = object.TvReceiver
    }
    
    i--
    
    return collision
}

function collisionTresor(x,y) {
    var collision = object.Nothing
    
    if(x >= treasure.x
    && x <= treasure.x+1
    && y >= treasure.y
    && y <= treasure.y+1)
        collision = object.Treasure
    
    return collision
}

function collisionWallPrime(x,y) {
    var collision = object.Nothing
    var i
    
    for(i = 0; collision == object.Nothing && i < walls.length; i++) {
        var node1 = JSON.parse(walls[i].v)
        var node2 = JSON.parse(walls[i].w)
        
        // Horizontale
        if(node1.y == node2.y) {
            if(x >= node1.x
              && x <= node2.x+1
              && y >= node1.y
              && y <= node1.y+1)
                collision = object.Wall
           // Vertical
        } else {
            if(x >= node1.x
              && x <= node1.x+1
              && y >= node1.y
              && y <= node2.y+1)
                collision = object.Wall
        }
    }
    
    i--
    
    return { collision : collision, nwall : i } 
}