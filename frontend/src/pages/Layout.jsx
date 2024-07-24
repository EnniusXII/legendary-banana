import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
        <header>
          <h1>Legendary Banana</h1>
          <nav>
            <ul className="nav-ul">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/sendtransaction"}>Send</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
