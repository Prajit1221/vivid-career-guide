import { useState } from "react";
import { ArrowLeft, Play, Clock, Star, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Programming", "Design", "Marketing", "Business", "Data Science"];
  
  const courses = [
    {
      id: "1",
      title: "React.js Fundamentals",
      instructor: "Tech Academy",
      duration: "4 hours",
      rating: 4.8,
      students: 1234,
      category: "Programming",
      description: "Learn the basics of React.js and build your first component-based application.",
      thumbnail: "/placeholder.svg",
      price: "Free",
      level: "Beginner",
      videos: [
        { title: "Introduction to React", duration: "15 min" },
        { title: "Components and Props", duration: "20 min" },
        { title: "State and Lifecycle", duration: "25 min" },
        { title: "Handling Events", duration: "18 min" }
      ]
    },
    {
      id: "2",
      title: "UI/UX Design Principles",
      instructor: "Design Studio",
      duration: "6 hours",
      rating: 4.9,
      students: 890,
      category: "Design",
      description: "Master the fundamentals of user interface and user experience design.",
      thumbnail: "/placeholder.svg",
      price: "₹499",
      level: "Intermediate",
      videos: [
        { title: "Design Thinking Process", duration: "22 min" },
        { title: "Color Theory and Typography", duration: "28 min" },
        { title: "Wireframing and Prototyping", duration: "35 min" },
        { title: "User Testing Methods", duration: "30 min" }
      ]
    },
    {
      id: "3",
      title: "Digital Marketing Essentials",
      instructor: "Marketing Pro",
      duration: "5 hours",
      rating: 4.7,
      students: 2156,
      category: "Marketing",
      description: "Comprehensive guide to digital marketing strategies and tools.",
      thumbnail: "/placeholder.svg",
      price: "₹799",
      level: "Beginner",
      videos: [
        { title: "Introduction to Digital Marketing", duration: "20 min" },
        { title: "SEO Fundamentals", duration: "30 min" },
        { title: "Social Media Marketing", duration: "25 min" },
        { title: "Email Marketing Strategies", duration: "22 min" }
      ]
    },
    {
      id: "4",
      title: "Python for Data Science",
      instructor: "Data Institute",
      duration: "8 hours",
      rating: 4.8,
      students: 1567,
      category: "Data Science",
      description: "Learn Python programming specifically for data analysis and visualization.",
      thumbnail: "/placeholder.svg",
      price: "₹1299",
      level: "Intermediate",
      videos: [
        { title: "Python Basics for Data Science", duration: "40 min" },
        { title: "NumPy and Pandas", duration: "45 min" },
        { title: "Data Visualization with Matplotlib", duration: "35 min" },
        { title: "Machine Learning Intro", duration: "50 min" }
      ]
    }
  ];

  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Recommended Courses</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skill Development Courses</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="gradient-card border-0 shadow-soft hover-lift overflow-hidden">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="gradient-primary">{course.price}</Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{course.rating}</span>
                    <span className="text-muted-foreground">({course.students})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Course Content:</h5>
                  {course.videos.slice(0, 2).map((video, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Play className="w-3 h-3 text-primary" />
                        <span className="line-clamp-1">{video.title}</span>
                      </div>
                      <span className="text-muted-foreground">{video.duration}</span>
                    </div>
                  ))}
                  {course.videos.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{course.videos.length - 2} more videos
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 gradient-primary hover-glow">
                    Start Learning
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No courses found */}
        {filteredCourses.length === 0 && (
          <Card className="gradient-card border-0 shadow-soft text-center p-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground">
              No courses available in the selected category. Try selecting a different category.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;