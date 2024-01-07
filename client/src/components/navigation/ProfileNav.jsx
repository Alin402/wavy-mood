import Dropdown from "../generic/dropdown/Dropdown";
import { BiSolidUserPin as UserIcon } from "react-icons/bi";
import { MdLibraryMusic as ArtistIcon } from "react-icons/md";
import {useSelector} from "react-redux"
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
    const user = useSelector((state) => state.user.user.user);
    return user && (
        <div>
            <Dropdown
                header = {
                    user.isArtist ?
                    <ArtistIcon size={35} color="inherit" /> :
                    <UserIcon size={35} color="inherit" />
                }
            >
                <NavLink className="nav-item-inv" to={`/profile`}>
                    {user.email}
                </NavLink>
            </Dropdown>
        </div>
    )
}

export default ProfileNav;