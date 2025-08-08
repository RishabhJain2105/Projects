import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!email || !password) {
            setMessage("Please fill in both email and password");
            return;
        }

        setLoading(true);
        setMessage("");
        
        try {
            const response = await axios.post("http://localhost:3001/admin/login", {
                username: email,
                password: password
            });
            
            const token = response.data.token;
            localStorage.setItem("token", token);
            setMessage("Login successful! Redirecting...");
            
            setTimeout(() => {
                navigate("/courses");
            }, 1500);
            
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                    Welcome to Coursera Admin. Sign in below
                </Typography>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                        value={email}
                        disabled={loading}
                        style={{ marginBottom: 10 }}
                    />
                    
                    <TextField
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        disabled={loading}
                        style={{ marginBottom: 20 }}
                    />
                    
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={handleSignin}
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                    
                    {message && (
                        <Typography 
                            style={{
                                marginTop: 10, 
                                textAlign: "center",
                                color: message.includes("successful") ? "green" : "red"
                            }}
                        >
                            {message}
                        </Typography>
                    )}

                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Button 
                                color="primary" 
                                onClick={() => navigate("/signup")}
                                style={{ textTransform: 'none' }}
                            >
                                Sign Up
                            </Button>
                        </Typography>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Signin;
