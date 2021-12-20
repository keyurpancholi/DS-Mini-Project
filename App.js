const queen = document.querySelector("#queen");
const rook = document.querySelector("#rook");
const bishop = document.querySelector("#bishop");
const knight = document.querySelector("#knight");
const resetbtn = document.querySelector('.reset-btn');

let type = -1;

// const right_menu = document.querySelector(".right-menu");

queen.addEventListener("click", e => {
  document.getElementById("message").innerHTML = "Piece chosen: &#9813";
  document.getElementById("choose").innerText = "Choose source and destination";
  resetGrid();
  type = 0;
});

rook.addEventListener("click", e => {
  document.getElementById("message").innerHTML = "Piece chosen: &#9814";
  document.getElementById("choose").innerText = "Choose source and destination";
  resetGrid();
  type = 1;
});

bishop.addEventListener("click", e => {
  document.getElementById("message").innerHTML = "Piece chosen: &#9815";
  document.getElementById("choose").innerText = "Choose source and destination";
  resetGrid();
  type = 2;
});

knight.addEventListener("click", e => {
  document.getElementById("message").innerHTML = "Piece chosen: &#9816";
  document.getElementById("choose").innerText = "Choose source and destination";
  resetGrid();
  type = 3;
});

resetbtn.addEventListener("click", e => {
  resetGrid();
})

const grid = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0],
  [0,0,0,1,0,1,0,0],
  [0,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,1,0,0,1,1,0],
  [0,0,1,0,0,1,0,0],
  [0,0,0,0,0,1,0,0]
];

let flag = 0;
const source = {};
const destination = {};
let start;

const resetGrid = () => {
  for(let i=0; i<grid.length; i++){
    for(let j=0;j<grid[i].length;j++){
      if(grid[i][j]===1){
        let id = `${i}${j}`;
        document.getElementById(id).innerHTML = "&#9760";
      }
      else if(i%2===0){
        let currentCell = `${i}${j}`;
        if(j%2===0){
          document.getElementById(currentCell).style.backgroundColor = "white";
          document.getElementById(currentCell).innerText = "";
        }
        else{
          document.getElementById(currentCell).style.backgroundColor = "#4e4e4e80";
          document.getElementById(currentCell).innerText = "";
        }
      }
      else{
        let currentCell = `${i}${j}`;
        if(j%2===0){
          document.getElementById(currentCell).style.backgroundColor = "#4e4e4e80";
          document.getElementById(currentCell).innerText = "";
        }
        else{
          document.getElementById(currentCell).style.backgroundColor = "white";
          document.getElementById(currentCell).innerText = "";
        }
      }
    }
  }
  flag = 0;
}

const chessgrid = document.querySelector(".chessboard-left");
  chessgrid.addEventListener("click", e => {
    
    if(flag===0){
      createSource(e.target.id);
      start = e.target.id;
    }
    
    if(flag===1){
      createDestination(e.target.id);
    }
})

const createSource = sourceID => {
  const [ x, y ] = sourceID;
  const xc = parseInt(x);
  const yc = parseInt(y);

  source.x = xc;
  source.y = yc;

  flag++;
}

const createDestination = destinationID => {
  const [ x, y ] = destinationID;
  const xc = parseInt(x);
  const yc = parseInt(y);

  destination.x = xc;
  destination.y = yc;
  
  if(type===0){
    moveQueen(source, destination);
  }
  else if(type===1){
    moveRook(source, destination);
  }
  else if(type===2){
    moveBishop(source, destination);
  }
  else if(type===3){
    moveKnight(source, destination);
  }
}

console.log(source, destination);

// Function to move rook

