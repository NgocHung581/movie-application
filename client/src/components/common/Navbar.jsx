import { NavLink } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";

function Navbar() {
    return (
        <ul className="flex md:gap-4">
            {menuConfigs.main.map((item, index) => (
                <li
                    key={index}
                    className="flex items-center justify-center text-sm font-medium uppercase"
                >
                    <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `btn btn-primary whitespace-nowrap`
                                : "btn btn-text whitespace-nowrap"
                        }
                    >
                        {item.display}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default Navbar;
