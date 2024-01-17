import { InstagramIcon, LogInIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesMutation";
import { useEffect } from "react";
// import { useUserContext } from "@/context/AuthContext";
import { ModeToggle } from "../toggle-theme";

const Topbar = () => {
  const navigate = useNavigate();
  // const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <div className=" top-0 sticky w-full z-50 md:hidden border bg-white dark:bg-black">
      <div className="flex items-center justify-between py-4 px-5">
        <Link to="/">
          {" "}
          <InstagramIcon />
        </Link>

        <div className="flex gap-2">
          {/* <Link
            to={`/profile/${user.id}`}
            className="flex items-center justify-center"
          >
            <img
              src={user.imageUrl}
              alt="profile-img"
              className="h-8 w-8 rounded-full gap-2"
            />
          </Link> */}

          <ModeToggle />

          <Button variant={"ghost"} size={"sm"} onClick={() => signOut()}>
            <LogInIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
