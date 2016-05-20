object = {
    Nothing : 0,
    Wall : 1
}

function collision(x,  y) {
    _collisionWall = collisionWall(x,y)
    return _collisionWall.collision
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