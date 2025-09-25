import specialTypes from "./2-specialtypes"
import variables from "./1-variables" 
import objectArray from "./3-objects-arrays"
import myInterface from "./4.interface"


console.log("Hello World")
console.log(20+20)

// creating a sum function that takes 2 variable a and b then sums them

const sum=(a:number, b:number):number=>{
    return a+b
}

// call function
console.log(sum(2,4))


variables()

specialTypes()

objectArray()

myInterface() 

