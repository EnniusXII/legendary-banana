import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
        <header className="navHeader">
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
              <li>
                <NavLink to={"/blocks"}>Blocks</NavLink>
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
