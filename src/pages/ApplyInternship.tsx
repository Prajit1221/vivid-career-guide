import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Send, MapPin, Clock, DollarSign, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Internship, applyForInternship } from "@/lib/api";

const ApplyInternship = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token, isAuthenticated } = useAuth();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Mock internship data for demonstration
    // In real app, fetch from API using internshipId
    setInternship({
      id: internshipId || "1",
      title: "Frontend Developer Intern",
      organization: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      description: "Join our dynamic team as a Frontend Developer Intern and gain hands-on experience with modern web technologies including React, TypeScript, and modern CSS frameworks.",
      required_skills: ["React", "JavaScript", "HTML", "CSS"],
      preferred_skills: ["TypeScript", "Node.js", "Git"],
      duration: "3 months",
      stipend: "₹25,000/month",
      application_deadline: "2024-01-15",
      openings: 2,
      employment_type: "Internship",
      perks: ["Certificate", "Flexible working hours", "Mentorship"],
      responsibilities: [
        "Develop responsive web applications",
        "Collaborate with design team",
        "Write clean, maintainable code",
        "Participate in code reviews"
      ],
      posted_by: "hr@techcorp.com",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    });
  }, [internshipId, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !internship) return;

    setIsLoading(true);

    try {
      await applyForInternship({
        internship_id: internship.id,
        cover_letter: coverLetter,
      }, token);

      toast({
        title: "Application submitted successfully!",
        description: "Your application has been sent to the employer.",
      });

      navigate("/recommendations");
    } catch (error) {
      toast({
        title: "Application failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!internship) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Apply for Internship</h1>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Internship Details */}
          <Card className="gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">{internship.title}</CardTitle>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building className="w-4 h-4" />
                <span>{internship.organization}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">{internship.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">{internship.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm">{internship.stipend}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">{internship.openings} openings</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground text-sm">{internship.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.required_skills.map((skill, index) => (
                    <Badge key={index} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Perks</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.perks.map((perk, index) => (
                    <Badge key={index} variant="outline">
                      {perk}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card className="gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write a brief cover letter explaining why you're interested in this internship and what makes you a good fit..."
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium mb-2">Application Summary</h5>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Applicant:</strong> {user?.full_name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Position:</strong> {internship.title}</p>
                    <p><strong>Company:</strong> {internship.organization}</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover-glow h-12"
                  disabled={isLoading || !coverLetter.trim()}
                >
                  {isLoading ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplyInternship;