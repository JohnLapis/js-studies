"use strict";

function ex1() {
    function spy(func) {
        // returns wrapper
        // wrapper has $(calls) array of all calls' arguments

        function wrapper(...args) {
            wrapper.calls.push(args)
            return func.apply(this, args)
        }

        wrapper.calls = [];

        return wrapper
    }


    function work(a, b) {
        alert( a + b ); // work is an arbitrary function or method
    }

    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
        alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }
}

function ex2() {
    function delay(f, _delay) {
        return function(...args) {
            setTimeout(() => f.apply(this, args), _delay)
        }
    }

    function f(x) {
        alert(x);
    }

    // create wrappers
    let f1000 = delay(f, 1000);
    let f1500 = delay(f, 1500);

    f1000("test"); // shows "test" after 1000ms
    f1500("test"); // shows "test" after 1500ms
}

function ex3() {
    function debounce(f, delay) {
        // returns wrapper
        // wrapper runs only last call after $(delay) miliseconds

        let timeout
        return function(...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => f.apply(this, args), 1000)
        }
    }

    let f = debounce(alert, 1000);

    f("a");
    setTimeout( () => f("b"), 200);
    setTimeout( () => f("c"), 500);
}

function ex4() {
    function throttle(f, delay) {
        let isThrottled = false,
            lastArgs,
            lastThis

        function wrapper() {
            if (isThrottled) {
                lastArgs = arguments
                lastThis = this
                return
            }

            f.apply(this, arguments)
            isThrottled = true
            setTimeout(() => {
                isThrottled = false
                if (lastArgs) {
                    wrapper.apply(lastThis, lastArgs)
                    lastThis = lastArgs = null
                }
            }, delay)
        }

        return wrapper

    }

    function f(a) {
        console.log(a);
    }

    let f1000 = throttle(f, 1000);

    f1000(1)
    f1000(2)
    f1000(3)
}

ex4()
