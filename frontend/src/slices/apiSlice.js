import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// as we have included the proxy so don't need to write the proxy down here as "http://localhost/5000"
const baseQuery = fetchBaseQuery({baseUrl: ''})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder)=> ({})
})