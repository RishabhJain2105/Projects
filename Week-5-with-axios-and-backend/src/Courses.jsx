import { Button, Card, Typography, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signin");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/admin/courses", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses || []);
                } else {
                    navigate("/signin");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                navigate("/signin");
            } finally {
                setLoading(false);
            }
        };
        
        fetchCourses();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
                <Typography style={{ marginLeft: 20 }}>Loading courses...</Typography>
            </div>
        );
    }

    return (
        <div style={{ padding: 20, minHeight: "80vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                <Typography variant="h4">
                    All Courses
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate("/addcourse")}
                >
                    Add New Course
                </Button>
            </div>
            
            {courses.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <Typography variant="h6" color="textSecondary">
                        No courses available
                    </Typography>
                    <Button 
                        variant="contained" 
                        style={{ marginTop: 20 }}
                        onClick={() => navigate("/addcourse")}
                    >
                        Create Your First Course
                    </Button>
                </div>
            ) : (
                <Grid container spacing={3}>
                    {courses.map(course => (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

function CourseCard({ course }) {
    const navigate = useNavigate();
    
    return (
        <Card 
            style={{ 
                height: "100%", 
                padding: 20, 
                cursor: "pointer",
                transition: "transform 0.2s",
                '&:hover': {
                    transform: "scale(1.05)"
                }
            }}
            onClick={() => navigate("/course/" + course._id)}
        >
            <div style={{ marginBottom: 10 }}>
                <img 
                    src={course.imageLink || "https://via.placeholder.com/300x150"} 
                    style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }} 
                    alt={course.title}
                />
            </div>
            
            <Typography variant="h6" style={{ marginBottom: 8 }}>
                {course.title}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: 12 }}>
                {course.description}
            </Typography>
            
            <Typography variant="h6" color="primary">
                ₹{course.price}
            </Typography>
        </Card>
    );
}

export default Courses;
