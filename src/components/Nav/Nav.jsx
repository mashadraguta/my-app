import React from "react";
import s from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar__menu}>
        <div className={s.sidebar__menu__item}>
          <ul className={s.list}>
            <li>
              <NavLink to="/profile" className={s.activeLink}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={s.activeLink}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dialogs" className={s.activeLink}>
                Dialogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" className={s.activeLink}>
                Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={s.activeLink}>
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat" className={s.activeLink}>
                Chat Page
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default NavBar;
