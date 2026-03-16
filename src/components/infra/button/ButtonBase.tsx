const ButtonBase = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-500 transition-colors">
      {children}
    </button>
  );
}

export { ButtonBase };