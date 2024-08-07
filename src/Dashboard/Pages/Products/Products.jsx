import "./products.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Datatable from "../../Components/PageComponents/DataTable/DataTable";
import Footer from "../../Components/Footer/Footer";

const Products = () => {
    return (
        <>
            <div className="dashpage-wrapper">
                <div className="container-fluid">
                    <Navbar />
                    <div className="row">
                        <div className="col-lg-2">
                            <Sidebar />
                        </div>
                        <div className="col-lg-10">
                            <h4 className="dashpage-title">Products</h4>
                            <div className="row">
                                <Datatable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
