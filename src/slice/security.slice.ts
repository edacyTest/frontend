import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Crée un service API pour la connexion
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { uaName: username, uaPassword: password },
      }),
    }),

    getUsers: builder.query<any[], void>({
      query: () => '/user',
      providesTags: ['User'],
    }),

    getUserById: builder.query<any, number>({
      query: (id) => `/user/${id}`,
      providesTags: ['User'],
    }),

    addUser: builder.mutation<any[], {name:string, age:number}>({
      query:({name, age}) => ({
        url : '/user',
        method : 'POST',
        body : {name,age},
      })
    }),

    updateUser: builder.mutation<any, { id: number; name: string; age: number }>({
      query: ({ id, name, age }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: { name, age },
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'], // Invalide le tag 'User' après une suppression réussie
    }),
  }),
});

export const { useLoginUserMutation, useGetUsersQuery, useDeleteUserMutation , useAddUserMutation, useGetUserByIdQuery, useUpdateUserMutation} = authApi;