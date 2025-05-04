import { SERVER_URL } from "../../common/configs/config";
import { login as LoginData } from "../ts/AuthTypes";

export const login = async (loginData : LoginData) => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/login`,{
            method : 'POST', headers: { "Content-Type": "application/json"},
            body : JSON.stringify(loginData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }

    } catch (err : any) {
        return { status : false, message : err.message }
    }
}
