import Navigation from "@/components/Navigation";
import IncidentReportForm from "@/components/IncidentReportForm";

const Report = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Report an Incident</h1>
            <p className="text-xl text-muted-foreground">
              Help protect our mangrove ecosystems by reporting environmental incidents
            </p>
          </div>
          <IncidentReportForm />
        </div>
      </main>
    </div>
  );
};

export default Report;