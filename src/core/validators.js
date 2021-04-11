 export class Validators { 

    static required(value = '') {
        return value && value.trim()
    }

    static minLength(min, max) {
        return value => {
            return value.trim().length >= min && value.trim().length <= max
        }
    }
    
}
