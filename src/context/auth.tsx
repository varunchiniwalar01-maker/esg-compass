import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
    companyName: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (companyName: string, name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // We'll need this for redirects

    // Check for persisted user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("esg_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem("esg_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser: User = {
                        id: "1",
                        name: "Demo User",
                        email: email,
                        companyName: "Demo Company",
                    };
                    setUser(mockUser);
                    localStorage.setItem("esg_user", JSON.stringify(mockUser));
                    setIsLoading(false);
                    resolve();
                } else {
                    setIsLoading(false);
                    reject(new Error("Invalid credentials"));
                }
            }, 1000);
        });
    };

    const signup = async (companyName: string, name: string, email: string, password: string) => {
        setIsLoading(true);
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (email && password && companyName && name) {
                    const mockUser: User = {
                        id: "1",
                        name: name,
                        email: email,
                        companyName: companyName,
                    };
                    setUser(mockUser);
                    localStorage.setItem("esg_user", JSON.stringify(mockUser));
                    setIsLoading(false);
                    resolve();
                } else {
                    setIsLoading(false);
                    reject(new Error("Invalid details"));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("esg_user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
