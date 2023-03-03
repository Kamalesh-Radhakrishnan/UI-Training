const calculator = {
    add: (a,b) => {
        return(a+b);
    },
    sub: (a,b) => {
        return(a-b);
    },
    mul: (a,b) => {
        return(a*b);
    },
    div: (a, b) => {
        return(a/b);
    },
    mod: (a,b) => {
        return(a%b);
    }
}

let a = 10;
let b = 20;
console.log("1 ==> add");
console.log("2 ==> subtract");
console.log("3 ==> multiply");
console.log("4 ==> division (Quotient)");
console.log("5 ==> division (Remainder)");
console.log("6 ==> Quit");
let c = 3;
switch(c){
    case(1):
        console.log(calculator.add(a,b));
        break;
    case(2):
        console.log(calculator.sub(a,b));
        break;
    case(3):
        console.log(calculator.mul(a,b));
        break;
    case(4):
        console.log(calculator.div(a,b));
        break;
    case(5):
        console.log(calculator.mod(a,b));
        break;
    default:
        console.log("Enter proper values... ");
        break;
}