const moveRook = (source, destination) => {
  let queue = [];
  let visited = [];
  let parentForCell = [];

  for(let i=0;i<64;i++){
    visited[i] = false;
    parentForCell[i] = null;
  }

  queue.push(source);
  let first = source.x*8 + source.y;
  visited[first] = true;  

  while(queue.length>0){
    let cell = queue.shift();

    let neighbours = [
      {x: cell.x, y: cell.y +1},
      {x: cell.x, y: cell.y -1},
      {x: cell.x -1, y: cell.y},
      {x: cell.x +1, y: cell.y}
    ]

    let currentKey = cell.x*8 + cell.y;
    visited[currentKey] = true; 
    // console.log("Visited " + currentKey);

    for(let i=0;i<neighbours.length;i++){
      if(neighbours[i].x < 0 || neighbours[i].x > 7){
        continue;
      }
      if(neighbours[i].y < 0 || neighbours[i].y > 7){
        continue;
      }
      if(grid[neighbours[i].x][neighbours[i].y]===1){
        continue;
      }

      let neighbourKey = neighbours[i].x*8 + neighbours[i].y;
      if(visited[neighbourKey] || parentForCell[neighbourKey]!=null){
        continue;
      }

      queue.push(neighbours[i]);
      parentForCell[neighbourKey] = currentKey;
    }
  }

  let path = [];
  let destinationKey = destination.x*8 + destination.y;
  document.getElementById(`${destination.x}${destination.y}`).style.backgroundColor = "green";
  console.log("Destination key " + destinationKey);
  let iter = parentForCell[destinationKey];
  
  while(iter != null) {
    path.unshift(iter);
    iter = parentForCell[iter];
  }

  for(let i=0;i<path.length;i++){
    let yc = path[i]%8;
    let xc = Math.floor(path[i]/8);

    let key = `${xc}${yc}`;
    console.log(key);
    let cell = document.getElementById(key);
    cell.style.backgroundColor = '#ffbf80';
    cell.innerText = `${i+1}`;
  }
  console.log(path);
}

// Function to move the queen

const moveQueen = (source, destination) => {
  let queue = [];
  let visited = [];
  let parentForCell = [];

  for(let i=0;i<64;i++){
    visited[i] = false;
    parentForCell[i] = null;
  }

  queue.push(source);
  let first = source.x*8 + source.y;
  visited[first] = true;  

  while(queue.length>0){
    let cell = queue.shift();

    let neighbours = [
      {x: cell.x, y: cell.y +1},
      {x: cell.x, y: cell.y -1},
      {x: cell.x -1, y: cell.y},
      {x: cell.x +1, y: cell.y},
      {x: cell.x +1, y: cell.y +1},
      {x: cell.x -1, y: cell.y -1},
      {x: cell.x +1, y: cell.y -1},
      {x: cell.x -1, y: cell.y +1}
    ]

    let currentKey = cell.x*8 + cell.y;
    visited[currentKey] = true; 
    // console.log("Visited " + currentKey);

    for(let i=0;i<neighbours.length;i++){
      if(neighbours[i].x < 0 || neighbours[i].x > 7){
        continue;
      }
      if(neighbours[i].y < 0 || neighbours[i].y > 7){
        continue;
      }
      if(grid[neighbours[i].x][neighbours[i].y]===1){
        continue;
      }

      let neighbourKey = neighbours[i].x*8 + neighbours[i].y;
      if(visited[neighbourKey] || parentForCell[neighbourKey]!=null){
        continue;
      }

      queue.push(neighbours[i]);
      parentForCell[neighbourKey] = currentKey;
    }
  }

  let path = [];
  let destinationKey = destination.x*8 + destination.y;
  document.getElementById(`${destination.x}${destination.y}`).style.backgroundColor = "green";
  let iter = parentForCell[destinationKey];

  while(iter != null) {
    path.unshift(iter);
    iter = parentForCell[iter];
  }

  for(let i=0;i<path.length;i++){
    let yc = path[i]%8;
    let xc = Math.floor(path[i]/8);

    let key = `${xc}${yc}`;
    console.log(key);
    let cell = document.getElementById(key);
    cell.style.backgroundColor = '#ffbf80';
    cell.innerText = `${i+1}`;
  }
  console.log(path);
}

// Function to move the knight

