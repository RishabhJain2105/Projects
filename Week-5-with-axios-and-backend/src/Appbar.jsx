import { Typography, Button, AppBar, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:3001/admin/me", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUserEmail(data.username);
                } else {
                    localStorage.removeItem("token");
                    setUserEmail(null);
                }
            } catch (error) {
                console.log("Auth check failed:", error);
                localStorage.removeItem("token");
                setUserEmail(null);
            }
        };
        
        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserEmail(null);
        navigate("/signin");
    };

    if (userEmail) {
        return (
            <AppBar position="static" style={{ marginBottom: 20 }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        style={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => navigate("/courses")}
                    >
                        Coursera Admin
                    </Typography>

                    <Button 
                        color="inherit" 
                        onClick={() => navigate("/courses")}
                        style={{ marginRight: 10 }}
                    >
                        Courses
                    </Button>

                    <Button 
                        color="inherit" 
                        onClick={() => navigate("/addcourse")}
                        style={{ marginRight: 10 }}
                    >
                        Add Course
                    </Button>

                    <Typography style={{ marginRight: 15 }}>
                        Welcome, {userEmail}
                    </Typography>

                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar position="static" style={{ marginBottom: 20 }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Coursera Admin
                </Typography>

                <Button 
                    color="inherit" 
                    onClick={() => navigate("/signup")}
                    style={{ marginRight: 10 }}
                >
                    Sign Up
                </Button>

                <Button 
                    color="inherit" 
                    onClick={() => navigate("/signin")}
                    variant="outlined"
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;
