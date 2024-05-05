export function checkHexadecimal(input: string) {
    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);

        //check if char is between 0 and 9 or A and F
        if (!(charCode >= 48 && charCode <= 57) && !(charCode >= 65 && charCode <= 70)) {
            return false;
        }
    }

    return true;
}