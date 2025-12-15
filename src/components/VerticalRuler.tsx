export const VerticalRuler = () => {
    return (
      <div 
        className="hidden md:block w-[24px] shrink-0 h-auto"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 10px, black 10px, black 14px, transparent 14px),
            linear-gradient(to bottom, black 4px, transparent 4px)
          `,
          backgroundSize: '100% 100%, 100% 40px', // Vertical line full height, horizontal ticks repeat every 40px
          backgroundPosition: 'center, top'
        }}
        aria-hidden="true"
      />
    );
  };
