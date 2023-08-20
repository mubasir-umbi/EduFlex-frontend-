import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
// https://eduflex.site
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
