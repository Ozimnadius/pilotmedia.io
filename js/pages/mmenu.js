function Mmenu(settings) {
    let mmenu = this;
    this.menu = document.querySelector(settings.menu);
    this.openBtns = document.querySelectorAll(settings.open);
    this.closeBtns = document.querySelectorAll(settings.close);

    this.open = function () {
        mmenu.menu.classList.add('active');
    }

    this.close = function () {
        mmenu.menu.classList.remove('active');
    }

    for (let i = 0; i < this.openBtns.length; i++) {
        this.openBtns[i].addEventListener('click', mmenu.open);
    }

    for (let i = 0; i < this.closeBtns.length; i++) {
        this.closeBtns[i].addEventListener('click', mmenu.close);
    }

    document.addEventListener('click', function (e) {
        let target = e.target;

        if (!target.closest(settings.menu) && !target.closest(settings.open)) {
            mmenu.close();
        }

    });


}
