
// InchooSnowflakes Class
// based on http://pastebin.com/0j0h2Lws
InchooSnowflakes = Class.create({
    initialize: function(options) {
        this.options = {
            flakes: 35,
            color: ['#e9f0e0', '#d1e8f0', '#bbb', '#ddd', '#fff'],
            text: '&#x2744',
            speed: 2,
            size: { 'max': 50, 'min': 10 },
            currentAcross: 2
        };
        Object.extend(this.options, options || {});
        this.elements = [];
        for (var i = 0; i <= this.options.flakes; i++) {
            this.elements[i] = new Element('span').
            setStyle({
                position: 'fixed',
                top: '0px',
                cursor: 'default',
                background: 'transparent'
            }).
            update(this.options.text);
        }
        document.observe('dom:loaded', this.onDomLoad.bindAsEventListener(this));
        Event.observe(window, "resize", this.onWindowResize.bindAsEventListener(this));
    },
    calculateAcrossIndex: function() {
        var index = 1;
        var viewport = document.viewport.getDimensions();
        if(viewport.width > 1000) {
            index = 2;
        } else if(viewport.width <= 1000 && viewport.width > 500) {
            index = 3;
        } else if(viewport.width <= 500) {
            index = 6;
        }

        return index;
    },
    onDomLoad: function() {
        var viewport = document.viewport.getDimensions();
        this.container = new Element('div', {
            'id': 'InchooSnowflakes'
        });
        this.container.setStyle({
            overflow: 'hidden'
        });
        (document.getElementsByTagName('body')[0]).appendChild(this.container);
        this.elements.each(function(item) {
                this.container.appendChild(item);
                item.size = (this.random(this.options.size.max, this.options.size.min));
                this.options.currentAcross = this.calculateAcrossIndex();
                var acrossInitialRandom = Math.random();
                Object.extend(item, {
                    cords: 0,
                    //across: (Math.random() * 2),
                    acrossInitital: acrossInitialRandom,
                    across: (acrossInitialRandom * this.calculateAcrossIndex()),
                    horizontal: (0.03 + Math.random() / 10),
                    sink: ((this.options.speed * 0.5) + Math.random()/2),
                    posx: (Math.random() * 100),
                    posy: ((Math.random() * document.body.clientHeight)- document.body.clientHeight)
                });
                item.setStyle({
                    fontSize: item.size + 'px',
                    color: this.options.color[this.random(this.options.color.length)],
                    left: item.posx + '%',
                    top: item.posy + 'px',
                    zIndex: '1000'
                });
            },
            this);
        this.start();
    },
    onWindowResize: function(){
        if(this.calculateAcrossIndex() != this.options.currentAcross) {
            this.options.currentAcross = this.calculateAcrossIndex();
            this.elements.each(function(item) {
                    item.across = item.acrossInitital * this.options.currentAcross;
                },
                this);
        }
    },
    move: function() {
        var viewport = document.viewport.getDimensions();
        this.elements.each(function(item) {
                item.cords += item.horizontal;
                item.posy += item.sink;

                var leftPos = (item.posx + item.across * Math.sin(item.cords)) ;
                item.setStyle({
                    top: item.posy + 'px',
                    left: leftPos + '%'
                });
                if(item.posy >= (document.body.clientHeight + item.size)) {
                    item.posy = -20;// - item.size;
                }
            },
            this);
    },
    random: function(max, min) {
        if (!min) {
            return Math.floor(Math.random() * max);
        }
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },
    start: function() {
        this.pe = new PeriodicalExecuter(this.move.bindAsEventListener(this), 0.05);
    },
    stop: function() {
        this.pe.stop();
    }
});
