import { apiSlice } from '../apiSlice';
// const ADMIN_URL = '/api/admin';
import { ADMIN_URL } from '../../constants/adminConstans';


export const tutorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/category`,
      }),
    }),

  }),
});

export const {
  useGetCategoryQuery
} = tutorApiSlice;
