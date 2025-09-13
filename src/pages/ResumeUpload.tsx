import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const mockExtractedSkills = [
    "JavaScript", "React", "Node.js", "Python", "Communication", 
    "Problem Solving", "Team Leadership", "Data Analysis"
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setIsUploading(true);
      // Simulate upload and processing
      setTimeout(() => {
        setIsUploading(false);
        setIsUploaded(true);
        setExtractedSkills(mockExtractedSkills);
      }, 2000);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setExtractedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const addSkill = (newSkill: string) => {
    if (newSkill.trim() && !extractedSkills.includes(newSkill.trim())) {
      setExtractedSkills(prev => [...prev, newSkill.trim()]);
    }
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
              <FileText className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Resume Upload</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Your Resume for 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Smart Matching
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We'll analyze your resume and extract your skills to find the perfect internships for you
          </p>
        </div>

        {!isUploaded ? (
          <Card className="gradient-card border-0 shadow-soft hover-lift">
            <CardContent className="p-12">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? "border-primary bg-primary/5 shadow-glow" 
                    : "border-muted-foreground/30 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-bounce-gentle">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Processing Your Resume...</h3>
                      <p className="text-muted-foreground">Extracting skills and analyzing content</p>
                      <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
                        <div className="h-full gradient-primary rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-20 h-20 gradient-hero rounded-2xl flex items-center justify-center mx-auto">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">Drag & Drop Your Resume</h3>
                      <p className="text-muted-foreground text-lg">
                        or <span className="text-primary font-medium">browse</span> to choose a file
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF and DOCX files up to 10MB
                      </p>
                    </div>
                    
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8 animate-slide-up">
            <Card className="gradient-card border-0 shadow-soft">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-success">Resume Successfully Processed!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    We've extracted the following skills from your resume. You can edit them before proceeding.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1 hover:bg-destructive hover:text-destructive-foreground cursor-pointer transition-colors"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a skill..."
                      className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addSkill((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-primary hover-glow text-lg px-8 py-6 shadow-medium"
                onClick={() => navigate("/recommendations")}
              >
                View Recommendations <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 hover-lift"
                onClick={() => navigate("/profile")}
              >
                Complete Profile Instead
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Don't have a resume? <button 
              onClick={() => navigate("/profile")} 
              className="text-primary hover:underline font-medium"
            >
              Fill out your profile manually
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;