import React, { useState } from "react";
import useGetData from "../hooks/useGetData";
import { Result } from "../types/profiles.type";
import { ProfileItem } from "../ProfileItem/profile-item";
import "./profile-list.style.scss";

import { Header } from "../components/Header";
import { Spinner } from "../components/Spinner/Spinner";

export const ProfileList: React.FC = () => {
  const [profileCountToFetch, setProfileCountToFetch] = useState<number>(0);
  const { resource, setResource, refetch, loading, error } =
    useGetData(profileCountToFetch);

  const loadMoreProfile = (): void => {
    setProfileCountToFetch((prev) => prev + 1);
  };

  const handleDeleteProfile = (id: string): void => {
    const filteredProfiles = resource.filter(
      (profile: Result) => profile.login.uuid !== id
    );
    setResource(filteredProfiles);
  };

  const reloadProfiles = (): void => {
    setProfileCountToFetch(0);
    refetch();
  };

  if (error) {
    return <p>{error.message}</p>;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profileList">
      <Header {...{ reloadProfiles }} />
      <div className="profileList__container">
        {resource.map((profile: Result) => (
          <ProfileItem
            profileInfo={profile}
            handleDeleteProfile={handleDeleteProfile}
            key={profile.login.uuid}
          />
        ))}
      </div>

      <div className="profileList__loadBtn">
        <button onClick={loadMoreProfile}>Add Profile (s)</button>
      </div>
    </div>
  );
};
