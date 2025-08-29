import { type FunctionComponent } from "react";
import LogoIcon from "./LogoIcon";
import "./Logo.css";

interface LogoProps {
  size?: "small" | "medium" | "large" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "primary" | "white" | "transparent" | "dark";
}

const Logo: FunctionComponent<LogoProps> = ({
  size = "medium",
  showText = true,
  className = "",
  variant = "primary",
}) => {
  return (
    <div className={`logo ${size} ${variant} ${className}`}>
      <div className="logo-icon">
        <LogoIcon className="logo-icon-svg" />
      </div>
      {showText && <span className="logo-text">PeopleDex</span>}
    </div>
  );
};

export default Logo;
