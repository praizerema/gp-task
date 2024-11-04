import { Link } from "react-router-dom";
import { _clearData, _getToken } from "../../utils";

export const NavBar = () => {
    const token = _getToken()
  return (
    <nav className="bg-white h-16 flex items-center justify-between shadow-md px-5 lg:px-28">
      <Link to="/" className="h1 text-gp-purple-500">
        GP
      </Link>
      {token && <div
        className="text-gray-500 cursor-pointer"
        onClick={() => _clearData({ pushToLogin: true })}
      >
        Log Out
      </div>}
    </nav>
  );
};
