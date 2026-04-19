import axiosClient from "../../../Api/axiosClient";
import { DashboardData } from "../Types/dashboard.type"


export const getDashboardData = async (): Promise<DashboardData> => {
    const response = await axiosClient.get<DashboardData>("dashboard");
    return response.data;
}
