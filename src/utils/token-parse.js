import {jwtDecode} from "jwt-decode";
import {current_token} from "./storage.js";

export function decode_token(token) {
    return jwtDecode(token);
}

export function token_username(token) {
    if (token === undefined) {
        token = current_token()
    }

    const decoded = decode_token(token)
    return decoded["sub"]
}