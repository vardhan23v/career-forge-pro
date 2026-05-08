import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const activeClass = "text-primary border-b-2 border-primary pb-1 font-semibold tracking-tight transition-colors";
  const inactiveClass = "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors tracking-tight font-medium";

  return (
    <nav className="fixed top-0 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-8 h-16 z-50 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 tracking-tight">
          CareerForge Pro
        </Link>
        <div className="hidden md:flex gap-6">
          <NavLink to="/" end className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Dashboard
          </NavLink>
          <NavLink to="/templates" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Templates
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Saved Resumes
          </NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-full active:scale-95"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-full active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-full active:scale-95">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm ring-2 ring-slate-100 dark:ring-slate-800">
          <img 
            alt="User profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqRVzullCapa5_HUemT2Lem60E9CtKsi0VujY67tE3_7x0ysO5FWZ6DKf_aeKwmmc6CAGhjULIldJ3HDluC0stlfHl3xGrb8VFiFGlWpv2-fCJal8_ky9mPoeaSOOgXn_0iYwhG-2lUyGe2c9xSGUNQy96liTcEddIWWz0HdwD_a1eQOck2Yb22l1Xo2yXmWIpCEYPWs6fDOgW17-XuBZ3gEk3uxWOOBRj9RNvJdn7zhgb7BjWltFzan_OPD0W00UrmQsD7heXbWM" 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
