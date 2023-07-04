import React from "react";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../utils/https";

const Profile = ({ visible, setVisibleProfile }) => {
  const profile = useSelector((state) => state.Auth.profile);

  return (
    <div
      className={`${
        visible ? "mb-6" : "mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]"
      }`}
    >
      <div className={`${!visible && "p-2.5 bg-n-6 rounded-xl"}`}>
        <div
          className={`flex items-center ${
            visible ? "justify-center" : "px-2.5 py-2.5 pb-4.5"
          }`}
        >
          <div className="relative w-10 h-10">
            <img
              className="object-cover rounded-full"
              src={
                profile
                  ? profile.User_Profile_image
                    ? API_HOST + profile.User_Profile_image
                    : require("../../../assets/Images/avatar.jpg")
                  : require("../../../assets/Images/avatar.jpg")
              }
              alt="Avatar"
            />
            <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 border-n-6"></div>
          </div>
          {!visible && (
            <>
              <div className="ml-4 mr-4">
                <div className="font-semibold base2 text-n-1">
                  {profile
                    ? profile.User_Full_Name
                      ? profile.User_Full_Name
                      : "User Name"
                    : "User Name"}
                </div>
                <div className="font-semibold caption1 text-n-3/50">
                  {profile
                    ? profile.Email_Id
                      ? profile.Email_Id
                      : "User Email"
                    : "User Email"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
