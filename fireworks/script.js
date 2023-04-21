(function() {
    'use strict';
    console.log('reading');
    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');
    const cc = document.querySelector('.fa-paintbrush');
    // add the loading icon variable here
    const loading = document.querySelector('.fa-person-burst')
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const poem = {
        start: [0, 2, 4],
        stop: [.5, 2.5, 4.5],
        line: [line1, line2, line3]
    }

    myVideo.addEventListener('playing', function(){
        loading.style.display = 'none'
    })

    // add the loading icon script here

    const intervalID = setInterval(checkTime, 500);

    function checkTime() {
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = "showing";
            } else {
                poem.line[i].className = "hidden";
            }
        }
    }

    // fs.addEventListener('click',function(){
    //     myVideo.currentTime = 0;
    //     myVideo.playbackRate = -1; 
    //     myVideo.play();
    // });


    fs.addEventListener('click', function() {
        // The fullscreenElement attribute returns null if the element is in windowed mode
        if (!document.fullscreenElement) {
            // document.documentElement returns the Element that is a direct child of the document, the <html> element
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        if (myVideo.style.filter == "grayscale(100%)") {
            myVideo.style.filter = "none";
          } else {
            myVideo.style.filter = "grayscale(100%)";

          }
    });

})();
