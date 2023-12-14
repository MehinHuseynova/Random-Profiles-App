import React from "react";

type HeaderProps = {
  reloadProfiles: () => void;
};
export const Header: React.FC<HeaderProps> = ({ reloadProfiles }) => {
  return (
    <div className="profileList__header">
      <h1>Random User Profiles</h1>
      <button className="profileList__reloadBtn" onClick={reloadProfiles}>
        Reload
      </button>
    </div>
  );
};
