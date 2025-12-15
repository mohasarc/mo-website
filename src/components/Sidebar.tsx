import { portfolioData } from "../data/portfolio";

export const Sidebar = () => {
  const { profile, contact, links, news } = portfolioData.sidebar;

  return (
    <aside className="w-full md:w-[280px] md:shrink-0 md:h-screen md:sticky md:top-0 p-6 md:p-8 flex flex-col gap-8 md:border-r border-gray-100 overflow-y-auto">
      {/* Profile Header */}
      <div className="flex flex-col gap-4">
        <div className="relative w-[150px] h-[150px] rounded-lg overflow-hidden bg-gray-100 mb-2">
            {/* Find a placeholder or use the user's uploaded image if they wanted, but sticking to prompt "placeholder" */}
           <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
             <span className="text-4xl">📸</span>
           </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#222222] leading-tight mb-1">{profile.name}</h1>
          <p className="text-sm text-[#666666] leading-snug whitespace-pre-line">
            {profile.title}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">CONTACT</h2>
        <p className="text-sm text-[#444444] leading-relaxed">
          {contact.map((line, index) => (
            <span key={index}>
              {line}<br />
            </span>
          ))}
        </p>
      </div>

      {/* Links */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">LINKS</h2>
        <ul className="flex flex-col gap-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} className="flex items-center gap-2 text-sm text-[#444444] hover:text-blue-600 hover:underline transition-colors">
                 <span className="text-gray-400">{link.icon}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent News */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">RECENT NEWS</h2>
        <ul className="flex flex-col gap-4">
          {news.map((item, index) => (
            <li key={index} className="text-sm leading-snug">
              <span className="font-semibold text-gray-800">{item.date}</span> <span className="text-[#444444]">{item.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
