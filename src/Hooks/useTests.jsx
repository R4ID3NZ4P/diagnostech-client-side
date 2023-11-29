import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTests = () => {
    const axiosPublic = useAxiosPublic();
    const { data: testData, refetch } = useQuery({
        queryKey: ['testData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests`);
            console.log(res.data);
            return res.data;
        }
    });
    
    return {testData, refetch};
};

export default useTests;