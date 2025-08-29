import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Trees, MapPin, Trophy, Shield, Camera, Users, Leaf } from "lucide-react";
import mangroveHero from "@/assets/mangrove-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "Report Incidents",
      description: "Easily report environmental threats to mangrove ecosystems with photo evidence and GPS location.",
      link: "/report",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Interactive Map",
      description: "View all incident reports on an interactive map to track conservation efforts.",
      link: "/map", 
      color: "text-secondary"
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Earn points for contributions and see top community champions protecting mangroves.",
      link: "/leaderboard",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Authority Dashboard",
      description: "Management tools for authorities to review, verify and act on incident reports.",
      link: "/dashboard",
      color: "text-destructive"
    }
  ];

  const stats = [
    { label: "Reports Submitted", value: "1,234", icon: Camera },
    { label: "Areas Protected", value: "89", icon: Trees },
    { label: "Active Members", value: "456", icon: Users },
    { label: "Conservation Points", value: "12.5K", icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mangroveHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Protecting Mangroves
              <span className="block bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join our community-driven platform to report, track, and protect mangrove ecosystems. 
              Every report makes a difference in conservation efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Camera className="h-5 w-5" />
                  Report Incident
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  <MapPin className="h-5 w-5" />
                  View Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for community-driven mangrove conservation and environmental protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-mangrove transition-smooth cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-3 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-smooth`}>
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-nature">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join thousands of environmental champions working together to protect and preserve our precious mangrove ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Reporting
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trees className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Community Mangrove Watch</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Protecting ecosystems since 2024</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Beta Version
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
