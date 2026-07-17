
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
    
    if (roomIDhikisu === 'flipcardNbuttonDiv') {
      console.log("ゲーム2開始！カードを初期化します");
      openTheCategory('all'); 
    }
    if (roomIDhikisu === 'flipcardNbuttonDiv' || roomIDhikisu === 'swapGameDiv') {
            document.body.style.overflow = 'hidden';
    }
    const moonEmoji = document.querySelector('.moon');
    if (moonEmoji) {
        if (roomIDhikisu === 'menu') {
            moonEmoji.style.display = 'block'; 
        } else {
            moonEmoji.style.display = 'none'; 
        }
    }
  }
}

function resetScroll() {　
    document.body.style.overflow = '';
}
function goToMenu() {
  const moonEmoji = document.querySelector('.moon');
    if (moonEmoji) moonEmoji.style.display = 'block';
  resetScroll();
  switchScreen('menu');
}

function goToSwap() {
  switchScreen('swapGameDiv');
}

function goToFlipCategory() {
  switchScreen('flipGameCategoryDiv'); 
}

function goToEachFlipCategory(){
    switchScreen('flipcardNbuttonDiv');
}
