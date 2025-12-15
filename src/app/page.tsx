import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto">
      <Sidebar />
      <MainContent />
    </div>
  );
}
