import { useState } from "react";
import { Heart, MapPin, Clock, Building, ArrowRight, Bookmark, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  const [savedInternships, setSavedInternships] = useState<number[]>([]);

  const mockRecommendations = [
    {
      id: 1,
      title: "Frontend Development Intern",
      company: "Tech Innovators Pvt Ltd",
      logo: "🚀",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹25,000/month",
      description: "Work on cutting-edge React applications and learn modern web development practices.",
      matchReason: "Perfect match for your React & JavaScript skills",
      tags: ["React", "JavaScript", "Web Development"],
      applyUrl: "#"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Analytics Pro Solutions",
      logo: "📊",
      location: "Delhi NCR", 
      duration: "4 months",
      stipend: "₹20,000/month",
      description: "Analyze large datasets and build predictive models using Python and machine learning.",
      matchReason: "Matches your Python & Data Analysis interests",
      tags: ["Python", "Data Analysis", "Machine Learning"],
      applyUrl: "#"
    },
    {
      id: 3,
      title: "Digital Marketing Intern",
      company: "Creative Media House",
      logo: "📱",
      location: "Mumbai",
      duration: "3 months",
      stipend: "₹15,000/month",
      description: "Create engaging content and manage social media campaigns for growing brands.",
      matchReason: "Great fit for your Communication & Marketing skills",
      tags: ["Marketing", "Communication", "Social Media"],
      applyUrl: "#"
    },
    {
      id: 4,
      title: "Software Development Intern",
      company: "StartUp Hub India",
      logo: "💻",
      location: "Remote",
      duration: "6 months", 
      stipend: "₹30,000/month",
      description: "Build scalable applications using modern technologies in a fast-paced startup environment.",
      matchReason: "Perfect for your Java & Problem Solving skills",
      tags: ["Java", "Full Stack", "Startups"],
      applyUrl: "#"
    },
    {
      id: 5,
      title: "UX/UI Design Intern",
      company: "Design Studio Pro",
      logo: "🎨",
      location: "Hyderabad",
      duration: "4 months",
      stipend: "₹18,000/month",
      description: "Create user-centered designs and prototypes for mobile and web applications.",
      matchReason: "Matches your Design & Creative interests",
      tags: ["Design", "UI/UX", "Prototyping"],
      applyUrl: "#"
    }
  ];

  const toggleSave = (internshipId: number) => {
    setSavedInternships(prev => 
      prev.includes(internshipId)
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 gradient-secondary rounded-md flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Your Recommendations</h1>
          </div>
          <Button variant="outline" size="sm">
            View Saved ({savedInternships.length})
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Perfect Matches
            </span>{" "}
            For You
          </h2>
          <p className="text-xl text-muted-foreground">
            We found {mockRecommendations.length} internships that match your profile perfectly
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          {mockRecommendations.map((internship, index) => (
            <Card 
              key={internship.id} 
              className="gradient-card border-0 shadow-soft hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Left: Company Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl">
                        {internship.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{internship.title}</h3>
                        <p className="text-muted-foreground">{internship.company}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-success">{internship.stipend}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {internship.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Description & Match */}
                  <div className="p-6 border-l border-r border-border/50 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">About the Role</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {internship.description}
                      </p>
                    </div>

                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-xs font-medium text-primary">Why this matches</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{internship.matchReason}</p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="p-6 space-y-4 flex flex-col justify-center">
                    <Button 
                      className="gradient-primary hover-glow w-full"
                      onClick={() => window.open(internship.applyUrl, '_blank')}
                    >
                      Apply Now
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>

                    <Button
                      variant={savedInternships.includes(internship.id) ? "default" : "outline"}
                      className={`w-full ${
                        savedInternships.includes(internship.id) 
                          ? "gradient-secondary" 
                          : "hover:bg-secondary/10"
                      }`}
                      onClick={() => toggleSave(internship.id)}
                    >
                      <Bookmark 
                        className={`mr-2 w-4 h-4 ${
                          savedInternships.includes(internship.id) ? "fill-current" : ""
                        }`} 
                      />
                      {savedInternships.includes(internship.id) ? "Saved" : "Save for Later"}
                    </Button>

                    <div className="text-center pt-2">
                      <span className="text-xs text-muted-foreground">
                        Apply through PM Internship Portal
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 hover-lift">
            Load More Recommendations
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {mockRecommendations.length} of 50+ available internships
          </p>
        </div>

        {/* Help Section */}
        <Card className="mt-16 gradient-hero text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Match?</h3>
            <p className="text-lg opacity-90 mb-6">
              Our team of career counselors is here to help you make the best choice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Schedule a Call
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Chat with Counselor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;