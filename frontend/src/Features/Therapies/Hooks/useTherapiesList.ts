import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getTherapies } from "../Services/therapies.service";
import { Therapie } from "../Types/therapy.type";

export const useTherapiesList = () => {
    const options: UseQueryOptions<Therapie[], Error> = {
        queryKey: ["therapies"],
        queryFn: () => getTherapies(),
    };

    return useQuery(options);
}
