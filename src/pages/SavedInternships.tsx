import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, MapPin, Clock, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const SavedInternships = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [savedInternships, setSavedInternships] = useState([
    {
      id: "1",
      title: "Frontend Developer Intern",
      organization: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      duration: "3 months",
      stipend: "₹25,000/month",
      description: "Join our dynamic team as a Frontend Developer Intern and gain hands-on experience with modern web technologies.",
      tags: ["React", "JavaScript", "CSS"],
      savedAt: "2024-01-10"
    },
    {
      id: "2", 
      title: "Digital Marketing Intern",
      organization: "Growth Marketing Co",
      location: "Mumbai, Maharashtra",
      duration: "6 months",
      stipend: "₹20,000/month",
      description: "Learn digital marketing strategies including SEO, social media marketing, and analytics.",
      tags: ["SEO", "Social Media", "Analytics"],
      savedAt: "2024-01-08"
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const removeSaved = (internshipId: string) => {
    setSavedInternships(prev => prev.filter(internship => internship.id !== internshipId));
  };

  const handleApply = (internshipId: string) => {
    navigate(`/apply/${internshipId}`);
  };

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
              <Bookmark className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Saved Internships</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {savedInternships.length === 0 ? (
          <Card className="gradient-card border-0 shadow-soft text-center p-12">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Saved Internships</h2>
            <p className="text-muted-foreground mb-6">
              You haven't saved any internships yet. Browse recommendations to find opportunities you're interested in.
            </p>
            <Button 
              onClick={() => navigate("/recommendations")}
              className="gradient-primary hover-glow"
            >
              Browse Internships
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Your Saved Internships ({savedInternships.length})
              </h2>
            </div>

            <div className="space-y-4">
              {savedInternships.map((internship) => (
                <Card key={internship.id} className="gradient-card border-0 shadow-soft hover-lift">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Company Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{internship.title}</h3>
                          <p className="text-muted-foreground">{internship.organization}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{internship.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{internship.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span>{internship.stipend}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description & Tags */}
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {internship.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {internship.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Saved on {new Date(internship.savedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-3">
                        <Button
                          onClick={() => handleApply(internship.id)}
                          className="gradient-primary hover-glow flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Apply Now</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => removeSaved(internship.id)}
                          className="flex items-center space-x-2"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedInternships;