import Config from "../helpers/config";
//
// export type BerryType = {
//     x: number,
//     y: number,
//     canvas: number,
//     config: Config,
//     randomPosition: () => {},
//
// };

export type BerryType = {
    x: number;
    y: number;
    canvas: any;
    config: Config;
    randomPosition: Function;
    draw: Function;
}
