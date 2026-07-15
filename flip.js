    const qNa=[{q:"🌕",a:"🐺",category:"metamorphosis"},{q:"🧛🏻",a:"🦇",category:"metamorphosis"},{q:"🐣",a:"🐦‍🔥",category:"metamorphosis"},{q:"🗡️",a:"🛡️",category:"others"}];
    const cardUlooking = document.getElementById('divFlipCard');
    let indexUlooking = 0;
    let surface = true;

    let categoryToShow = 'all';

        function categoryLabelling(chosenCateg){
            categoryToShow = chosenCateg;
            indexUlooking = 0;
            categorizeNrender();
        }

        let categorizedArray = [];

        function render(){
            if(categorizedArray.length === 0){
                cardUlooking.textContent = "カード準備中😅";
                return;
            }
            cardUlooking.textContent = surface ? categorizedArray[indexUlooking].q : categorizedArray[indexUlooking].a;
        }

        function categorize(){
            if(categoryToShow === 'all'){
                return qNa;
            }else{
                return qNa.filter(EachInqNa => EachInqNa.category === categoryToShow);
            }
        }

        function categorizeNrender(){
            categorizedArray = categorize();
            render();
        }

        function flipCard(){
            surface=!surface;
            render();
        }
        function shuffleFY(){
            for(let indexLast = qNa.length-1; indexLast > 0; indexLast--){
                let indexLast0toLast = Math.floor(Math.random()*(indexLast+1));
                [qNa[indexLast], qNa[indexLast0toLast]] = [qNa[indexLast0toLast], qNa[indexLast]];
            }

            categorizedArray = categorize();
        }

        function toNext(){
            indexUlooking++;
            if(indexUlooking >= categorizedArray.length){
                shuffleFY();
                indexUlooking = 0;
            }
            
            surface = true;
            render();
        }

        categorizeNrender();
