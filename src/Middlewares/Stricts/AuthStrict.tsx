export const isLogued = ():boolean => {
    return localStorage.getItem("session") !== null && localStorage.getItem("session") !== "";
}

export const isAdmin = ():boolean => {
    let sessionInfo:String | null = localStorage.getItem("session");

    if(sessionInfo){
        let dataInfo:any = JSON.parse(String(sessionInfo));

        return dataInfo.role === "admin";
    }

    return false;
}

export const isUser = ():boolean => {
    let sessionInfo:String | null = localStorage.getItem("session");

    if(sessionInfo){
        let dataInfo:any = JSON.parse(String(sessionInfo));

        return dataInfo.role === "user";
    }

    return false;
}