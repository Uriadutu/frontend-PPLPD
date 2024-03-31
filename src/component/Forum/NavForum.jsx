import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const NavForum = () => {
  return (
    <div className='p-3'>
      <div
        className="nav is-fixed-top"
        style={{
          top: "0",
          position: "sticky",
        }}
      >
        <div className="navbar">
          <div className="navbar-item">
            <span className="has-text-weight-semibold">Forum PPLPjD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavForum;
