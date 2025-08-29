import Navigation from "@/components/Navigation";
import AuthorityDashboard from "@/components/AuthorityDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <AuthorityDashboard />
      </main>
    </div>
  );
};

export default Dashboard;