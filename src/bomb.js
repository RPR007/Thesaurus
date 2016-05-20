function bomb(wall, x, y) {
    var node1 = wall.v
    var node2 = wall.w
    console.log(node1)
    console.log(node2)
    
    level.wall.removeNode(node1)
    level.wall.removeNode(node2)
    
    node1 = JSON.parse(node1)
    node2 = JSON.parse(node2)
    
    x=Math.floor(x)
    y=Math.floor(y)
    
    if(node1.y == node2.y && node1.x == node2.y) {
        // on fait rien
    // Horizontal    
    } else if(node1.x == x && node1.y == y) {
       if(node1.y == node2.y) {
           node1 = JSON.stringify({x : node1.x+1, y : node1.y})
           node2 = JSON.stringify(node2)
           
           level.wall.setNode(node1,node1)
           level.wall.setNode(node2,node2)
           
           level.wall.setEdge(node1,node2)
       } else {
           node1 = JSON.stringify({x : node1.x, y : node1.y+1})
           node2 = JSON.stringify(node2)
           
           level.wall.setNode(node1,node1)
           level.wall.setNode(node2,node2)
           
           level.wall.setEdge(node1,node2)
       }
    } else if (node2.x == x && node2.y == y) {
       if(node1.y == node2.y) {
           console.log("asdfasdf")
           node1 = JSON.stringify(node1)
           node2 = JSON.stringify({x : node2.x-1, y : node2.y})
           
           level.wall.setNode(node1,node1)
           level.wall.setNode(node2,node2)
           
           level.wall.setEdge(node1,node2)
       } else {
           node1 = JSON.stringify(node1)
           node2 = JSON.stringify({x : node2.x, y : node2.y-1})
           
           level.wall.setNode(node1,node1)
           level.wall.setNode(node2,node2)
           
           level.wall.setEdge(node1,node2)
       }
    } else if(node1.y == node2.y) {
        node1 = JSON.stringify(node1)
        node2 = JSON.stringify(node2)
        var node3 = JSON.stringify({x:x-1, y:y})
        var node4 = JSON.stringify({x:x+1, y:y})
        
        level.wall.setNode(node1,node1)
        level.wall.setNode(node2,node2)
        level.wall.setNode(node3,node3)
        level.wall.setNode(node4,node4)
        
        level.wall.setEdge(node1,node3)
        level.wall.setEdge(node2,node4)
    // Vertical
    } else {
        node1 = JSON.stringify(node1)
        node2 = JSON.stringify(node2)
        var node3 = {x:x, y:y-1}
        var node4 = {x:x, y:y+1}
        
        level.wall.setNode(node1,node1)
        level.wall.setNode(node2,node2)
        level.wall.setNode(node3,node3)
        level.wall.setNode(node4,node4)
        
        level.wall.setEdge(node1,node3)
        level.wall.setEdge(node2,node4)
    }
    
    walls = level.wall.edges();
}