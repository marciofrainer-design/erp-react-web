const ButtonBase = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <button onClick={onClick} 
      className="flex items-center gap-2 px-5 py-2.5 bg-slate-500 text-white rounded font-semibold text-sm hover:bg-slate-400 transition-all shadow-sm active:transform active:scale-95">
      {children}
    </button>
  );
}

export { ButtonBase };