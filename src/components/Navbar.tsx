import {NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold">Mon Site</div>
                <ul className="flex space-x-4">
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? "text-blue-300 underline" : "hover:text-blue-300"
                            }
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add"
                            className={({ isActive }) =>
                                isActive ? "text-blue-300 underline" : "hover:text-blue-300"
                            }
                        >
                            Ajouter
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? "text-blue-300 underline" : "hover:text-blue-300"
                            }
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive ? "text-blue-300 underline" : "hover:text-blue-300"
                            }
                        >
                            Paramètres
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
 