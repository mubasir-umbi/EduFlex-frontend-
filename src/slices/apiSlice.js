import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// const baseQuery = fetchBaseQuery({ baseUrl: 'https://eduflex.site' });
const baseQuery = fetchBaseQuery({ baseUrl: 'https://eduflex-backend-h43b.onrender.com' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
