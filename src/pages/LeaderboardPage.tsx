import Navigation from "@/components/Navigation";
import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Community Champions</h1>
            <p className="text-xl text-muted-foreground">
              Celebrating our top contributors in mangrove conservation
            </p>
          </div>
          <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;