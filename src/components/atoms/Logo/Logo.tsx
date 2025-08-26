import { type FunctionComponent } from "react";
import "./Logo.css";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  className?: string;
}

const Logo: FunctionComponent<LogoProps> = ({
  size = "medium",
  showText = true,
  className = "",
}) => {
  return (
    <div className={`logo ${size} ${className}`}>
      <div className="logo-icon">
        <ion-icon name="person-outline" className="logo-icon-svg" />
      </div>
      {showText && <span className="logo-text">PeopleDex</span>}
    </div>
  );
};

export default Logo;
