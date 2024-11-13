import BaseRequest from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';

const SUB_URL = `api/CheckOut`;

export const useGetTop3Shoes = () => {
  return useQuery({
    queryKey: ['get_top_3_shoes'],
    queryFn: async () => {
      return BaseRequest.Get(`/${SUB_URL}/summary-data-in-month`);
    }
  });
};

export const useGetInfoUser = () => {
  return useQuery({
    queryKey: ['get_info_user'],
    queryFn: async () => {
      return BaseRequest.Post(`/${SUB_URL}/get-info-user`);
    },
    staleTime: 3600000
  });
};
