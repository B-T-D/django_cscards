import axios from 'axios';

export const apiUrlRoot = 'http://127.0.0.1:8000/api/v1/';
const apiUrlRefreshToken = apiUrlRoot + 'token/refresh/';

export const axiosInstance = axios.create({
    baseURL: apiUrlRoot,
    timeout: 5000,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('access_token'),
    }
})

axiosInstance.interceptors.response.use(
    /* Handles refreshing the access token if the one currently in localStorage
        has expired. Intercepts the request, refreshes the token (if possible),
        then lets the original request continue on its way. */

    /* TODO if there's no refresh token in local storage, this appears to
        infinitely spam the refresh endpoint with post requests.

        Checking in the main if statement below didn't appear to fix it. (i.e.
        && if refresh token not null).

        Root cause may be in getCards() or elsewhere in app.

        */
    response => response,
    error => {


        const originalRequest = error.config;

        /* TODO it's not looping in the main if here. Confirmed by setting a
            counter variable--it never got above 1. */

        /* TODO observed: Logging in and adding a card is the only known thing
            that breaks the loop. Even closing out of the tab doesn't work.
            TRY: Write the tokens to garbage values instead of null. */

         /* TODO: Seems to be solved. There was a syntax typo in the method bind
                for the clear-refresh-token button. */


        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        const refresh_token = localStorage.getItem('refresh_token');


        return axiosInstance.post(apiUrlRefreshToken, {refresh: refresh_token})
        .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            axiosInstance.defaults.headers["Authorization"] =  "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] = "Bearer " + response.data.access;

            return axiosInstance(originalRequest);
        })
        .catch(error => {
            console.log(error);
        })
    }



        return Promise.reject(error);
    }
);