

const specialTypes=()=>{
    
    // type never
    const throwError = ():never =>{
        throw new Error ('This is an error')
        
    }

    const infiniteLoop = () =>{
        while (true) {}
        }

    // type any -allows variable to take any data type
    
    let a:any=45 // variable a is number
    console.log(`Var a is:${a}`)

    a='dave' //variable a is now a string
    a=true  //variable a is now a boolean


    // type undefined and null
    // type undefined allows the variable not be defined; has not data type nor value
    let b:undefined
    console.log(b)

    // type null allows variable to have empty values
    let c:null=null
    console.log(c)


    

}

export default specialTypes