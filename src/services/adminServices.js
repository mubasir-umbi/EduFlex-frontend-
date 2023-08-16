import axios from "axios";
import { ADMIN_URL } from "../constants/adminConstans";

const getUsersData = async () => {

    const res = await axios.get(ADMIN_URL + 'students')
    console.log(res.data, 'from servieses');
    if(res.status === 200){
        return res.data
    }
}

export {getUsersData}