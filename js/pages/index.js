//index.js
window.onload = function () {

    //Animation
    jsTools.addClass('.jsAddAnimate', 'animate');

    //Popup
    let popup = new Popup();
    document.addEventListener('click', function (e) {
        let target = e.target;

        //Popup
        if (target.closest('.jsOpenTemplate')) {
            let elem = target.closest('.jsOpenTemplate');

            let data = elem.dataset;

            let html = new Template(data, elem).html();
            popup.open(html);

            if (data.validate) {
                $(data.content).validate({
                    onfocusout: false,
                    submitHandler: function (form) {
                        $(form).find('.form__error').removeClass('active');

                        let data = $(form).serialize(),
                            url = $(form).attr('action');

                        $.ajax({
                            dataType: "json",
                            type: "POST",
                            url: url,
                            data: data,
                            success: function (result) {
                                if (result.status) {
                                    $(form).append(new Template({
                                        template: '.template',
                                        content: '.success'
                                    }).html());
                                } else {
                                    alert('Что-то пошло не так, попробуйте еще раз!!!');
                                }
                            },
                            error: function (result) {
                                alert('Что-то пошло не так, попробуйте еще раз!!!');
                            }
                        });


                    },
                    invalidHandler: function (event, validator) {
                        $(this).find('.form__error').addClass('active');
                    },
                });
                $('input[type=tel]').mask('+7 (999) 999-99-99');
            }

            if (data.audio) {
                let allAudio = document.querySelector(data.content).querySelectorAll('.audio')
                for (let i = 0; i < allAudio.length; i++) {
                    new Player(allAudio[i], audioSettings);
                }
            }

            if (data.swiper){
                new Swiper('.teacher__slider', {
                    slidesPerView: 5,
                    spaceBetween: 35,
                    // Navigation arrows
                    navigation: {
                        nextEl: '.teacher__next',
                        prevEl: '.teacher__prev',
                        disabledClass: 'teacher__arr_disabled'
                    },
                });
            }
        }

    });

    //Audio
    const audioSettings = {
        audio: '.audio__file',
        play: '.audio__btn-play',
        pause: '.audio__btn-pause',
        time: '.audio__time',
        scale: '.audio__scale',
        progress: '.audio__progress'
    };
    let allAudio = document.querySelectorAll('.audio');
    for (let i = 0; i < allAudio.length; i++) {
        new Player(allAudio[i], audioSettings);
    }

    //Mmenu
    const mmenuSettings = {
        menu: '.mmenu',
        open: '.jsMmenuOpen',
        close: '.jsMmenuClose'
    }
    let mmenu = new Mmenu(mmenuSettings);

    //Accept
    document.addEventListener('change', function (e) {
        let target = e.target;

        //Popup
        if (target.closest('.accept__input')) {
            let btn = target.closest('.form').querySelector('.form__submit');
            if (target.checked) {
                btn.classList.remove('disabled');
            } else {
                btn.classList.add('disabled');
            }
        }
    });


    /*SWIPER SLIDER*/
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
        slidesPerView: 1,
        navigation: {
            nextEl: '.revs__next',
            prevEl: '.revs__prev',
            disabledClass: 'revs__arr_disabled'
        },
        breakpoints: {
            767.98: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            991.98: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            1199.98: {
                spaceBetween: 20,
                slidesPerView: 4.7,
            }
        }
    });

    //Paralax
    if (jsTools.getWindowWidth() > 992) {
        let scene = document.querySelector('.footer__hands');
        if (scene) {
            let parallax = new Parallax(scene, {
                hoverOnly: true,
            });
        }
    }

};