import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground max-w-7xl mx-auto flex flex-col md:flex-row relative pt-10 md:pt-12 px-6 md:px-10">
       <div className="fixed top-4 right-4 z-[100] print:hidden">
          <ModeToggle />
       </div>
       <Sidebar />
       <MainContent />
    </div>
  );
}
