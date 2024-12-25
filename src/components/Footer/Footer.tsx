import { Link } from "react-router-dom";
import { CirclePlus, House, MessageSquareDiff, Search, UserRound } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 fixed bottom-0 shadow-inner">
      <div className="flex max-w-[500px] w-full justify-between mx-auto px-4 py-2">
        <Link to="/">
          <House className="dark:text-white text-black hover:text-[rgba(254,44,85,1)]" />
        </Link>
        <Link to="/search">
          <Search className="dark:text-white text-black hover:text-[rgba(254,44,85,1)]" />
        </Link>
        <Link to="/publication">
          <CirclePlus className="dark:text-white text-black hover:text-[rgba(254,44,85,1)]" />
        </Link>
        <Link to="/chats">
          <MessageSquareDiff className="dark:text-white text-black hover:text-[rgba(254,44,85,1)]" />
        </Link>
        <Link to="/profil">
          <UserRound className="dark:text-white text-black hover:text-[rgba(254,44,85,1)]" />
        </Link>
      </div>
    </div>
  );
}
