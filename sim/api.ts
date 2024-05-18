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

//% color="#FF2121" weight=100
namespace pxsim.rpa {


    /**
     * This is move
     */
    //% blockId="moveTo" block="moveTo %x  %y" color="#FF93C4" 
    export function moveTo(x: number, y: number): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage(x + "=move=" + y, "*");
    }

    /**
     * This is click
     */
    //% blockId="click" block="click" color="#FF8135"
    export function click(): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage("=click=", "*");
    }


    /**
     * This is input
     */
    //% blockId="input" block="input %x" color="#FFF609"
    export function input(x: string): void {
        // 首先，检查是否支持模拟鼠标移动
        if(x==null) return;
        window.parent.postMessage(x + "=input=", "*");
    }

    /**
     * This is enter
     */
    //% blockId="enter" block="enter" color="#249CA3"
    export function enter(): void {
        // 首先，检查是否支持模拟鼠标移动

        window.parent.postMessage("=enter=", "*");
    }

    //% block="getInputxPos" color="#78DC52"
    export function getInputxPos():number {
        return 0;
    }

    //% block="getInputyPos" color="#78DC52"
    export function getInputyPos():number {
        return 0;
    }

    //% block="getScreenSizex" color="#5C406C"
    export function getScreenSizex():number {
        return 0;
    }

    //% block="getScreenSizey" color="#5C406C"
    export function getScreenSizey():number {
        return 0;
    }

    /**
     * This is toggleDown
     */
    //% blockId="toggleDown" block="toggleDown" color=#A4839F
    export function toggleDown(): void {

        window.parent.postMessage("=toggleDown=", "*");
    }

    /**
     * This is getLineFromFile
     */
    //% blockId="getLineFromFile" block="get line %x from file %y" color=#91463D
    export function getLineFromFile(x:number, y:string): string {
        window.parent.postMessage(x+"=getLineFromFile="+y, "*");
        return null
    }

    /**
     * This is openfile
     */
    //% blockId="openfile" block="OpenFile %x" color=#E5CDC4
    export function openfile(x:string) {
        window.parent.postMessage(x+"=openFile=", "*");
    }

    /**
     * This is openURL
     */
    //% blockId="openURL" block="openURL %url" color=#E5CDC4
    export function openURL(url:string) {
        window.parent.postMessage(url+"=openURL=", "*");
    }

    /**
     * This is tap
     */
    //% blockId="tap" block="Tap %x" color=#5C406C
    export function tap(x:string){
        window.parent.postMessage(x+"=tap=", "*");
    }

    /**
     * This is double tap
     */
    //% blockId="doubletap" block="doubleTap %x %y" color=#8E2EC4
    export function doubletap(x:string,y:string){
        window.parent.postMessage(x+"=doubletap="+y, "*");
    }

    /**
     * This is string
     */
    //% blockId="string" block="%x" 
    export function getString(x:string):string{
        return x;
    }

    /**
     * This is comparison
     */
    //% blockId="comparison null" block="%x != null" color=#87F2FF
    export function comparisonNull(x:string):boolean{
        if (x==null){
            return false
        }
        else return true
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
    //% blockId=log block="log %msg"
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