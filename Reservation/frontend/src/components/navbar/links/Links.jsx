import NavLink from "./navLink/NavLink";

const Links = ({ menuDetails }) => {
    return (
        <ul className="nav nav-pills flex-lg-column flex-row flex-nowrap flex-shrink-1 flex-lg-grow-0 flex-grow-1 mb-lg-auto mb-0 justify-content-center align-items-center align-items-lg-start">
            {menuDetails.map(menuItem => (
                <NavLink item={menuItem} key={menuItem.title} />
            ))}
        </ul>
    )
}

export default Links