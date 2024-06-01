'use client';

import Links from "./links/Links";

const Navbar = ({ menuDetails }) => {
  return (
    <div className="d-flex flex-lg-column flex-row flex-grow-1 align-items-center align-items-lg-start pt-2 text-white">
      <a href="/" className="d-flex align-items-center pb-3 mb-lg-0 me-lg-auto text-white text-decoration-none">
        <span className="fs-5 d-none d-lg-inline">Logo</span>
      </a>
      <Links menuDetails={menuDetails} />
    </div>
  )
}

export default Navbar