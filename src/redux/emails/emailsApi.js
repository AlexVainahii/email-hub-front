import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emailsApi = createApi({
  reducerPath: 'emails',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://email-hub.onrender.com/emails',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Emails'],

  endpoints: builder => ({
    getEmailsFromBox: builder.query({
      query: ({ _id, path, page }) => ({
        url: `/getEmailsFromBox?_id=${_id}&path=${path}&page=${page}`,
        method: 'GET',
      }),

      invalidatesTags: ['Emails'],
    }),
    getEmailsFromSearch: builder.query({
      query: ({ _id, path, search }) => ({
        url: `/getEmailsFromSearch?_id=${_id}&path=${path}&search=${search}`,
        method: 'GET',
      }),

      invalidatesTags: ['Emails'],
    }),
    getAllBox: builder.query({
      query: data => ({
        url: `/`,
        method: 'GET',
      }),
      invalidatesTags: ['Emails'],
    }),

    getMailOne: builder.query({
      query: ({ id, path, uid }) => ({
        url: `/getMailOne/${id}?path=${path}&uid=${uid}`,
        method: 'GET',
      }),
      invalidatesTags: ['Emails'],
    }),
    createImapEmail: builder.mutation({
      query: data => ({
        url: '/addBoxImap/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Emails'],
    }),

    editImapEmail: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Emails'],
    }),

    deleteImapEmail: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Emails'],
    }),
  }),
});

export const {
  useGetEmailsFromBoxQuery,
  useGetEmailsFromSearchQuery,
  useGetAllBoxQuery,
  useGetMailOneQuery,
  useCreateImapEmailMutation,
  useEditImapEmailMutation,
  useDeleteImapEmailMutation,
} = emailsApi;
