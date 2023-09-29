
/**
 * @class Color utilities
 */
export class Color {
    value: string

    constructor(value: string) {
        this.value = value
    }

    static build(value: string) {
        return new Color(value)
    }

    logShade(percentage: number) {
        var i=parseInt,r=Math.round,[a,b,c,d]=this.value.split(","),P=Number(percentage<0),t=P?0:percentage*255**2,P=P?1+percentage:1-percentage;
        return"rgb"+(d?"a(":"(")+r((P*i(a[3]=="a"?a.slice(5):a.slice(4))**2+t)**0.5)+","+r((P*i(b)**2+t)**0.5)+","+r((P*i(c)**2+t)**0.5)+(d?","+d:")");
    }
}