const objectArray =()=>{

    // A. objects -a variable that holds multipe related values as key value pairs

    // defining obj's data type
    // 1. Using interfaces 
    interface Person{name:string;age:number;hobbies:string[];role:string[]}
    let person1:Person={name:'dave',age:21,hobbies:['reading','coding','cycling'],role:['student','statician','QA analyst']} 

    // 2.using type
    type Persons={
        name:string;age:number;hobbies:string[];
        role:string[];isMale:boolean
    }
    let person2:Persons={name:'dave',age:21,hobbies:['reading','coding','cycling'],role:['student','statician','QA analyst'],isMale:true} 

    // 3 Kemboi's method
    const Person:{name:string;age:number;hobbies:string[];role:string[],isMale:boolean}=
    {name:'dave',age:21,hobbies:['reading','coding','cycling'],role:['student','statician','QA analyst'],isMale:true}

    //TS automatically figures out the data types of a variable/obj thus no need to define them unless necessary
    const person={
        name:'Dave Karanja',
        age:22,
        hobbies:['reading','coding','cycling'],
        role:['student','statician','QA analyst']

    }
    // print info in the object
    console.log(`Bio Details: ${person.name} is ${person.age} years old and enjoys; ${person.hobbies} and his roles are;${person.role}`)

    // print object in JSON format, what we call dictionaries in python
    console.log(`Bio Details: ${JSON.stringify(person)}`)

    // JSON.dictionary output
    // Bio Details: { 
    //     "name":"Dave Karanja",
    //     "age":22,
    //     "hobbies":["reading","coding","cycling"],
    //     "role":["student","statician","QA analyst"]
    // }

    // objects can also store functions
    
    const car={
        make:'Toyota',
        model:'Camry',
        year: 2020,
        
        // methods/functions
        start: function (){
            console.log('Car Started')
        },

        stop: function (){
            console.log('Car Stopped')
        }

    }

    // print object
    console.log(`\nMy car is a ${car.make} ${car.model} ${car.year} model.`)
    // print out function in car object
    car.start()


    // B. Arrays - used to store a list or collection of items
    // arrays can be defined in 2 ways 

    // 1. using the T[] syntax, where T stands for datatype
    let colors:string[]=['red','green','blue']
    let digits:number[]=[1,2,3,4,5,6]

    // print out arrays
    console.log(`\nColors:${colors}\n`) //access values inside the array
    console.log(colors) //print out the array as a whole

    // 2. using the array<t> syntax
    let numbers:Array<number>=[1,2,3,4,5]
    console.log(`\n${numbers}\n`)
    console.log(numbers)

    // array methods - built in functions in JS and TS that let you manipulate, search or transform array

    // 1. push: adds new elements at end of array
    numbers.push(6)
    console.log(numbers)

    colors.push('yellow')
    console.log(colors)
    console.log(`\nColors after push: ${colors}`)

    // 2. length: checks size/number of items in an array
    console.log(colors.length)

    //3. accessig individual items in an array - indexing starts at 0

    console.log(`/nFirst color is ${colors[0]}`)
    console.log(`Last Color is ${colors[colors.length-1]}`)

    // 4. shifts: removes the first item
    const firstColorRemoved=colors.shift()
    console.log(`Colors after shift:${colors}`)

    // 5. unshift add items at start of array
    const addColor=colors.unshift('grey')
    console.log(`\nColors after unshift:${colors}`)

    // 6. pop: removes last item
    const removeLastColor=colors.pop()
    console.log(`\nColor removed is: ${removeLastColor}`)
    console.log(`\nRemaining colors are: ${colors}`)

    // 7. splice removes a specified item by index


    // C. Tuples: arrays that hold items of diff data types

    // i. define data types for tupule
    let regInfo:[string,number,string,boolean]=['dave',30,'pass123',true]
    // ii. let TS infer and figure out data type
    let regInfos=['dave',30, 'pass123',true]

    console.log(`\nReg info details: ${regInfo[0]}, is a ${regInfo[1]} year old man`)





}

export default objectArray;