object = {
    Nothing : 0,
    Wall : 1
}

function collision(x,  y) {
    _collisionWall = collisionWall(x,y)
    
    return _collisionWall
}

function collisionWall(x,y) {
    var collision = object.Nothing
    var incertidumbre = 0.05
    
    for(i = 0; collision == object.Nothing && i < walls.length; i++) {
        var node1 = JSON.parse(walls[i].v)
        var node2 = JSON.parse(walls[i].w)
        
        // Horizontale
        if(node1.y == node2.y) {
            if(x >= node1.x-incertidumbre
              && x <= node2.x+incertidumbre
              && y >= node1.y-incertidumbre
              && y <= node1.y+1+incertidumbre)
                collision = object.Wall
           // Vertical
        } else {
            if(x >= node1.x-incertidumbre
              && x <= node1.x+1+incertidumbre
              && y >= node1.y-incertidumbre
              && y <= node2.y+incertidumbre)
                collision = object.Wall
        }
    }
    
    //console.log(x + ',' + y)
    return collision
}