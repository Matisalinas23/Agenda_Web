import { Link } from "react-router-dom";
import NavbarDeployable from "./NavbarDeployable";

export default function Navbar() {

    return (
        <nav className="text-white bg-neutral-500 flex">
            <ul className='w-full py-4 px-8 flex gap-12' >
                <li>
                    <Link to="/" > Home </Link>
                </li>
            </ul>

            <NavbarDeployable />
        </nav>
    )
}
