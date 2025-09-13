import { useState } from "react";
import { ArrowRight, ArrowLeft, User, GraduationCap, Code, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    education: "",
    field: "",
    skills: [] as string[],
    sectors: [] as string[],
    location: "",
  });

  const educationLevels = [
    "12th Grade",
    "Diploma",
    "Undergraduate (1st Year)",
    "Undergraduate (2nd Year)", 
    "Undergraduate (3rd Year)",
    "Graduate",
    "Post Graduate"
  ];

  const fields = [
    "Computer Science & IT",
    "Electronics & Engineering", 
    "Mechanical Engineering",
    "Civil Engineering",
    "Business & Management",
    "Commerce & Finance",
    "Arts & Humanities",
    "Science & Research",
    "Medical & Healthcare",
    "Other"
  ];

  const availableSkills = [
    "JavaScript", "Python", "Java", "C++", "React", "Node.js",
    "Communication", "Leadership", "Problem Solving", "Teamwork",
    "Data Analysis", "Project Management", "Marketing", "Design",
    "Writing", "Public Speaking", "Research", "Microsoft Office"
  ];

  const sectors = [
    { name: "Information Technology", icon: "💻" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Education", icon: "🎓" },
    { name: "Finance & Banking", icon: "🏦" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Retail & E-commerce", icon: "🛒" },
    { name: "Media & Entertainment", icon: "🎬" },
    { name: "Government", icon: "🏛️" },
    { name: "Non-Profit", icon: "❤️" },
    { name: "Startups", icon: "🚀" }
  ];

  const locations = [
    "Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai",
    "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Remote Work"
  ];

  const toggleSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleSector = (sector: string) => {
    setProfile(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    navigate("/recommendations");
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
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 gradient-primary rounded-md flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Create Profile</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "gradient-primary text-white shadow-glow"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 ml-4 ${
                      step < currentStep ? "gradient-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-up">
          {currentStep === 1 && (
            <Card className="gradient-card border-0 shadow-soft">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Education & Field</CardTitle>
                <p className="text-muted-foreground">Tell us about your educational background</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Education Level</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {educationLevels.map((level) => (
                      <Button
                        key={level}
                        variant={profile.education === level ? "default" : "outline"}
                        className={`text-left justify-start p-4 h-auto ${
                          profile.education === level ? "gradient-primary" : "hover-lift"
                        }`}
                        onClick={() => setProfile(prev => ({ ...prev, education: level }))}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Field of Study</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map((field) => (
                      <Button
                        key={field}
                        variant={profile.field === field ? "default" : "outline"}
                        className={`text-left justify-start p-4 h-auto ${
                          profile.field === field ? "gradient-secondary" : "hover-lift"
                        }`}
                        onClick={() => setProfile(prev => ({ ...prev, field }))}
                      >
                        {field}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="gradient-card border-0 shadow-soft">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
                <p className="text-muted-foreground">
                  Select your skills or add custom ones
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Select Your Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={profile.skills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm ${
                          profile.skills.includes(skill)
                            ? "gradient-primary text-white"
                            : "hover:bg-primary/10"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {profile.skills.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Selected Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} className="gradient-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="gradient-card border-0 shadow-soft">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Industry Interests</CardTitle>
                <p className="text-muted-foreground">
                  Which sectors interest you the most?
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sectors.map((sector) => (
                    <Button
                      key={sector.name}
                      variant={profile.sectors.includes(sector.name) ? "default" : "outline"}
                      className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                        profile.sectors.includes(sector.name)
                          ? "gradient-hero text-white"
                          : "hover-lift"
                      }`}
                      onClick={() => toggleSector(sector.name)}
                    >
                      <span className="text-2xl">{sector.icon}</span>
                      <span className="text-sm text-center leading-tight">{sector.name}</span>
                    </Button>
                  ))}
                </div>

                {profile.sectors.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Selected Industries:</h5>
                    <div className="flex flex-wrap gap-2">
                      {profile.sectors.map((sector) => (
                        <Badge key={sector} className="gradient-secondary">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="gradient-card border-0 shadow-soft">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-warning rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Location Preference</CardTitle>
                <p className="text-muted-foreground">
                  Where would you like to work?
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {locations.map((location) => (
                    <Button
                      key={location}
                      variant={profile.location === location ? "default" : "outline"}
                      className={`p-4 h-auto ${
                        profile.location === location ? "gradient-primary" : "hover-lift"
                      }`}
                      onClick={() => setProfile(prev => ({ ...prev, location }))}
                    >
                      {location}
                    </Button>
                  ))}
                </div>

                {profile.location && (
                  <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-success font-medium">
                      ✓ Location preference: {profile.location}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                size="lg"
                onClick={nextStep}
                className="gradient-primary hover-glow px-8"
                disabled={
                  (currentStep === 1 && (!profile.education || !profile.field)) ||
                  (currentStep === 2 && profile.skills.length === 0) ||
                  (currentStep === 3 && profile.sectors.length === 0)
                }
              >
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleComplete}
                className="gradient-secondary hover-glow px-8"
                disabled={!profile.location}
              >
                Complete Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;