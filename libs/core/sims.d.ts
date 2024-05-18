// Auto-generated from simulator. Do not edit.
declare namespace hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    //% shim=hare::hop
    function hop(hop: Hop, color: number): void;

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    //% shim=hare::onLand
    function onLand(handler: (height: number, more: number, most: number) => void): void;

}
declare namespace rpa {
    /**
     * This is move
     */
    //% blockId="moveTo" block="moveTo %x  %y" color="#FF93C4"
    //% shim=rpa::moveTo
    function moveTo(x: number, y: number): void;

    /**
     * This is click
     */
    //% blockId="click" block="click" color="#FF8135"
    //% shim=rpa::click
    function click(): void;

    /**
     * This is input
     */
    //% blockId="input" block="input %x" color="#FFF609"
    //% shim=rpa::input
    function input(x: string): void;

    /**
     * This is enter
     */
    //% blockId="enter" block="enter" color="#249CA3"
    //% shim=rpa::enter
    function enter(): void;

    //% block="getInputxPos" color="#78DC52"
    //% shim=rpa::getInputxPos
    function getInputxPos(): number;

    //% block="getInputyPos" color="#78DC52"
    //% shim=rpa::getInputyPos
    function getInputyPos(): number;

    //% block="getScreenSizex" color="#5C406C"
    //% shim=rpa::getScreenSizex
    function getScreenSizex(): number;

    //% block="getScreenSizey" color="#5C406C"
    //% shim=rpa::getScreenSizey
    function getScreenSizey(): number;

    /**
     * This is toggleDown
     */
    //% blockId="toggleDown" block="toggleDown" color=#A4839F
    //% shim=rpa::toggleDown
    function toggleDown(): void;

    /**
     * This is getLineFromFile
     */
    //% blockId="getLineFromFile" block="get line %x from file %y" color=#91463D
    //% shim=rpa::getLineFromFile
    function getLineFromFile(x: number, y: string): string;

    /**
     * This is openfile
     */
    //% blockId="openfile" block="OpenFile %x" color=#E5CDC4
    //% shim=rpa::openfile
    function openfile(x: string): void;

    /**
     * This is openURL
     */
    //% blockId="openURL" block="openURL %url" color=#E5CDC4
    //% shim=rpa::openURL
    function openURL(url: string): void;

    /**
     * This is tap
     */
    //% blockId="tap" block="Tap %x" color=#5C406C
    //% shim=rpa::tap
    function tap(x: string): void;

    /**
     * This is double tap
     */
    //% blockId="doubletap" block="doubleTap %x %y" color=#8E2EC4
    //% shim=rpa::doubletap
    function doubletap(x: string, y: string): void;

    /**
     * This is string
     */
    //% blockId="string" block="%x"
    //% shim=rpa::getString
    function getString(x: string): string;

    /**
     * This is comparison
     */
    //% blockId="comparison null" block="%x != null" color=#87F2FF
    //% shim=rpa::comparisonNull
    function comparisonNull(x: string): boolean;

}
declare namespace turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% blockId=sampleForward block="forward %steps"
    //% shim=turtle::forwardAsync promise
    function forward(steps: number): void;

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=turtle::turnAsync promise
    function turn(direction: Direction, angle: number): void;

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    //% shim=turtle::onBump
    function onBump(handler: () => void): void;

}
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //% blockId=log block="log %msg"
    //% shim=console::log
    function log(msg: string): void;

}
    /**
     * A ghost on the screen.
     */
    //%
    declare class Sprite {
        /**
         * The X-coordiante
         */
        //%
        //% shim=.x
        public x: number;

        /**
         * The Y-coordiante
         */
        //%
        //% shim=.y
        public y: number;

        /**
         * Move the thing forward
         */
        //%
        //% shim=.forwardAsync promise
        public forward(steps: number): void;

    }
declare namespace sprites {
    /**
     * Creates a new sprite
     */
    //% blockId="sampleCreate" block="createSprite"
    //% shim=sprites::createSprite
    function createSprite(): Sprite;

}

// Auto-generated. Do not edit. Really.
