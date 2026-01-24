import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../Api/axiosClient";

const fetchPatients = async (filters = {}, page = 1) => {
  const params = {};

  Object.keys(filters).forEach((key) => {
    if (filters[key] !== "" && filters[key] != null) {
      params[key] = filters[key];
    }
  });

  params.page = page;

  const response = await axiosClient.get("/patients", { params });
  return response.data.data; 
};


export const usePatients = (filters = {}, page = 1) => {
  return useQuery({
    queryKey: ["patients", filters, page],
    queryFn: () => fetchPatients(filters, page),
    keepPreviousData: true,
  });
};

