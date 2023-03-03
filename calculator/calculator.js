const calculator = {
    add: (a,b) => {
        console.log(a + b); // return
    },
    sub: (a,b) => {
        console.log(a-b);
    },
    mul: (a,b) => {
        console.log(a * b);
    },
    div: (a, b) => {
        console.log(a / b);
    },
    mod: (a,b) => {
        console.log(a%b);
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
        calculator.add(a,b);
        // break;
    case(2):
        calculator.sub(a,b);
        //break;
    case(3):
        calculator.mul(a,b);
        // break;
    case(4):
        calculator.div(a,b);
        //break;
    case(5):
        calculator.mod(a,b);
        //break;
    default:
        console.log("Enter proper values... ");
        break;
}
