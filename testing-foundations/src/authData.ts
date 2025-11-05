

export interface IAuthData{
    usernameToLower:string;       //lowercase of usernames
    usernameCharacters:string[];  //splits username into individaul characters and stores in an array
    userDetails:Object|undefined; //otther use details ie like their role
    isAuthenticated:boolean;
}