        function natureSwap(){

            let natureOrder = ["🌟","🌌","🌲","🌹","🪨","🌅","🏞️","☀️","🌙","🌕","❄️","🔥","⚡","💧","🌪️","🍎","🍓","🍌","🍍","🍄‍🟫","🧅","🥚","🥜","🍞","🍔","🍕","🍜","🍣","🍨","🍺","🍷","🎄","🎃","🎆"];

            for (let last = natureOrder.length-1; last>0; last-- ){
             let randomPickup = Math.floor(Math.random()*(last+1));
             [natureOrder[last], natureOrder[randomPickup]] = [natureOrder[randomPickup], natureOrder[last]];
            };
            const kekka = document.getElementById('natureKekka');
            kekka.innerHTML=`${natureOrder[0]}→${natureOrder[1]}→${natureOrder[2]}`;
        }

        function animalSwap(){
            let animalOrder = ["🦁","🦄","🐏","🐐","🦇","🐺","🐢","🐍","🕊️","🐣","🐦","🐦‍🔥","🪿","🦢","🐚","🐟","🐸","🦉","🐱","🐙","🐶"];
            for (let last = animalOrder.length-1; last>0; last-- ){
             let randomPickup = Math.floor(Math.random()*(last+1));
             [animalOrder[last], animalOrder[randomPickup]] = [animalOrder[randomPickup], animalOrder[last]];
            };
            const kekka = document.getElementById('animalKekka');
            kekka.innerHTML=`${animalOrder[0]}→${animalOrder[1]}→${animalOrder[2]}`;
        }

        function storySwap(){

            let storyOrder = ["🧛🏻","🦇","🐺","🌕","🌬️","🐟","🪺","🧚🏻","👻","☠️","🧟","🦤","🍎","🍖","🍄","🥪","🍷","🧭","⚓","🏰","🗺️","🏹","🪄","💎","🕯️","🧱","🚪","💍","⏱️","🪦","⚰️","📿","⚱️","💣","🗡️","🛡️","🗝️","🪉"];
            for (let last = storyOrder.length-1; last>0; last-- ){
             let randomPickup = Math.floor(Math.random()*(last+1));
             [storyOrder[last], storyOrder[randomPickup]] = [storyOrder[randomPickup], storyOrder[last]];
            };
            const kekka = document.getElementById('storyKekka');
            kekka.innerHTML=storyOrder[0]+"→"+storyOrder[1]+"→"+storyOrder[2];
        }


        function btnSwap(){
            const btn1 = document.getElementById('idnature').textContent;
            const btn2 = document.getElementById('idanimal').textContent;
            const btn3 = document.getElementById('idstory').textContent;

            let surfaceOrder = [btn1, btn2, btn3];

                for(let last = surfaceOrder.length-1; last>0; last--){
                    let randomPickup=Math.floor(Math.random()*(last+1));
                    [surfaceOrder[last],surfaceOrder[randomPickup]] = [surfaceOrder[randomPickup],surfaceOrder[last]];
                };
                document.getElementById('idnature').textContent=surfaceOrder[0];
                document.getElementById('idanimal').textContent=surfaceOrder[1];
                document.getElementById('idstory').textContent=surfaceOrder[2];



            const functionNature = document.getElementById('idnature');
            const functionAnimal = document.getElementById('idanimal');
            const functionStory = document.getElementById('idstory');

            const functionOrder =[functionNature, functionAnimal, functionStory];

                for(let lastindex=functionOrder.length-1; lastindex>0; lastindex--){
                    let btnRandomPickup=Math.floor(Math.random()*(lastindex+1))

                    [functionOrder[lastindex],functionOrder[btnRandomPickup]]=[functionOrder[btnRandomPickup],functionOrder[lastindex]];
                }

            const btnsDiv = document.getElementById('buttonsdiv');
            btnsDiv.innerHTML='';
            functionOrder.forEach(karibox=>{btnsDiv.appendChild(karibox);
            });
        }