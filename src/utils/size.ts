
/**
 * @class Parses a CSS size value and converts it to pixels.
 */
export class Size {
    size: string | number

    constructor(size: string | number) {
        this.size = size
    }

    static build(size: string | number) {
        return new Size(size)
    }

    toPx() {
        if (typeof this.size === "number") {
            return this.size
        }

        const numericValue = parseFloat(this.size)
        if (isNaN(numericValue)) {
            return null;
        }

        if (this.size.endsWith('px')) {
            return numericValue;
        } else if (this.size.endsWith('rem')) {
            return numericValue * parseFloat(getComputedStyle(document.documentElement).fontSize);
        } else if (this.size.endsWith('em')) {
            return numericValue * parseFloat(getComputedStyle(document.body).fontSize);
        } else if (this.size.endsWith('vw')) {
            return (numericValue / 100) * window.innerWidth;
        } else if (this.size.endsWith('vh')) {
            return (numericValue / 100) * window.innerHeight;
        }

        return null;
    }
}