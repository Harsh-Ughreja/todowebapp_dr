const UPPERCASE_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARACTER = 'abcdefghijklmnopqrstuvwxyz';
const DIGIT = '1234567890';
const SPACE = ' ';
const DOT = '.';
const UNDERSCORE = '_';

export const validateUserName = (userName) => {
    if(userName == ''){
         return [false, "Username can not be empty"];
    }
    for(let i=0;i<userName.length;i++){
         if(!(UPPERCASE_CHARACTER+LOWERCASE_CHARACTER+DIGIT+UNDERSCORE).includes(userName[i])){
              return [false, "Username only contain uppercase and lowercase character, underscore and digit"]
         }
    }
    return [true, "Username is valid"];
}


export const validateEmailAddress = (email) => {
    if(email == ''){
         return [false, "Email can not be empty"];
    }
    if(!email.includes('.') || !email.includes('@')){
         return [false, "Invalid email address"]
    }
    return [true, "Email is valid"];
}

export const validatePassword = (password) => {
    if(password == ''){
         return [false, "Password can not be empty"];
    }
    if(password.length < 8){
         return [false, "Password must contain 8 character"];
    }
    if(password.includes(' ')){
         return [false, "Password can not contain space"];
    }
    return [true, "Password is valid"];
}