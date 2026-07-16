
function switchScreen(roomIDhikisu) {
  const allTags = document.querySelectorAll('.opened');
  allTags.forEach(eachDiv => {
    eachDiv.classList.remove('opened');
    eachDiv.classList.add('hidden');
  });

  const theRoom = document.getElementById(roomIDhikisu);
  if (theRoom) {
    theRoom.classList.remove('hidden');
    theRoom.classList.add('opened');
    
    if (roomIDhikisu === 'flipGameDiv') {
      console.log("ゲーム2開始！カードを初期化します");
      openTheCategory('all'); 
    }
  }
}

function goToMenu() {
  switchScreen('menu');
}

function goToSwap() {
  switchScreen('swapGameDiv');
}

function goToFlipCategory() {
  switchScreen('flipGameCategoryDiv'); 
}

function goToEachFlipCategory(){
    switchScreen('flipGameDiv');
}
