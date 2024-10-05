import BaseRequest from '@/config/axios.config';
import { PagingModel } from '@/constants/data';
import { useMutation, useQuery } from '@tanstack/react-query';

const SUB_URL = `api/CheckOut`;

export type CreateCartModel = {
  note: string;
  shipAddress: string;
  paymentMethod: number;
  shoesId: number;
  quantity: number;
  shoesImageId: number;
  size: string;
};

export type AddCartModel = {
  shoesId: number;
  quantity: number;
  shoesImageId: number;
  orderId: number;
  size: string;
};

export type UpdateOrderModel = {
  id: number;
  status: number;
  note: string;
  shipAddress: string;
  paymentMethod: number;
  amount: number;
};

export const useCreateCart = () => {
  return useMutation({
    mutationKey: ['create-cart'],
    mutationFn: async (model: CreateCartModel) => {
      return BaseRequest.Post(`/${SUB_URL}/check-out`, model);
    }
  });
};

export const useGetItemInCart = () => {
  let model = { ...PagingModel, orderStatus: 1 };
  return useQuery({
    queryKey: ['get_item_in_cart'],
    queryFn: async () => {
      return BaseRequest.Post(`/${SUB_URL}/filter-all-orders-by-status`, model);
    }
  });
};

export const useGetOrderByStatus = () => {
  return useMutation({
    mutationKey: ['get_order_by_status'],
    mutationFn: async (model) => {
      return BaseRequest.Post(`/${SUB_URL}/filter-all-orders-by-status`, model);
    }
  });
};

export const useGetAllOrder = () => {
  const model = { ...PagingModel };
  return useQuery({
    queryKey: ['get_all_order'],
    queryFn: async () => {
      return BaseRequest.Post(`/${SUB_URL}/get-all-orders`, model);
    }
  });
};

export const useGetOrderConfirm = () => {
  let model = { ...PagingModel, orderStatus: 2 };
  return useQuery({
    queryKey: ['get_order_confirm'],
    queryFn: async () => {
      return BaseRequest.Post(`/${SUB_URL}/filter-all-orders-by-status`, model);
    }
  });
};

export const useAddItemToCart = () => {
  return useMutation({
    mutationKey: ['add_item_to_cart'],
    mutationFn: async (model: AddCartModel) => {
      return BaseRequest.Post(`/${SUB_URL}/add-item-to-order`, model);
    }
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationKey: ['update_order'],
    mutationFn: async (model: any) => {
      return BaseRequest.Put(`/${SUB_URL}/update-order`, model);
    }
  });
};
