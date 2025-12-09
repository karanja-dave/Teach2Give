import {Config} from 'jest';

const config:Config ={
    preset:"ts-jest", //define preprocessor used for TS compilation
    testEnvironment:"node", //specifies enviroment for test:sets nodejs env
    verbose:true, //shows individula test results : provides details for each tests output

    // collecting coverage 
    collectCoverage:true,
    // dir where report is produced
    coverageDirectory:"coverage",
    // specify where you want covergae to be reproduce 
    collectCoverageFrom:[
        '<rootDir>/src/**/*.ts'
    ]

}

export default config