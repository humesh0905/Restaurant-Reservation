"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {

    const pathName = usePathname();

    return (
        <li className="nav-item">
            <a className={`nav-link px-lg-0 px-5 align-middle icon-link icon-link-hover link-warning ${pathName === item.path ? 'text-warning' : 'text-white-50'}`} href={item.path} key={item.title}>
                <FontAwesomeIcon icon={item.icon} size="lg" />
                <span className="ms-1 d-none d-lg-inline">{item.title}</span>
            </a>
        </li>
    )
}

export default NavLink