const moveKnight = (source, destination) => {
  let queue = [];
  let visited = [];
  let parentForCell = [];

  for(let i=0;i<64;i++){
    visited[i] = false;
    parentForCell[i] = null;
  }

  queue.push(source);
  let first = source.x*8 + source.y;
  visited[first] = true;  

  while(queue.length>0){
    let cell = queue.shift();
    
    let neighbours = [
      {x: cell.x -1, y: cell.y -2},
      {x: cell.x -2, y: cell.y -1},
      {x: cell.x -2, y: cell.y +1},
      {x: cell.x -1, y: cell.y +2},
      {x: cell.x +1, y: cell.y +2},
      {x: cell.x +2, y: cell.y +1},               
      {x: cell.x +2, y: cell.y -1},
      {X: cell.x +1, y: cell.y -2}
    ]

    let currentKey = cell.x*8 + cell.y;
    visited[currentKey] = true; 
    // console.log("Visited " + currentKey);

    for(let i=0;i<neighbours.length;i++){
      if(neighbours[i].x < 0 || neighbours[i].x > 7){
        continue;
      }
      if(neighbours[i].y < 0 || neighbours[i].y > 7){
        continue;
      }
      if(grid[neighbours[i].x][neighbours[i].y]===1){
        continue;
      }

      let neighbourKey = neighbours[i].x*8 + neighbours[i].y;
      if(visited[neighbourKey] || parentForCell[neighbourKey]!=null){
        continue;
      }

      queue.push(neighbours[i]);
      parentForCell[neighbourKey] = currentKey;
    }
  }

  let path = [];
  let destinationKey = destination.x*8 + destination.y;
  document.getElementById(`${destination.x}${destination.y}`).style.backgroundColor = "green";
  console.log("Destination key " + destinationKey);
  let iter = parentForCell[destinationKey];
  
  while(iter != null) {
    path.unshift(iter);
    iter = parentForCell[iter];
  }

  for(let i=0;i<path.length;i++){
    let yc = path[i]%8;
    let xc = Math.floor(path[i]/8);

    let key = `${xc}${yc}`;
    console.log(key);
    let cell = document.getElementById(key);
    cell.style.backgroundColor = '#ffbf80';
    cell.innerText = `${i+1}`;
  }
  console.log(path);
}

// Function to move bishop 

const moveBishop = (source, destination) => {
  let queue = [];
  let visited = [];
  let parentForCell = [];

  for(let i=0;i<64;i++){
    visited[i] = false;
    parentForCell[i] = null;
  }

  queue.push(source);
  let first = source.x*8 + source.y;
  visited[first] = true;  

  while(queue.length>0){
    let cell = queue.shift();

    let neighbours = [
      {x: cell.x -1, y: cell.y -1},
      {x: cell.x +1, y: cell.y +1},
      {x: cell.x -1, y: cell.y +1},
      {x: cell.x +1, y: cell.y -1}
    ]

    let currentKey = cell.x*8 + cell.y;
    visited[currentKey] = true; 
    // console.log("Visited " + currentKey);

    for(let i=0;i<neighbours.length;i++){
      if(neighbours[i].x < 0 || neighbours[i].x > 7){
        continue;
      }
      if(neighbours[i].y < 0 || neighbours[i].y > 7){
        continue;
      }
      if(grid[neighbours[i].x][neighbours[i].y]===1){
        continue;
      }

      let neighbourKey = neighbours[i].x*8 + neighbours[i].y;
      if(visited[neighbourKey] || parentForCell[neighbourKey]!=null){
        continue;
      }

      queue.push(neighbours[i]);
      parentForCell[neighbourKey] = currentKey;
    }
  }

  let path = [];
  let destinationKey = destination.x*8 + destination.y;
  document.getElementById(`${destination.x}${destination.y}`).style.backgroundColor = "green";
  console.log("Destination key " + destinationKey);
  let iter = parentForCell[destinationKey];
  
  while(iter != null) {
    path.unshift(iter);
    iter = parentForCell[iter];
  }

  for(let i=0;i<path.length;i++){
    let yc = path[i]%8;
    let xc = Math.floor(path[i]/8);

    let key = `${xc}${yc}`;
    console.log(key);
    let cell = document.getElementById(key);
    setTimeout(color(cell, i), 1000);
  }

  function color(cell, i){
    cell.style.backgroundColor = '#ffbf80';
    cell.innerText = `${i+1}`;
  }
  console.log(path);
}
