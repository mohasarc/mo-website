import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative p-6 md:p-12 mx-auto max-w-6xl">
      <Sidebar />
      <MainContent />
    </div>
  );
}
