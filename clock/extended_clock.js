"use strict";

import Clock from './clock.js'

class ExtendedClock extends Clock {
    constructor(options) {
        super(options)
        let { precision = 1000 } = options
        this.precision = precision

    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }

}

let c = new ExtendedClock({template: "h:m:s" })
c.start()
setTimeout(() => {}, 2000)
c.stop()
