
import {authenticateUser, product, UserNameToLowerCase} from '../src/BasicUtils'


// where you have all tests for a specified funtion 
describe('BasicUtils  test suite',()=>{
    //what are you testing
    test("Should return product of 2 and 3",()=>{ 
        const actual = product(2,3) 
        const expected = 6
        
        // equality matchers 
        expect(actual).toBe(expected)    // check equality of actual vs expected 
        expect(actual).not.toBe(9)      // check inequality of actual vs expected 
        expect(actual).toEqual(6)      // another way to check equality 


        // relational matchers 
        expect(actual).toBeLessThan(10)             //check that actual is less than 10
        expect(actual).toBeGreaterThan(5)          //check that actual is greater than 5
        expect(actual).toBeGreaterThanOrEqual(6)  //check that actual is less than or equal to 6
        expect(actual).toBeCloseTo(6.0)          //check that actual is close to 6.0


    }) 

    it("User authenticated test",()=>{
        // Arrange 
        const sut = authenticateUser;
        // Act 
        const actual = sut("deveLOPER",'dev')
        // Assertion 
        expect(actual.usernameToLower).toBe("developer")
        expect(actual.usernameCharacters).toEqual(['d','e','v','e','L','O','P','E','R'])
        // expect(actual.usernameCharacters).toBe(['d','e','v','e','L','O','P','E','R'])
        expect(actual.usernameCharacters).toContain("L")
        expect(actual.userDetails).toEqual({name:'developer',role:'admin'})
        expect(actual.isAuthenticated).toBeTruthy()

        expect(actual.userDetails).toBeDefined(); 
        // expect(actual.userDetails).not.toBeDefined();
        // expect(actual.userDetails).not.toBeNull();
    })
})


// Best practices to write unit tests:

describe("FIRTS-U Principle test suite",()=>{ //describe.only :only this test suite is run
    it.skip("Should return the product of 4&5",()=>{ //it.skip: this test is skipped 
        // Arrange 
        const actual=product(5,4);
        // Act 
        const expected=20;
        // Assertion  
        expect(actual).toBe(expected)
    })

    // a nested describe block 
    describe("User Authentication Test",()=>{
        it("should convert username to lowercase",()=>{
            // Arrange 
            const sut = authenticateUser;
            // Act 
            const actual = sut("deveLOPER",'dev')
            // Assert 
            expect(actual.usernameToLower).toBe("developer")
        })
        it("should split username into characters array",()=>{
            // Arrange 
            const sut = authenticateUser;
            // Act 
            const actual = sut("deveLOPER",'dev')
            // Assert
            expect(actual.usernameCharacters).toEqual(['d','e','v','e','L','O','P','E','R']) 
        })
        it("should contain specific characters in usernameCharacters array",()=>{
            // Arrange 
            const sut = authenticateUser;
            // Act 
            const actual = sut("deveLOPER",'dev')
            // Assert 
            // expect(actual.usernameCharacters).toContain("L")
            expect(actual.usernameCharacters).toEqual(expect.arrayContaining(['L','O','P']));
        })
        it("should authenticate a valid user",()=>{
            // Arrange 
            const sut = authenticateUser;
            // Act 
            const actual = sut("deveLOPER",'dev')
            // Assert 
            expect(actual.isAuthenticated).toBeTruthy();
            expect(actual.isAuthenticated).not.toBeFalsy()
        })
    })
})

// Jest hooks - beforeAll, afterAll, beforeEach, afterEach
describe("JEST hooks test suite",()=>{
    // define types for username 
    let username:string

    // before any test we want  see the defined string printed in the console 
    beforeAll(()=>{
        console.log("Starting JEST hooks test suite...");
    })
    // before each and every `it()`test block 
    beforeEach(()=>{
        username="deveLOPER";
        console.log("username beforeEach",username);
    })
    // after each and every `it()`test block 
    afterEach(()=>{
        username=""
        console.log("username afterEach",username);
    })
    afterAll(()=>{
        console.log("Finished JEST hooks test suite...");
    })

    it("converts username to lowercase",()=>{
        expect(UserNameToLowerCase(username)).toBe('developer')
    })
    it.skip("throws error when username is empty",()=>{
        expect(()=>UserNameToLowerCase("")).toThrow("Username cannot be Empty")
    })

})


// when you want to test same sample over and over agin: instead on 1 SVGFEDisplacementMapElement, you use multiple samples 
describe("Parameterised Tests",()=>{
    test.each([
        [3,4,12],
        [3,6,18],
        [7,8,56],
        [2,9,18]
    ])("Product (%i,%i) should return %i",(a,b,expected)=>{
        expect(product(a,b)).toBe(expected)
    });

    it.each([
        ["deveLOPER","developer"],
        ["KEMBOI","kemboi"],
        ["JOHNDOE","johndoe"],
        ["JaneDoe","janedoe"]
    ])("UserNameToLowerCase(%s) should return %s",(input,expected)=>{
        expect(UserNameToLowerCase(input)).toBe(expected)
    })
})
