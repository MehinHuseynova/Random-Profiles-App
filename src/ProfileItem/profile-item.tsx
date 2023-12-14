import React, { useState } from "react";
import { Result } from "../types/profiles.type";
import "./profile-item.style.scss";
type ProfileProps = {
  profileInfo: Result;
  handleDeleteProfile: (id: string) => void;
};
export const ProfileItem: React.FC<ProfileProps> = ({
  profileInfo,
  handleDeleteProfile,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const toggleCardView = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="profileItem__container">
      <div className="profileItem__content">
        <div>
          <img src={profileInfo.picture.medium} alt={profileInfo.name.title} />
        </div>
        <div>
          <h3>
            {profileInfo.name.title}. {profileInfo.name.first}{" "}
            {profileInfo.name.last}
          </h3>
          <p>
            <b>Email:</b> {profileInfo.email}
          </p>
          <p>
            <b>Phone:</b> {profileInfo.phone}
          </p>
          <p>
            <b>Location: </b> {profileInfo.location.country},{" "}
            {profileInfo.location.city}
          </p>
          {showDetail && (
            <>
              <p>
                <b>Title: </b>
                {profileInfo.name.title}
              </p>
              <p>
                <b>Gender: </b>
                {profileInfo.gender}
              </p>
              <p>
                <b>Cell:</b> {profileInfo.cell}
              </p>
              <p>
                <b>Salt: </b>
                {profileInfo.login.salt}
              </p>
              <p>
                <b>Age: </b>
                {profileInfo.dob.age}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="profileItem__btnGroup">
        <button
          are-label="Delete Button"
          type="button"
          onClick={() => handleDeleteProfile(profileInfo.login.uuid)}
        >
          Delete
        </button>
        <button are-label="More Button" type="button" onClick={toggleCardView}>
          {showDetail ? "Close" : "More"}
        </button>
      </div>
    </div>
  );
};
