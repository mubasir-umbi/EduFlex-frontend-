// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { TUTOR_URL } from "../../constants/tutorConstants";
// const baseQuery = fetchBaseQuery({ baseUrl: TUTOR_URL });

// export const tutorApiSlice = createApi({
//   baseQuery,

//   endpoints: (builder) => ({
//     tutorLogin: builder.mutation({
//       query: (data) => ({
//         url: `${TUTOR_URL}/login`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
    
//     tutorLogout: builder.mutation({
//       query: () => ({
//         url: `${TUTOR_URL}/logout`,
//         method: 'POST',
//       }),
//     }),

//     tutorRegister: builder.mutation({
//       query: (data) => ({
//         url: `${TUTOR_URL}/register`,
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     tutorVerifyOtp: builder.mutation({
//       query: (data) => ({
//         url: `${TUTOR_URL}/otp`,
//         method: 'PUT',
//         body: data,
//       }),
//     }),

//     addCourse: builder.mutation({
//       query: (data) => ({
//         url: `${TUTOR_URL}/course/add`,
//         method: 'POST',
//         body: data,
//       }),
//     }),


//     getMyCourse: builder.query({
//       query: (id) => ({
//         url: `${TUTOR_URL}course`,
//         params: {
//           id: id
//         },
//       }),
//     }),
//   }),
// });



// export const { useGetCategoryQuery } = adminApiSlice;

import { apiSlice } from '../apiSlice';
// const TUTOR_URL = '/api/tutor';
import { TUTOR_URL } from '../../constants/tutorConstants';

export const tutorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tutorLogin: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    
    tutorLogout: builder.mutation({
      query: () => ({
        url: `${TUTOR_URL}/logout`,
        method: 'POST',
      }),
    }),

    tutorRegister: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    tutorVerifyOtp: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/otp`,
        method: 'PUT',
        body: data,
      }),
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/course/add`,
        method: 'POST',
        body: data,
      }),
    }),

    addLesson: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/course/add_lesson`,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useTutorLoginMutation,
  useTutorLogoutMutation,
  useTutorRegisterMutation,
  useTutorVerifyOtpMutation,
  useAddCourseMutation,
  useAddLessonMutation,
} = tutorApiSlice;
