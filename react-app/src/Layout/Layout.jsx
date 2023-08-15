// import Navbar from "../components/Navbar"
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Header classMame = "z-5"/>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;