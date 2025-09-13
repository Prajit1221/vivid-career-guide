import { useState } from "react";
import { ArrowLeft, User, Settings, Bell, Globe, Volume2, Palette, Save, Edit2, Camera, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Computer Science student passionate about web development and AI. Looking for internship opportunities to grow my skills.",
    education: "Undergraduate (3rd Year)",
    field: "Computer Science & IT",
    skills: ["JavaScript", "React", "Python", "Problem Solving"],
    experience: "Fresher",
    dateOfBirth: "2002-05-15",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: "english",
    textToSpeech: false,
    highContrast: false,
    accessibility: false
  });

  const handleSave = () => {
    // Save logic would go here
    alert("Profile updated successfully!");
  };

  const tabs = [
    { id: "profile", label: "Personal Info", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "accessibility", label: "Accessibility", icon: Palette },
  ];

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
              <div className="w-6 h-6 gradient-primary rounded-md flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Profile Settings</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-0 shadow-soft sticky top-8">
              <CardContent className="p-6">
                {/* Profile Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="gradient-primary text-white text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 gradient-secondary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.education}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate("/profile-development")}
                  >
                    <Edit2 className="w-3 h-3 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Navigation Tabs */}
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === tab.id ? "gradient-primary" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10 bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10 bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="dob"
                            type="date"
                            value={profile.dateOfBirth}
                            onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="pl-10 bg-background"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10 bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        className="min-h-[100px] bg-background"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={profile.linkedin}
                          onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="bg-background"
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile</Label>
                        <Input
                          id="github"
                          value={profile.github}
                          onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                          className="bg-background"
                          placeholder="github.com/username"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Current Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} className="gradient-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/profile-development")}
                      >
                        Update Skills & Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "preferences" && (
              <Card className="gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>App Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="language">Language</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                      </div>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="w-[180px] bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border border-border z-50">
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">हिन्दी</SelectItem>
                          <SelectItem value="marathi">मराठी</SelectItem>
                          <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                          <SelectItem value="bengali">বাংলা</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="tts">Text-to-Speech</Label>
                        <p className="text-sm text-muted-foreground">Enable voice reading for accessibility</p>
                      </div>
                      <Switch
                        id="tts"
                        checked={preferences.textToSpeech}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, textToSpeech: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="email-notif">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive internship updates via email</p>
                      </div>
                      <Switch
                        id="email-notif"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="push-notif">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get instant alerts for new opportunities</p>
                      </div>
                      <Switch
                        id="push-notif"
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "accessibility" && (
              <Card className="gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Accessibility Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="contrast">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch
                        id="contrast"
                        checked={preferences.highContrast}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, highContrast: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Theme Selection</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                className="gradient-primary hover-glow px-8"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;