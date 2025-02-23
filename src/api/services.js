import axios from "axios";
import {delete_token, current_token, current_url, save_url} from "../utils/storage.js";
import {close_progress, show_progress} from "./progress.js";
import router from "../router/index.js";
import {UNAUTHORIZED} from "./result_handler.js";

export let server_url

if (current_url()) {
    server_url = current_url()
} else {
    server_url = "http://localhost:8888"
    save_url("http://localhost:8888")
}

const service = axios.create({
    baseURL: server_url + "/api/v1",
    timeout: 10000
})

service.interceptors.request.use(
    config => {
        const url = config.url
        if (require_progress(url)) {
            show_progress()
        }

        if (require_token(url)) {
            config.headers.Authorization = current_token()
        }

        return config;
    },
    error => {
        console.log("request failed: ", error);
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        close_progress()

        const body = response.data
        if (body["code"] === UNAUTHORIZED) {
            delete_token()
            router.push("/admin/login")
        }

        return response.data;
    },
    error => {
        close_progress()
        console.log("response failed: ", error);
        Promise.reject(error)
    }
)

export function require_progress(url) {
    if (url === "/info/server" || url === "/info/server/") {
        return false
    }
    return true
}

export function require_token(url) {
    if (url === "/admin/login" || url === "/admin/login/") {
        return false
    }
    return true
}

export default service;