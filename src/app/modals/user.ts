export interface IUser{
    login:string,
    email?: string,
    password?:string,
    token?:string,
    id?:string,
    registrationDate?:string,
    bookmarks?: Array<any>
} 