"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// creating a user context
const UserContext = createContext()


export const useUserContext = () => {
    return useContext(UserContext)



}



export const UserProvider = ({ children }) => {
    // user from the local storage
    const userState = JSON.parse(localStorage.getItem("user")) || null
    const [user, setUser] = useState(user)

    useEffect(() => {
            localStorage.setItem("user", JSON.stringify(user))
    }, [user])
}