// ------ niveau 1 ----//

var maps = [
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
[2,0,0,0,0,0,0,1,0,1,0,2,0,3,0,2,0,1,0,1,0,0,0,0,0,0,2],
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
function parseLevel(map) {
  // Le Chemin
  var _path =  groupByPrime(map,0)
  
  
  // Le joueurs
   _player = null 
  for(var i = 0; i < map.length; i++) {
      for(var j = 0;j < map[0].length; j++)
        if(map[i][j] == 3)
            _player = {x : j, y : i}
            
  }
  
  // supression du spaw
  _path.removeNode(JSON.stringify({x:_player.x-1,y:_player.y-1}))
  _path.removeNode(JSON.stringify({x:_player.x-1,y:_player.y}))
  _path.removeNode(JSON.stringify({x:_player.x-1,y:_player.y+1}))
   _path.removeNode(JSON.stringify({x:_player.x,y:_player.y-1}))
  _path.removeNode(JSON.stringify({x:_player.x,y:_player.y}))
  _path.removeNode(JSON.stringify({x:_player.x,y:_player.y+1}))
  _path.removeNode(JSON.stringify({x:_player.x+1,y:_player.y-1}))
  _path.removeNode(JSON.stringify({x:_player.x+1,y:_player.y}))
  _path.removeNode(JSON.stringify({x:_player.x+1,y:_player.y+1}))
  
  // Les murs
  var walls_destructible = groupByPrime(map,1,"destructible")
  var walls_indestructible = groupByPrime(map,2,"indestructible")
  var _walls = appendEdgeGraph(walls_destructible.edges(), walls_indestructible.edges())
  
  
  // Les fleches
  var _arrows = new Array()
  for(var i = 0; i < narrows; i++) {
      var path_edges = _path.edges()
      
      var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
      
      var node1 = JSON.parse(edge.v)
      var node2 = JSON.parse(edge.w)
      
      if(node1.y == node2.y) {
            // Horizontal
            _arrows.push({x : Math.floor(node1.x+(node2.x -node1.x)/2), y : node1.y})
      } else {
          // Vertical
           _arrows.push({x : node1.x, y :  Math.floor(node1.y+(node2.y -node1.y)/2)})
      }
      
      _path.removeNode(node1)
      _path.removeNode(node2)
  }
  
  var _tvcarriers = new Array()
  for(var i = 0; i < ntvcarrier; i++) {
      var path_edges = _path.edges()
      
      var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
      
      var node1 = JSON.parse(edge.v)
      var node2 = JSON.parse(edge.w)
      
      if(node1.y == node2.y) {
            // Horizontal
            _tvcarriers.push({x : Math.floor(node1.x+(node2.x -node1.x)/2), y : node1.y})
      } else {
          // Vertical
           _tvcarriers.push({x : node1.x, y :  Math.floor(node1.y+(node2.y -node1.y)/2)})
      }
      
      _path.removeNode(node1)
      _path.removeNode(node2)
  }
  
  var _tvreceivers = new Array()
  for(var i = 0; i < ntvreceiver; i++) {
      var path_edges = _path.edges()
      
      var edge = path_edges[Math.floor((Math.random() * path_edges.length))]
      
      var node1 = JSON.parse(edge.v)
      var node2 = JSON.parse(edge.w)
      
      if(node1.y == node2.y) {
            // Horizontal
            _tvreceivers.push({x : Math.floor(node1.x+(node2.x -node1.x)/2), y : node1.y})
      } else {
          // Vertical
           _tvreceivers.push({x : node1.x, y :  Math.floor(node1.y+(node2.y -node1.y)/2)})
      }
      
      _path.removeNode(node1)
      _path.removeNode(node2)
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
         _treasure = {x : Math.floor(node1.x+(node2.x -node1.x)/2), y : node1.y}
  } else {
          // Vertical
          _treasure = {x : node1.x, y :  Math.floor(node1.y+(node2.y -node1.y)/2)}
  }
 
   return { wall :  _walls,
            arrows : _arrows,
            treasure : _treasure,
			tvcarriers : _tvcarriers,
            tvreceivers : _tvreceivers,
            player : _player
   }
}

