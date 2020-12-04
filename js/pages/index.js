//index.js
(function(){

}());

window.onload = function () {
    jsTools.addClass('.jsAddAnimate','animate');

    let allAudio = document.querySelectorAll('.audio');

    for (let i=0;i<allAudio.length;i++){
        new Player(allAudio[i],{
            audio: '.audio__file',
            play: '.audio__btn-play',
            pause: '.audio__btn-pause',
            time: '.audio__time',
            scale: '.audio__scale',
            progress: '.audio__progress'
        });
    }


};