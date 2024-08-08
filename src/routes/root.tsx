import { NavLink, Outlet } from "react-router-dom";
import "./root.css";
import { BiSolidTachometer } from "react-icons/bi";
import { Md123 } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { MdSettings } from "react-icons/md";

export default function Root() {
  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-item">
          <NavLink to="/"><BiSolidTachometer /> Dashboard</NavLink>
        </div>

        <div className="sidebar-item">
          <NavLink to="/grades"><Md123 /> Grades</NavLink>
        </div>

        <div className="sidebar-item">
          <NavLink to="/imports"><MdImportExport />Imports</NavLink>
        </div>

        <div className="sidebar-item">
          <NavLink to="/settings"><MdSettings />Settings</NavLink>
        </div>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

