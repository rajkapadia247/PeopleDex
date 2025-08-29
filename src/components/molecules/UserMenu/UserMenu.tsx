import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../atoms/Avatar/Avatar";
import "./UserMenu.css";

interface UserMenuProps {
  user: any;
  logout: () => void;
}

const UserMenu: FunctionComponent<UserMenuProps> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const name = user?.name || "User";
  const email = user?.email || "user";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const goToSettings = () => {
    setOpen(false);
    navigate("/#");
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div className="user-menu" ref={ref}>
      <Avatar size="large" onClick={() => setOpen((v) => !v)} />
      {open && (
        <div className="user-menu-dropdown" role="menu" aria-label="User menu">
          <div className="user-menu-header">
            <div className="user-menu-greeting-mobile">
              Hi, <span className="user-menu-name">{name}</span>
            </div>
            <div className="user-menu-label">Logged in as:</div>
            <div className="user-menu-email" title={email}>
              {email}
            </div>
          </div>

          <button
            className="user-menu-item"
            type="button"
            onClick={goToSettings}
          >
            Account Settings
          </button>

          <div className="user-menu-separator" />

          <button
            className="user-menu-item danger"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
