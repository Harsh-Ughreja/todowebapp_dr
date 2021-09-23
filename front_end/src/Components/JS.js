

export const getInDateFormat = (date_obj) => {

    console.log(date_obj);
    const d = date_obj;
    const year=d.getFullYear();
    const month=d.getMonth();
    const date=d.getDate();
    return year+"-"+getFullNumber(month)+"-"+getFullNumber(date);
}

export const getFullNumber = (number) => {
    
    // if(number.length == 1){
    //     return '0'+number;
    // }
    // else{
    //     return number
    // }

    if(number <= 9){
        return '0'+number;
    }
    else{
        return number;
    }
}
