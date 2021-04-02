export class Algebra {
    static elementWiseMult(...data: number[][]): number[] {
        const len: number = data[0].length;
        const results: number[] = [];
        for (let eleIdx: number = 0; eleIdx < len; eleIdx++) {
            let rowWiseMult = 1;
            for (let arrIdx: number = 0; arrIdx < data.length; arrIdx++) {
                rowWiseMult *= data[arrIdx][eleIdx];
            }
            results.push(rowWiseMult);
        }
        return results;
    }

    static elementWisePower(data: number[], power: number): number[] {
        const len: number = data.length;
        const results: number[] = [];
        for (let eleIdx: number = 0; eleIdx < len; eleIdx++) {
            results.push(data[eleIdx] ^ power);
        }
        return results;
    }
}


export class Calculus {
    static sum(...data: number[]): number {
        let total: number = 0;
        for(let num of data) {
            total += num;
        }
        return total;
    }
}
