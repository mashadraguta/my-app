import React from "react";
import ComponentTemplate from "../../HOC/ComponentTemplate";
import WatchComponent from "../WatchExample/WatchComponent";
import s from "./Settings.module.css";

const Settings = () => {
  return (
    <div>
      <ul className={s.list}>
        {/* <ComponentTemplate></ComponentTemplate> */}
        <WatchComponent />
      </ul>
    </div>
  );
};

export default Settings;
