import React, { PropsWithChildren } from "react";

const Menubar = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button absolute left-5 top-4"
        >
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <div>Sidebar Item 1</div>
          </li>
          <li>
            <div>Sidebar Item 2</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menubar;
