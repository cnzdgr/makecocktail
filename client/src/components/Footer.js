import { Link } from "react-router-dom";

function Footer () {
    return(

        <footer className=" bg-gray-700 mt-8 shadow ">
            <div className="w-full ml-3 mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-300 sm:text-center dark:text-gray-400">© 2023 <a href="https://makecocktail.net/" className="hover:underline">MakeCocktail™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-300 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link to="/" className="mr-4 hover:underline md:mr-6 ">Home</Link>
                </li>

                <li>
                    <p> Contact: ozdogar@yahoo.com </p>
                </li>
            </ul>
            </div>
        </footer>
    );
}

export default Footer;