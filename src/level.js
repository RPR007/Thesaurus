// ------ niveau 1 ----//

var levels = [
[[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,0,2],
[2,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,2],
[2,1,1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,1,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,2],
[2,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,2],
[2,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,2],
[2,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,0,0,2],
[2,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,2],
[2,0,0,0,0,1,0,1,1,1,0,2,2,0,2,2,0,1,1,1,0,1,0,0,0,0,2],
[2,0,1,1,1,1,0,1,0,1,0,2,0,0,0,2,0,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,0,0,1,0,1,0,2,0,0,0,2,0,1,0,1,0,0,0,0,0,0,2],
[2,1,1,1,1,1,0,1,0,1,0,2,0,0,0,2,0,1,0,1,0,1,1,1,1,1,2],
[2,0,0,0,0,0,0,1,0,1,0,2,2,2,2,2,0,1,0,1,0,0,0,0,0,0,2],
[2,0,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,2],
[2,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,1,0,2],
[2,0,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,2],
[2,0,1,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,2],
[2,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,2],
[2,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,2],
[2,0,1,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0,2],
[2,0,1,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,2],
[2,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]]
];

// Mettre le niveau en graphe de coordonées
function parseLevel(level) {
  // Le Chemin
  var _path =  groupByPrime(level,0)
  
  // Les murs
  var walls_destructible = groupByPrime(level,1,"destructible")
  var walls_indestructible = groupByPrime(level,2,"indestructible")
  var _walls = appendEdgeGraph(walls_destructible.edges(), walls_indestructible.edges())
  
  
  // Les fleches
  var _arrows = new Array()
  for(var i = 0; i < 18; i++) {
      var path_edges = _path.edges()
      
      var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
      
      var node1 = JSON.parse(edge.v)
      var node2 = JSON.parse(edge.w)
      
      if(node1.y == node2.y) {
            // Horizontal
            _arrows.push({x : node1.x+(node2.x -node1.x)/2, y : node1.y})
      } else {
          // Vertical
           _arrows.push({x : node1.x, y :  node1.y+(node2.y -node1.y)/2})
      }
      
      _path.removeNode(node1)
      _path.removeNode(node2)
  }
  
  //Le tele-transporteur
  var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
  var node1 = JSON.parse(edge.v)
  var node2 = JSON.parse(edge.w)
  var _tvcarrier = null
  if(node1.y == node2.y) {
            // Horizontal
         _tvcarrier = {x : node1.x+(node2.x -node1.x)/2, y : node1.y}
  } else {
          // Vertical
          _tvcarrier = {x : node1.x, y :  node1.y+(node2.y -node1.y)/2}
  }
 
  _path.removeNode(node1)
  _path.removeNode(node2)  
  
  
   // Le tresor
  var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
  var node1 = JSON.parse(edge.v)
  var node2 = JSON.parse(edge.w)
  var _treasure = null
  if(node1.y == node2.y) {
            // Horizontal
         _treasure = {x : node1.x+(node2.x -node1.x)/2, y : node1.y}
  } else {
          // Vertical
          _treasure = {x : node1.x, y :  node1.y+(node2.y -node1.y)/2}
  }
 
  _path.removeNode(node1)
  _path.removeNode(node2)
 
  
  // return { wall : groupByPrime(level,1)
   //        ,path : groupBy(level,0) }
   return { wall :  _walls,
            arrows : _arrows,
            treasure : _treasure,
			tvcarrier : _tvcarrier}
}

