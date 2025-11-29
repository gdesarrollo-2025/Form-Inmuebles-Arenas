import { FaHouseUser, FaUsers} from "react-icons/fa"

export default function SideBar(){
    return(
        <div className="absolute bg-white flex flex-col py-5 gap-3 w-50 h-full border-2">
            <button className="flex items-center gap-2 text-lg"type="button"><FaHouseUser/> Propiedades</button>
            <button type="button"><FaUsers/> </button>
        </div>
    )
}