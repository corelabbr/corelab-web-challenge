import Header from "../components/Header";
import Footer from "../components/Footer";
import "./layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
