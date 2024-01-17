import { bottombarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";

import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  return (
    <div className="md:hidden bottom-0 z-50 sticky w-full px-5 py-4 flex items-center justify-between border bg-white dark:bg-black">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={`leftsidebar-link group ${
              isActive && "bg-secondary "
            }`}
          >
            {link.icons}
          </Link>
        );
      })}
       <Link
            to={`/profile/${user.id}`}
            className="flex items-center justify-center"
          >
            <img
              src={user.imageUrl}
              alt="profile-img"
              className="h-8 w-8 rounded-full gap-2"
            />
          </Link>
    </div>
  );
};

export default Bottombar;
