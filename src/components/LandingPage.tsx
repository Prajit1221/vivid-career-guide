import { ArrowRight, Users, Target, Briefcase, Star, Upload, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import heroImage from "@/assets/hero-students.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Perfect Internship
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover personalized internship opportunities that match your skills, interests, and career goals. 
                Start your professional journey today with PragatiSetu.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary hover-glow text-lg px-8 py-6 shadow-medium"
                onClick={() => navigate("/profile-development")}
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 hover-lift"
                onClick={() => navigate("/resume-upload")}
              >
                Upload Resume <Upload className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Internship Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Partner Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Match Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 animate-float">
              <img 
                src={heroImage} 
                alt="Students collaborating on internship opportunities" 
                className="rounded-2xl shadow-large w-full hover-lift"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full gradient-hero rounded-2xl opacity-20 -z-10"></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">How PragatiSetu Works</h3>
            <p className="text-xl text-muted-foreground">Simple steps to find your dream internship</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card hover-lift border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">1. Upload Your Resume</h4>
                <p className="text-muted-foreground">
                  Upload your resume or fill out your profile to help us understand your skills and interests.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card hover-lift border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">2. Get Matched</h4>
                <p className="text-muted-foreground">
                  Our smart algorithm analyzes your profile and matches you with relevant internship opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card hover-lift border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-warning rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">3. Apply & Succeed</h4>
                <p className="text-muted-foreground">
                  Apply directly to internships through our platform and track your application progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PragatiSetu?</h3>
            <p className="text-xl text-muted-foreground">Built specifically for Indian students</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Government Backed", desc: "Connected to PM Internship Scheme" },
              { icon: Target, title: "Personalized Matching", desc: "AI-powered recommendations" },
              { icon: Star, title: "Verified Opportunities", desc: "Quality assured internships" },
              { icon: Briefcase, title: "Multi-language Support", desc: "Available in regional languages" },
            ].map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-soft gradient-card">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold mb-2">{feature.title}</h5>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have found their perfect internships through PragatiSetu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-medium"
              onClick={() => navigate("/profile-development")}
            >
              Create Your Profile <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => navigate("/resume-upload")}
            >
              Upload Resume Instead
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;