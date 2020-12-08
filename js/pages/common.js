// common.js
const jsTools = {
    getNumber: function (str) {
        return parseInt(str.replace(/\s/g, ''));
    },
    getWindowWidth: function () {
        return document.documentElement.clientWidth;
    },
    getNumberFormat: function (number, decimals, dec_point, thousands_sep) {
        var i, j, kw, kd, km;
        if (isNaN(decimals = Math.abs(decimals))) {
            decimals = 2;
        }
        if (dec_point == undefined) {
            dec_point = ",";
        }
        if (thousands_sep == undefined) {
            thousands_sep = ".";
        }
        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
        if ((j = i.length) > 3) {
            j = j % 3;
        } else {
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        return km + kw + kd;
    },
    imagesResize: function (src) {
        let img = document.querySelectorAll('img');

        for (let i = 0; i < img.length; i++) {
            img[i].src = src;
        }
    },
    addClass: function (selector, name) {

        let elems = document.querySelectorAll(selector);

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.add(name);
        }
    },
    removeClass: function (selector, name) {

        let elems = document.querySelectorAll(selector);

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove(name);
        }
    },
    validateTel: function (value) {
        let re = new RegExp(/\d/g),
            str = value.match(re);

        if (str.length == 11) {
            return true;
        } else {
            return false;
        }
    }
};

$.validator.methods.tel = function (value, element) {
    return jsTools.validateTel(value);
};

function Player(parent, settings) {
    let player = this;
    this.audio = parent.querySelector(settings.audio);
    this.playBtn = parent.querySelector(settings.play);
    this.pauseBtn = parent.querySelector(settings.pause);
    this.timeLeft = parent.querySelector(settings.time);
    this.scale = parent.querySelector(settings.scale);
    this.progress = parent.querySelector(settings.progress);
    this.currentTime = this.audio.currentTime;
    this.total = this.audio.duration || 0;


    this.play = function () {
        player.audio.play();
        togglePlay();
    };

    this.pause = function () {
        player.audio.pause();
        togglePlay();
    };

    this.setTimeLeft = function () {
        player.timeLeft.innerHTML = formatTime(player.total - player.currentTime);

    };

    this.setProgress = function () {
        let percent = Math.floor(player.currentTime / player.total * 100);
        player.progress.style.width = percent + '%';
    };

    this.update = function () {
        player.total = player.audio.duration;
        player.currentTime = player.audio.currentTime;
        player.setTimeLeft();
        player.setProgress();
    };

    this.audio.addEventListener('timeupdate', player.update);

    this.playBtn.addEventListener('click', player.play);

    this.pauseBtn.addEventListener('click', player.pause);

    this.scale.addEventListener('click', function (e)  {
       player.audio.currentTime = player.total*(e.layerX/this.offsetWidth);
    });

    function togglePlay() {
        if (player.playBtn.classList.contains('active')) {
            player.playBtn.classList.remove('active');
            player.pauseBtn.classList.add('active');
        } else {
            player.playBtn.classList.add('active');
            player.pauseBtn.classList.remove('active');
        }
    }

    function formatTime(timestamp) {
        timestamp = Math.floor(timestamp);
        let minutes = Math.floor(timestamp / 60),
            seconds = timestamp % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let str = '-' + minutes + ':' + seconds;
        return str;
    }

    this.setTimeLeft();

}