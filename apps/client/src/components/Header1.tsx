function Header1({ children, className }) {
  return <h1 className={`font-bold text-3xl ${className}`}>{children}</h1>;
}

export default Header1;
