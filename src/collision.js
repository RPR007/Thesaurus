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
    
    for(i = 0; collision == object.Nothing && i < walls.length; i++) {
        var node1 = JSON.parse(walls[i].v)
        var node2 = JSON.parse(walls[i].w)
        
        // Horizontale
        if(node1.y == node2.y) {
            if(x >= node1.x 
              && x <= node2.x
              && y >= node1.y
              && y <= node1.y+1)
                collision = object.Wall
           // Vertical
        } else {
            if(x >= node1.x
              && x <= node1.x+1
              && y >= node1.y
              && y <= node2.y)
                collision = object.Wall
        }
    }
    
    //console.log(x + ',' + y)
    return collision
}