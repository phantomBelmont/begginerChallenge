    const TotalqNa=[{q:"🌕",a:"🐺",category:"metamorphosis"},{q:"🧛🏻",a:"🦇",category:"metamorphosis"},{q:"🐣",a:"🐦‍🔥",category:"metamorphosis"},{q:"🗡️",a:"🛡️",category:"others"}];
    const cardUlooking = document.getElementById('divFlipCard');
    let indexUlooking = 0;
    let surface = true;

    let chosenCategory = 'all';
    let categorizedArray = [];

        function openTheCategory(chosenCa){
            chosenCategory = chosenCa;         
            categorizedArray = pickupNmakeArray();
            renderAcard();
            indexUlooking = 0;            
        }

        function pickupNmakeArray(){
            if(chosenCategory === 'all'){
                return TotalqNa;
            }else{
                return TotalqNa.filter(EachInqNa => EachInqNa.category === chosenCategory);
            }
        }

        function renderAcard(){
            if(categorizedArray.length === 0){
                cardUlooking.textContent = "カード準備中🙇‍♀️";
                return;
            }
            cardUlooking.textContent = surface ? categorizedArray[indexUlooking].q  : categorizedArray[indexUlooking].a;
            console.log("textContent 設定:", cardUlooking.textContent);
        }

        function flipCard(){
            surface=!surface;
            renderAcard();
        }

        function toNext(){
            indexUlooking++;
            if(indexUlooking >= categorizedArray.length){
                shuffleFY();
                indexUlooking = 0;
            }
            surface = true;
            renderAcard();
        }
        function shuffleFY(){
                    for(let indexLast = TotalqNa.length-1; indexLast > 0; indexLast--){
                        let index0toLast = Math.floor(Math.random()*(indexLast+1));
                        [TotalqNa[indexLast], TotalqNa[index0toLast]] = [TotalqNa[index0toLast], TotalqNa[indexLast]];
                    }
                    categorizedArray = pickupNmakeArray();
                }   
                
    categorizedArray = pickupNmakeArray();
    renderAcard();
