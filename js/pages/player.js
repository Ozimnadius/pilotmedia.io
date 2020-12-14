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


    // this.play = function () {
    //     player.audio.play();
    //     togglePlay();
    // };
    //
    // this.pause = function () {
    //     player.audio.pause();
    //     togglePlay();
    // };
    //
    // this.setTimeLeft = function () {
    //     player.timeLeft.innerHTML = formatTime(player.total - player.currentTime);
    // };

    // this.setProgress = function () {
    //     let percent = Math.floor(player.currentTime / player.total * 100);
    //     player.progress.style.width = percent + '%';
    // };

    // this.update = function () {
    //     player.total = player.audio.duration;
    //     player.currentTime = player.audio.currentTime;
    //     player.setTimeLeft();
    //     player.setProgress();
    // };

    this.audio.addEventListener('timeupdate', function () {
        player.update();
    });

    this.playBtn.addEventListener('click', function () {
        player.play();
    });

    this.pauseBtn.addEventListener('click', function () {
        player.pause()
    });

    this.scale.addEventListener('click', function (e) {
        player.audio.currentTime = player.total * (e.layerX / this.offsetWidth);
    });

    // function togglePlay() {
    //     if (player.playBtn.classList.contains('active')) {
    //         player.playBtn.classList.remove('active');
    //         player.pauseBtn.classList.add('active');
    //     } else {
    //         player.playBtn.classList.add('active');
    //         player.pauseBtn.classList.remove('active');
    //     }
    // }

    // function formatTime(timestamp) {
    //     timestamp = Math.floor(timestamp);
    //     let minutes = Math.floor(timestamp / 60),
    //         seconds = timestamp % 60;
    //     if (seconds < 10) {
    //         seconds = '0' + seconds;
    //     }
    //     let str = '-' + minutes + ':' + seconds;
    //     return str;
    // }

    this.setTimeLeft();

}

Player.prototype = {
    play: function () {
        this.audio.play();
        this.togglePlay();
    },
    pause: function () {
        this.audio.pause();
        this.togglePlay();
    },
    setTimeLeft: function () {
        this.timeLeft.innerHTML = this.formatTime(this.total - this.currentTime);
    },
    setProgress: function () {
        let percent = Math.floor(this.currentTime / this.total * 100);
        this.progress.style.width = percent + '%';
    },
    update: function () {
        this.total = this.audio.duration;
        this.currentTime = this.audio.currentTime;
        this.setTimeLeft();
        this.setProgress();
    },
    formatTime: function (timestamp) {
        timestamp = Math.floor(timestamp);
        let minutes = Math.floor(timestamp / 60),
            seconds = timestamp % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let str = '-' + minutes + ':' + seconds;
        return str;
    },
    togglePlay: function () {
        if (this.playBtn.classList.contains('active')) {
            this.playBtn.classList.remove('active');
            this.pauseBtn.classList.add('active');
        } else {
            this.playBtn.classList.add('active');
            this.pauseBtn.classList.remove('active');
        }
    }
}
