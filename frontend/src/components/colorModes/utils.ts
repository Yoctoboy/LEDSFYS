export interface ColorValues {
    red: number;
    green: number;
    blue: number;
}

export const toColorString = (colorValues: ColorValues) => {
    return (
        '#' +
        colorValues.red.toString(16).padStart(2, '0') +
        colorValues.green.toString(16).padStart(2, '0') +
        colorValues.blue.toString(16).padStart(2, '0')
    ).toLocaleUpperCase();
};
