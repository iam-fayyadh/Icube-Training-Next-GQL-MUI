import { useQuery } from "@apollo/client";
import * as Schema from "./schema";
export const GET_CATEGORY_LIST = () => useQuery(Schema.GET_CATEGORY_LIST);

export const GET_CATEGORY_PRODUCT = (params) =>
  useQuery(Schema.GET_CATEGORY_PRODUCT, {
    variables: {
      categoryId: params,
    },
  });

export const GET_PRODUCT_DETAIL = (params) =>
  useQuery(Schema.GET_PRODUCT_DETAIL, {
    variables: {
      urlKey: params,
    },
  });
