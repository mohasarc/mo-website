import { portfolioData } from "../data/portfolio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = () => {
  const { profile, contact, links, news } = portfolioData.sidebar;

  return (
    <aside className="w-full md:w-[280px] md:shrink-0 p-6 md:pl-8 md:py-6 md:pr-3 flex flex-col gap-5 border-border relative">
      {/* Profile Header - Image Only (Name moved to Layout) */}
      <div className="flex flex-col gap-6">
        <div>
          <Avatar className="w-40 md:w-full h-auto aspect-square rounded-sm mb-6 grayscale contrast-125 bg-muted">
            <AvatarImage src="/profile.jpg" alt={profile.name} className="object-cover" />
            <AvatarFallback className="rounded-sm text-4xl text-muted-foreground">📸</AvatarFallback>
          </Avatar>
          
           {/* Title under image */}
           <p className="text-sm font-sans text-foreground leading-relaxed whitespace-pre-line">
             {profile.title}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
         {/* Contact */}
         <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Contact</h2>
            <div className="flex flex-col gap-1 text-sm font-sans text-foreground leading-relaxed">
              {contact.map((line, index) => (
                  <div key={index}>{line}</div>
              ))}
            </div>
         </div>

         {/* Links */}
         <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Links</h2>
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <a key={index} href={link.url} className="text-sm hover:underline flex items-center gap-2 group text-foreground">
                        <span className="w-5 flex justify-center text-foreground group-hover:text-primary transition-colors">{link.icon}</span>
                        <span className="border-b border-border group-hover:text-primary group-hover:border-primary transition-colors">{link.label}</span>
                    </a>
                ))}
            </div>
         </div>
      </div>
     
      {/* Recent News - Scrollable */}
       <div>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Recent News</h2>
        <ScrollArea className="h-[400px] w-full pr-4">
          <ul className="flex flex-col gap-4">
            {news.map((item, index) => (
              <li key={index} className="text-sm leading-snug">
                 <div className="mb-1">
                   <span className="font-bold block text-muted-foreground mb-1 text-xs">{item.date}</span>
                   <span className="text-foreground">{item.content}</span>
                 </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

    </aside>
  );
};
