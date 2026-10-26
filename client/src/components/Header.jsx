import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { navLinks } from "../constants";
import { useThemeMode } from "../context/ThemeContext";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { isDark, toggleTheme } = useThemeMode();
  const [open, setOpen] = useState(false);
  const signedIn = currentUser && !currentUser.isAdmin && !currentUser.isVendor;
  const close = () => setOpen(false);

  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#06111f]/95"><div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
    <Link to="/" onClick={close} className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-lg font-black text-slate-950">R</span><span className="text-lg font-extrabold tracking-tight">Rent a <span className="text-emerald-500">Ride</span></span></Link>
    <nav className="hidden items-center gap-8 lg:flex">{navLinks.map((link) => <Link key={link.id} to={link.path} className="text-sm font-semibold text-slate-600 transition hover:text-emerald-500 dark:text-slate-300">{link.title}</Link>)}</nav>
    <div className="flex items-center gap-2"><button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-emerald-400 hover:text-emerald-500 dark:border-white/10 dark:text-slate-300">{isDark ? <FaSun /> : <FaMoon />}</button>{signedIn ? <Link to="/profile" className="hidden items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold dark:border-white/10 sm:flex"><FaUserCircle className="text-emerald-500" /> Profile</Link> : <Link to="/signin" className="hidden rounded-md bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 sm:block">Sign in</Link>}<button type="button" onClick={() => setOpen(!open)} aria-label="Open navigation" className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-xl dark:border-white/10 lg:hidden">{open ? <MdClose /> : <RxHamburgerMenu />}</button></div>
  </div>{open && <nav className="border-t border-slate-200 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#06111f] lg:hidden">{navLinks.map((link) => <Link key={link.id} to={link.path} onClick={close} className="block border-b border-slate-100 py-3 font-semibold dark:border-white/10">{link.title}</Link>)}{signedIn ? <Link to="/profile" onClick={close} className="block py-3 font-semibold text-emerald-500">Profile</Link> : <Link to="/signin" onClick={close} className="block py-3 font-semibold text-emerald-500">Sign in</Link>}</nav>}</header>;
}

export default Header;
