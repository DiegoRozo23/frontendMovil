import { APIResponse } from "@/infraestructure/interfaces/common/api.reponse";
import { PaginationResponse } from "@/infraestructure/interfaces/common/page.response";
import { RolesResponse } from "@/infraestructure/interfaces/roles/roles.response";
import { projectApi } from "../api/project.api";


export const GetRolesAsync = async (page = 1, pageSize = 10, searchTerm = "") : Promise<APIResponse<PaginationResponse<RolesResponse>>> =>{

    try
    {
        const {data} = await  
            projectApi.get<APIResponse<PaginationResponse<RolesResponse>>>(`/roles?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
        console.log(projectApi.defaults.baseURL);
        console.log(data);

        
        return data;
    } catch (error){
        console.log('====================================');
        console.log(projectApi.defaults.baseURL);
        console.log('====================================');
        console.log("ESTE ERROR ESTA BIEN BUENO >>>>>>" + error);
        
    }
    throw new Error("");
}