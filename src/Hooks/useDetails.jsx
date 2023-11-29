import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDetails = (id) => {
    const axiosPublic = useAxiosPublic();
    console.log(id);
    const { data = {}, refetch, isPending } = useQuery({
        queryKey: ['test-details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests/${id}`);
            console.log(res.data);
            return res.data;
        }
    });

    return {data, refetch, isPending};
};

export default useDetails;