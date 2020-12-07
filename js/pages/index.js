//index.js
(function () {

}());

window.onload = function () {

    jsTools.addClass('.jsAddAnimate', 'animate');

    let allAudio = document.querySelectorAll('.audio');

    for (let i = 0; i < allAudio.length; i++) {
        new Player(allAudio[i], {
            audio: '.audio__file',
            play: '.audio__btn-play',
            pause: '.audio__btn-pause',
            time: '.audio__time',
            scale: '.audio__scale',
            progress: '.audio__progress'
        });
    }


    var teachsSwiper = new Swiper('.teachs__container', {

        // If we need pagination
        pagination: {
            el: '.teachs__pag',
            bulletClass: 'teachs__bullet',
            bulletActiveClass: 'teachs__bullet_active',
            clickable: true
        },
        // Navigation arrows
        navigation: {
            nextEl: '.teachs__next',
            prevEl: '.teachs__prev',
            disabledClass: 'teachs__arr_disabled'
        },
    });

    var revsSwiper = new Swiper('.revs__container', {
        spaceBetween: 20,
        slidesPerView: 4.7,
        navigation: {
            nextEl: '.revs__next',
            prevEl: '.revs__prev',
            disabledClass: 'revs__arr_disabled'
        },
    });

    let jsOpenTemplates = document.querySelectorAll('.jsOpenTemplate');


    for (let i = 0; i < jsOpenTemplates.length; i++) {
        jsOpenTemplates[i].addEventListener('click', function (e) {
            e.preventDefault();
            let data = this.dataset,
                settings = {
                    parent: data.parent || '',
                    template: data.template,
                    content: data.content
                };

            let html = new Template(settings).html();
            popup.open(html);
        });
    }

};