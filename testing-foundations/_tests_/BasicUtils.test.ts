
import {authenticateUser, product} from '../src/BasicUtils'


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