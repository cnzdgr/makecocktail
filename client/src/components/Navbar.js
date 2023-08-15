import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
const logo = "https://freesvg.org/img/Cocktail.png"

function Navbar() {
    const userLinks = [
        { label: 'Cocktail Builder', path: '/builder' },
        { label: 'Popular', path: '/popular' },
        { label: 'All Cocktails', path: '/all' },
    ];

    const adminLinks = [
        { label: 'Favorites', path: '/favorites' },
        { label: 'Add Drink', path: '/adddrink'},
    ];

    let pathName = useLocation().pathname;

    const [email, setEmail] = useState("");
    const [admin, setAdmin] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        setEmail(jwtDecode(jwtToken).email);
        setAdmin(jwtDecode(jwtToken).isAdmin);
        }
    }, [email, admin]);

    useEffect(()=>{
        setOpen(!open)
        }, [pathName])

    const renderedUserLinks = userLinks.map((link) => {
        return (
            <Link
                key={link.label}
                to={link.path}
                className= {pathName === link.path ? "bg-gray-900 text-gray-200 px-3 py-2 rounded-md text-sm font-medium" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"}>
                {link.label}
            </Link>
        );
    });

    const renderedAdminLinks = adminLinks.map((link) => {
        return (
            <Link
                key={link.label}
                to={link.path}
                className= {pathName === link.path ? "bg-gray-900 text-gray-200 px-3 py-2 rounded-md text-sm font-medium" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"}>
                {link.label}
            </Link>
        );
    });

    const renderedMobileUserLinks = userLinks.map((link) => {
        return (
            <Link
                key={link.label}
                to={link.path}
                className= {pathName === link.path ? "bg-gray-900 text-gray-200 block px-3 py-2 rounded-md text-base font-medium" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"}>
                {link.label}
            </Link>
        );
    });

    const renderedMobileAdminLinks = adminLinks.map((link) => {
        return (
            <Link
                key={link.label}
                to={link.path}
                className= {pathName === link.path ? "bg-gray-900 text-gray-200 block px-3 py-2 rounded-md text-base font-medium" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"}>
                {link.label}
            </Link>
        );
    });

return(
    <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <Link to="/" className="flex flex-shrink-0 items-center">
                        <img className="hidden h-8 w-auto lg:block" src={logo} alt="to home page"/>
                    </Link>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                        {renderedUserLinks}
                        {admin && renderedAdminLinks}
                        </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {email && 
                    <div >
                        <Link to="/changepassword" className="text-gray-500 hover:bg-gray-900 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Change Password</Link>
                        <Link to="/logout" className="text-gray-500 hover:bg-gray-900 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
                    </div>}
                    {(!email) && <Link to="/signup" className={pathName === "/signup" ? "bg-gray-900 text-gray-200 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-gray-900 border drop-shadow text-gray-400 px-4 py-2 rounded-md text-sm font-medium"} aria-current="page">SignUp</Link>}
                    {(!email) && <Link to="/signin" className={pathName === "/signin" ? "bg-gray-900 text-gray-200 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-gray-900 text-gray-400 px-4 py-2 rounded-md text-sm font-medium"}>Sign in</Link>}
                </div>
            </div>
        </div>
        <div className={(!open)? "sm:hidden" : "hidden sm:hidden"} id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
            {renderedMobileUserLinks}
            {admin && renderedMobileAdminLinks}
            </div>
        </div>
    </nav>
    );   
}

export default Navbar;