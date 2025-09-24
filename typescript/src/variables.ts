

const variables =() => { //arrow function
    // variables 

// 1.integers

let a:number=10  // method 1 of defining a variable
console.log(a)   //print varaibale
console.log('Value of a is:',a)

a=30 //method 2 of defining avariable
console.log('After reassigning value of a is now:', a)

const b:number=20 //method 3 of defining a variable
console.log('Value of b is:',b)
console.log("The 'const' method does not allow reassigning of variable values, you can use it when you dont values changed like the ID of a person")

var c=100 //
console.log("The value of c is:",c)

c=203
console.log("Now the value of c is:",c)
// 2. strings

// new JS: let na const - has ES6 features
// old JS: var - no ES6 features

let name:string='dave'
console.log(name)

// 3 boolean
let isMale:boolean=true
console.log(isMale)

// 4 arrays
let evenNumbers:number[]=[2,4,6,8]
console.log(evenNumbers)

console.log(`Type of a: ${typeof a}, number:${a}`)
console.log(`Type of Even Numbers: ${typeof evenNumbers}, even numbers: ${evenNumbers}`)
console.log(`Type of isMale: ${typeof isMale}`)
} 

export default variables



