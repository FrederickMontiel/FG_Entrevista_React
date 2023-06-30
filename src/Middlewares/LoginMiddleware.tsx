import { GuardMiddleware } from "react-router-guarded-routes"
import {isLogued, isAdmin, isUser} from "../Middlewares/Stricts/AuthStrict"

const isLoguedMiddleware: GuardMiddleware = (to: any, from: any, next: any, { route }: any) => {
    if(isLogued()){
        if(localStorage.getItem("session") === ""){
            localStorage.removeItem("session");
        }
        next();
    }
}

const isNotLoguedMiddleware: GuardMiddleware = (to: any, from: any, next: any, { route }: any) => {
    if(!isLogued()){
        next();
    }
}

const isAdminLoggedMiddleware: GuardMiddleware = (to: any, from: any, next: any, { route }: any) => {
    if(isAdmin()){
        next();
    }
}

const isUserLoggedMiddleware: GuardMiddleware = (to: any, from: any, next: any, { route }: any) => {
    if(isUser()){
        next();
    }
}

export const authMiddleware = {
    admin: [isLoguedMiddleware, isAdminLoggedMiddleware],
    user: [isLoguedMiddleware, isUserLoggedMiddleware],
    logued: [isLoguedMiddleware],
    noLogued: [isNotLoguedMiddleware]
}