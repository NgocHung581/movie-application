import Logo from "./Logo";
import Navbar from "./Navbar";

function Footer() {
    return (
        <footer className="p-8 dark:bg-dark bg-white flex flex-col md:flex-row items-center justify-between">
            <Logo />
            <Navbar />
        </footer>
    );
}

export default Footer;
