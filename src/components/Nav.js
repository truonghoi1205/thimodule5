import { NavLink} from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Trang chủ
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={"/products"} className="nav-link">
                             Danh sách sản phẩm
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/categories"} className="nav-link">
                                Danh sách thể loại
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}
export default Nav;