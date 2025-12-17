import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground max-w-7xl mx-auto flex flex-col relative pt-10 md:pt-12 px-6 md:px-10">
       <div className="fixed top-4 right-4 z-[100] print:hidden">
          <ModeToggle />
       </div>

       {/* Name Header aligned with Sidebar content */}
       <header className="w-full mb-1 px-6 md:pl-8">
         <h1 className="text-2xl md:text-4xl font-bold font-sans text-foreground tracking-tight ">{portfolioData.sidebar.profile.name}</h1>
       </header>
       
       <div className="flex flex-col md:flex-row w-full">
        <Sidebar />
        <MainContent />
       </div>

       <footer className="w-full text-center text-sm text-muted-foreground mt-12 pb-8">
          © 2025 Mohammed S. Yaseen. All rights reserved.
       </footer>
    </div>
  );
}
