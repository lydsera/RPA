/**
 * Basic functionalities.
 */
//% color=#00BCD4 weight=100
namespace turtle {

}

//% color=#D4BC00 weight=95
namespace hare {

}

/**
 * Control flow
 */
//% color=#FF5722 weight=90
namespace control {

}

//% weight=0 color=#3CB371 icon="\uf0ad" block="工具-213"
namespace tools {
    /**
    * 計算長方形面積，並回傳
    */
    //% blockId="areaOfRectangle" block="area of rectangle length %length|width %width"
    //% blockGap=2 weight=0 blockExternalInputs=true
    export function areaOfRectangle(length: number, width: number): number {
        return length * width
    }
    /**
    * 計算長方形面積，不回傳，只顯示在LED
    */
    //% blockId="ledOfRectangle" block="show area of rectangle length %length|width %width"
    //% blockGap=2 weight=1
    export function ledOfRectangle(length: number, width: number): void {

    }

}


