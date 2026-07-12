let surfaceToFlip=true;

        function surfaceFlip(){
            surfaceToFlip=!surfaceToFlip;
            if(surfaceToFlip){
            document.getElementById('idflip').textContent="🌙";
            }else{
            document.getElementById('idflip').textContent="🐺";
            };
        }