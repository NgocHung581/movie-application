import { NavLink } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";

function Navbar() {
    return (
        <ul className="flex gap-4">
            {menuConfigs.main.map((item, index) => (
                <li
                    key={index}
                    className="flex items-center justify-center text-sm font-medium uppercase"
                >
                    <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            isActive ? `btn btn-primary` : "btn btn-text"
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
