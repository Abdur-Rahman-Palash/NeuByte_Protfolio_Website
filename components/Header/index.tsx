"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggler from "./ThemeToggler";
import { useTheme } from "next-themes";
import menuData from "./menuData";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleStickyNavbar = () => {
      if (window.scrollY >= 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleStickyNavbar);
    // cleanup to avoid duplicate listeners and setState on unmounted
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/images/logo/darkmode.png" : "/images/logo/lightmode.png";

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-100 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <div className=" flex justify-center items-center mx-auto">
                  <Image
                    src={logoSrc}
                    alt="NeuByte Logo"
                    width={90}
                    height={30}
                  />
                </div>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {navbarOpen && (
                    <motion.nav
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ duration: 0.3 }}
                      id="navbarCollapse"
                      className="navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white !bg-opacity-100 px-6 py-4 dark:border-body-color/20 dark:bg-dark lg:hidden"
                    >
                      <ul className="block">
                        {menuData.map((menuItem, index) => (
                          <li key={index} className="group relative">
                            {menuItem.path ? (
                              /* MOBILE MENU LINK (removed hover padding & fixed font weight) */
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Link
                                  href={menuItem.path}
                                  onClick={() => setNavbarOpen(false)}
                                  className={`relative group flex py-3 px-6 rounded-xl text-base transition-all duration-300 ${
                                      usePathName === menuItem.path
                                        ? "text-primary dark:text-white bg-primary/10"
                                        : "text-dark hover:text-primary hover:shadow-md dark:text-white/70 dark:hover:text-white dark:hover:shadow-lg"
                                    }` }
                                >
                                  <span className="transition-all font-medium">{menuItem.title}</span>
                                  <span
                                    className={`absolute left-6 right-6 bottom-3 h-0.5 bg-primary rounded-full transform origin-left transition-transform duration-300 ${
                                      usePathName === menuItem.path && menuItem.path !== "/" && menuItem.path !== "/home"
                                        ? "scale-x-100"
                                        : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                  />
                                </Link>
                              </motion.div>
                            ) : (
                              <>
                                <p
                                  onClick={() => handleSubmenu(index)}
                                  className="flex cursor-pointer items-center justify-between py-3 px-5 rounded-xl text-base transition-all duration-300 text-dark group-hover:text-primary group-hover:shadow-md dark:text-white/70 dark:group-hover:text-white dark:group-hover:shadow-lg"
                                >
                                  {menuItem.title}
                                  <span className="pl-3">
                                    <svg width="25" height="24" viewBox="0 0 25 24">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                </p>
                                <div
                                  className={`submenu relative left-0 top-full rounded-sm bg-white !bg-opacity-100 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                    openIndex === index ? "block" : "hidden"
                                  }`}
                                >
                                  {menuItem.submenu.map((submenuItem, index) => (
                                    <Link
                                      key={index}
                                      href={submenuItem.path}
                                      onClick={() => setNavbarOpen(false)}
                                      className="block rounded-xl py-3 px-5 text-sm text-dark transition-all duration-300 hover:text-primary hover:shadow-md dark:text-white/70 dark:hover:text-white dark:hover:shadow-lg lg:px-3"
                                    >
                                      {submenuItem.title}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            )}
                                </li>
                            ))}
                              </ul>
                    </motion.nav>
                  )}
                </AnimatePresence>
                <nav
                  id="navbarCollapse"
                  className="hidden lg:block"
                >
                  <ul className="flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`relative group flex py-3 px-5 rounded-xl text-base transition-all duration-300 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:rounded-none ${
                              usePathName === menuItem.path
                                ? "text-primary dark:text-white bg-primary/10"
                                : "text-dark hover:text-primary hover:shadow-md dark:text-white/70 dark:hover:text-white dark:hover:shadow-lg"
                            }`}
                          >
                            <span className="transition-all font-medium">{menuItem.title}</span>
                            <span
                              className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-full transform origin-left transition-transform duration-300 ${
                                usePathName === menuItem.path && menuItem.path !== "/" && menuItem.path !== "/home"
                                  ? "scale-x-100"
                                  : "scale-x-0 group-hover:scale-x-100"
                              }`}
                            />
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-3 px-5 rounded-xl text-base transition-all duration-300 text-dark group-hover:text-primary group-hover:shadow-md dark:text-white/70 dark:group-hover:text-white dark:group-hover:shadow-lg"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white !bg-opacity-100 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  key={index}
                                  href={submenuItem.path}
                                  onClick={() => setNavbarOpen(false)}
                                  className="block rounded-xl py-3 px-5 text-sm text-dark transition-all duration-300 hover:text-primary hover:shadow-md dark:text-white/70 dark:hover:text-white dark:hover:shadow-lg lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="hidden items-center lg:flex">
                <div className="flex items-center space-x-4">
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;