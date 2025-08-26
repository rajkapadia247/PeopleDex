import type { FunctionComponent } from "react";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import "./Avatar.css";
import profileFallbackSvg from "../../../../assets/profile-picture.svg";

interface AvatarProps {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const Avatar: FunctionComponent<AvatarProps> = ({
  size = "medium",
  onClick,
}) => {
  const { user } = useAuth();

  const photoUrl = user?.picture;
  const displayName = user?.name;

  return (
    <button
      type="button"
      className={`avatar ${size}`}
      onClick={onClick}
      aria-label="Open profile menu"
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={displayName || "User"}
          className="avatar-image"
        />
      ) : (
        <img
          src={profileFallbackSvg}
          alt={displayName || "User"}
          className="avatar-image"
        />
      )}
    </button>
  );
};

export default Avatar;
