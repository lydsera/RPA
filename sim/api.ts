/// <reference path="../libs/core/enums.d.ts"/>

async function delay<T>(duration: number, value: T | Promise<T>): Promise<T>;
async function delay(duration: number): Promise<void>
async function delay<T>(duration: number, value?: T | Promise<T>): Promise<T> {
    // eslint-disable-next-line
    const output = await value;
    await new Promise<void>(resolve => setTimeout(() => resolve(), duration));
    return output;
}

namespace pxsim.hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    export function hop(hop: Hop, color: number) {

    }

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    export function onLand(handler: (height: number, more: number, most: number) => void) {

    }
}

namespace pxsim.custom {


    /**
     * This is move
     */
    //% blockId="moveTo" block="moveTo %x  %y "
    export function moveTo(x: number, y: number): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage(x + "=move=" + y, "*");
    }

    /**
     * This is click
     */
    //% blockId="click" block="click "
    export function click(): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage("=click=", "*");
    }


    /**
     * This is input
     */
    //% blockId="input" block="input %x"
    export function input(x: string): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage(x + "=input=", "*");
    }

    /**
     * This is enter
     */
    //% blockId="enter" block="enter"
    export function enter(): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage("=enter=", "*");
    }

    /**
     * This is toggleDown
     */
    //% blockId="toggleDown" block="toggleDown"
    export function toggleDown(): void {

        window.parent.postMessage("=toggleDown=", "*");
    }

    /**
     * This is get
     */
    //% blockId="get" block="get"
    export function get(): string {
        window.addEventListener("message", function (event) {
            if (typeof event.data === 'string') {
                return event.data
            }
            else return null
        }, false);
        return null
    }

}


namespace pxsim.turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% blockId=sampleForward block="forward %steps"
    export function forwardAsync(steps: number) {
        return board().sprite.forwardAsync(steps)
    }

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function turnAsync(direction: Direction, angle: number) {
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        return delay(400)
    }

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    export function onBump(handler: RefAction) {
        let b = board();

        b.bus.listen("Turtle", "Bump", handler);
    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return delay(ms)
    }
}

function logMsg(m: string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg: string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}

namespace pxsim {
    /**
     * A ghost on the screen.
     */
    //%
    export class Sprite {
        /**
         * The X-coordiante
         */
        //%
        public x = 100;
        /**
        * The Y-coordiante
        */
        //%
        public y = 100;
        public angle = 90;

        constructor() {
        }

        private foobar() { }

        /**
         * Move the thing forward
         */
        //%
        public forwardAsync(steps: number) {
            let deg = this.angle / 180 * Math.PI;
            this.x += Math.cos(deg) * steps * 10;
            this.y += Math.sin(deg) * steps * 10;
            board().updateView();

            if (this.x < 0 || this.y < 0)
                board().bus.queue("TURTLE", "BUMP");

            return delay(400)
        }
    }
}




namespace pxsim.sprites {
    /**
     * Creates a new sprite
     */
    //% blockId="sampleCreate" block="createSprite"
    export function createSprite(): Sprite {
        return new Sprite();
    }
}