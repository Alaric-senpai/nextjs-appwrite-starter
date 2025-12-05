import {Models} from 'node-appwrite'
import { createContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
    user:Models.User | null;
    role: 'admin'|'client';
    isLoading:boolean;
    isAuthenticated:boolean
    logout: ()=>Promise<void>
}


const AuthContext = createContext<AuthContextType| null>(null)


export const AuthProvider = ({children}: {children:React.ReactNode})=>{

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [role, setUserRole] = useState<'admin'|'client'>('client')

    const [user, setUser]=useState<Models.User| null>(null)

    const logout = async()=>{
        // logout logic will go here later
    }
    
      useEffect(() => {
        // Your effect code here
      }, []);

      const value:AuthContextType = useMemo(()=>(
            {
                user,
                logout: logout,
                isLoading,
                isAuthenticated,
                role
            }
        ), [user, isLoading, isLoading, role])

    return (
        <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        </>
    )
}