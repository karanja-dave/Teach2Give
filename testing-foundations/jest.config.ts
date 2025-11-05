import {Config} from 'jest';

const config:Config ={
    preset:"ts-jest", //define preprocessor used
    testEnvironment:"node", //specifies enviroment for test:sets nodejs env
    verbose:true //shows individula test results : provides details for each tests output
}

export default config