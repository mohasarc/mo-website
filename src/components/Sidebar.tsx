import { portfolioData } from "../data/portfolio";

export const Sidebar = () => {
  const { profile, contact, links, news } = portfolioData.sidebar;

  return (
    <aside className="w-full md:w-[320px] md:shrink-0 p-6 md:pl-8 md:py-8 md:pr-3 flex flex-col gap-8 md:border-r border-gray-200">
      {/* Profile Header - Name First */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#000000] leading-none mb-6 tracking-tight">{profile.name}</h1>
          
          <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-gray-100 mb-6 grayscale contrast-125">
            {/* Find a placeholder or use the user's uploaded image if they wanted, but sticking to prompt "placeholder" */}
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
               <span className="text-4xl">📸</span>
             </div>
          </div>
          
           {/* Title under image */}
           <p className="text-sm font-sans text-black leading-relaxed whitespace-pre-line">
             {profile.title}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
         {/* Contact */}
         <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Contact</h2>
            <div className="flex flex-col gap-1 text-sm font-sans text-black leading-relaxed">
              {contact.map((line, index) => (
                  <div key={index}>{line}</div>
              ))}
            </div>
         </div>

         {/* Links */}
         <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Links</h2>
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <a key={index} href={link.url} className="text-sm hover:underline flex items-center gap-2 group">
                        <span className="w-5 flex justify-center">{link.icon}</span>
                        <span className="group-hover:text-black border-b border-gray-300 group-hover:border-black transition-colors">{link.label}</span>
                    </a>
                ))}
            </div>
         </div>
      </div>
     
      {/* Recent News - Scrollable */}
       <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Recent News</h2>
        <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {news.map((item, index) => (
            <li key={index} className="text-xs leading-snug">
               <div className="mb-1">
                 <span className="font-bold block text-gray-500 mb-1">{item.date}</span>
                 {item.content}
               </div>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
};
