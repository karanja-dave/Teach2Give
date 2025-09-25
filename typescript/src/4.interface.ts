const myInterface =() =>{

    interface Bio {
        name:string,
        age:number,
        greet:()=>void  //allows you to add functions in objects when defining data types
    }

    // appending Bio data types to employee data types using extend

    interface Employee extends Bio{
        employed:number,
        position:string
    }

    const employee:Employee={
        name:'Dave Karanja',
        age:25,
        employed:1234,
        position:'QA Analyst',
        greet (){
            console.log(`Hey my name is ${this.name} and I'm ${this.position}`)
        }
    }

    console.log(`Employee info is:${JSON.stringify(employee)}`)

    console.log(`\nDetails:${employee.name} is aged ${employee.age}, and works as a ${employee.position}`)

}

export default myInterface