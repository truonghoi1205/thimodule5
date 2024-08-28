import {Outlet} from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function MainLayout() {
    return (
        <div className="main-layout">
            <Nav />
            <main className="mt-3">
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <Footer />
        </div>
    )
}