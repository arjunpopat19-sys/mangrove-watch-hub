import Navigation from "@/components/Navigation";
import MangroveMap from "@/components/MangroveMap";

const MapView = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Incident Map</h1>
            <p className="text-xl text-muted-foreground">
              View all reported incidents across mangrove conservation areas
            </p>
          </div>
          <MangroveMap />
        </div>
      </main>
    </div>
  );
};

export default MapView;