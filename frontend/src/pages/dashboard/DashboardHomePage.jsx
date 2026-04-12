import { useAuth } from "../../app/hooks/useAuth";
import CitizenDashboard from "./CitizenDashboard";
import DistrictDashboard from "./DistrictDashboard";
import PradhanDashboard from "./PradhanDashboard";

export default function DashboardHomePage() {
  const { user } = useAuth();

  if (user?.role === "PRADHAN") return <PradhanDashboard />;
  if (user?.role === "DISTRICT") return <DistrictDashboard />;
  return <CitizenDashboard />;
}
