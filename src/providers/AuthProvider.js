import React, {useState, useEffect, createContext} from "react";
import {getAccessTokenApi, getRefreshTokenApi, refreshAcessTokenApi, logout} from "../api/auth";


export const AuthContext = createContext();

export default function AuthProvider(props){
    const {children} = props;
    const [user, setUser] = useState({
        user: null,
        isLoading:true
    });
    //TO DO: VER BIEN COMO ES EL FUNCIONAMIENTO
    return<AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
