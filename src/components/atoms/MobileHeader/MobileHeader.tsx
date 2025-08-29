import { type FunctionComponent } from "react";
import Logo from "../Logo/Logo";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import "./MobileHeader.css";

interface MobileHeaderProps {}

const MobileHeader: FunctionComponent<MobileHeaderProps> = () => {
  const { user, logout } = useAuth();

  return (
    <div className="mobile-header">
      <div className="mobile-header-logo">
        <Logo size="large" className="mobile-header-logo-style" />
      </div>

      <div className="mobile-header-user">
        <UserMenu user={user} logout={logout} />
      </div>
    </div>
  );
};

export default MobileHeader;
