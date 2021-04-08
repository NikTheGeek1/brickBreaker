
class Randomness {
    
    static randomInt(from: number, to: number):number {
        return Math.floor(Math.random() * ((to+1) - from) + from); 
    }
}

export default Randomness;