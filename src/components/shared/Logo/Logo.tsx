import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <Link to={"/"} className="w-full">
        <img
          src={logo}
          alt="logo"
          className="h-16 w-full object-cover cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Logo;
