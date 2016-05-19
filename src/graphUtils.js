function groupBy(array, val) {
    console.log(array.length)
    var graphHorizontal = groupHorizontalBy(array, val)
    var edgeHorizontal = graphHorizontal.walls.edges();
    var nodesHorizontal = graphHorizontal.nodes.nodes();
    var graphVertical = groupVerticalBy(array, val)
    var nodesVertical = graphVertical.nodes.nodes();
    var edgeVertical = graphVertical.walls.edges();
    
    var graph = appendEdgeGraph(edgeHorizontal,edgeVertical)
    for(var i = 0; i < nodesHorizontal.length;i++) {
        if(graphVertical.nodes.hasNode(nodesHorizontal[i])) {
            var h = nodesHorizontal[i]
            graph.setNode(h,h)
            graph.setEdge(h,h)
        }    
    }
    
    return graph;
}

function groupByPrime(array, val) {
    var graphHorizontal = groupHorizontalBy(array, val)
    var edgeHorizontal = graphHorizontal.walls.edges();
    var nodesHorizontal = graphHorizontal.nodes.nodes();
    var graphVertical = groupVerticalBy(array, val)
    var edgeVertical = graphVertical.walls.edges();
    
    for(var i = 0; i < edgeVertical.length; i++) {
        var node1 = edgeVertical[i].v
        var node2 = edgeVertical[i].w
        
        if(graphCollision(edgeHorizontal, node1) && graphCollision(edgeHorizontal, node2)) {
            graphVertical.walls.removeNode(node1)
            graphVertical.walls.removeNode(node2)
            
            node1 = JSON.parse(node1)
            node2 = JSON.parse(node2)
            
            node1.y =  node1.y+1
            node2.y =  node2.y-1
            
            graphVertical.walls.setNode(JSON.stringify(node1),JSON.stringify(node1))
            graphVertical.walls.setNode(JSON.stringify(node2),JSON.stringify(node2))
            
            graphVertical.walls.setEdge(JSON.stringify(node1),JSON.stringify(node2))
        } else if (graphCollision(edgeHorizontal, node1)) {
            graphVertical.walls.removeNode(node1)
            graphVertical.walls.removeNode(node2)
            
            node1 = JSON.parse(node1)
            node2 = JSON.parse(node2)
            
            node1.y =  node1.y+1
            
            graphVertical.walls.setNode(JSON.stringify(node1),JSON.stringify(node1))
            graphVertical.walls.setNode(JSON.stringify(node2),JSON.stringify(node2))
            
            graphVertical.walls.setEdge(JSON.stringify(node1),JSON.stringify(node2))
            
        } else if (graphCollision(edgeHorizontal, node2)) {
            graphVertical.walls.removeNode(node1)
            graphVertical.walls.removeNode(node2)
            
            node1 = JSON.parse(node1)
            node2 = JSON.parse(node2)
            
            node2.y =  node2.y-1
            
            graphVertical.walls.setNode(JSON.stringify(node1),JSON.stringify(node1))
            graphVertical.walls.setNode(JSON.stringify(node2),JSON.stringify(node2))
            
            graphVertical.walls.setEdge(JSON.stringify(node1),JSON.stringify(node2))
        } else {
            
        }
    }
    
    edgeVertical = graphVertical.walls.edges();
    
    var graph = appendEdgeGraph(edgeHorizontal,edgeVertical)
    for(var i = 0; i < nodesHorizontal.length;i++) {
        if(graphVertical.nodes.hasNode(nodesHorizontal[i])) {
            var h = nodesHorizontal[i]
            graph.setNode(h,h)
            graph.setEdge(h,h)
        }    
    }
    
    return graph;
}

function graphCollision(edges, node) {
    var collision = false;
    
    for(var i = 0; !collision && i < edges.length; i++) {
        var node1 = JSON.parse(edges[i].v)
        var node2 = JSON.parse(edges[i].w)
        var node3 = JSON.parse(node)
        
        if(node3.y == node1.y)
            if(node3.x >=  node1.x && node3.x <= node2.x)
                collision = true
                
    }
    
    return collision;
}

function appendEdgeGraph(edgeGraph1,edgeGraph2) {
    var graph = new graphlib.Graph();
    
    for(var i = 0; i < edgeGraph1.length; i++) {
        var h = edgeGraph1[i]
        graph.setNode(h.v,h.v)
        graph.setNode(h.w,h.w)
        graph.setEdge(h.v,h.w)
    }

    for(var i = 0; i < edgeGraph2.length; i++) {
        var v = edgeGraph2[i]
        graph.setNode(v.v,v.v)
        graph.setNode(v.w,v.w)
        graph.setEdge(v.v,v.w)
    }
    
    return graph
}


function groupHorizontalBy(array, val) {
    var graph = new graphlib.Graph();
    var graph2 = new graphlib.Graph();
    
    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++) {
            if(array[i][j] === val) {
                if(j+1 < array[i].length && array[i][j+1] === val) {
                    var start = JSON.stringify({x:j,y:i})
                    for(; j < array[i].length && array[i][j] === val;++j);
                    j--
                    var end = JSON.stringify({x:j,y:i})
                    console.log(start)
                    console.log(end)
                    graph.setNode(start,start)
                    graph.setNode(start,end)
                    graph.setEdge(start,end)
                } else {
                    graph2.setNode(JSON.stringify({x:j,y:i}),JSON.stringify({x:j,y:i}))
                }
            }
        }
    }
    
    return { walls : graph, nodes : graph2 }
}

function groupVerticalBy(array, val) {
    var graph = new graphlib.Graph();
    var graph2 = new graphlib.Graph();
    
    for(var i = 0; i < array[0].length; i++) {
        for(var j = 0; j < array.length; j++) {
            if(array[j][i] === val) {
                if(j+1 < array.length && array[j+1][i] === val) {
                    var start = JSON.stringify({x:i,y:j})
                    for(; j < array.length && array[j][i] === val;++j);
                    j--;
                    var end = JSON.stringify({x:i,y:j})
                    graph.setNode(start,start)
                    graph.setNode(end,end)
                    graph.setEdge(start,end)
                } else {
                    graph2.setNode(JSON.stringify({x:i,y:j}),JSON.stringify({x:i,y:j}))
                } 
            } 
        }
    }
    
    return { walls : graph, nodes : graph2 }
}
