import axios from 'axios'
import { getSession } from 'next-auth/react'
import {BASE_URL} from "./axios.js"

const ApiClient = () => {
    const instance = axios.create({
        baseURL: BASE_URL
    })
    instance.interceptors.request.use(async (request) => {
        const session = await getSession()
        console.log("Access token , ",session.user.accessToken);

        if (session) {
            request.headers.common = {
                Authorization: `Bearer ${session.user.accessToken}`
            }
        }
        return request
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(`error`, error)
        }
    )

    return instance
}


export default ApiClient()

// https://stackoverflow.com/questions/71195813/how-to-use-an-axios-interceptor-with-next-auth
