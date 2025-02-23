const TOKEN_KEY = "token"
const URL_KEY = "url"

export function current_token() {
    return localStorage.getItem(TOKEN_KEY)
}

export function save_token(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function delete_token() {
    localStorage.removeItem(TOKEN_KEY)
}

export function store_exists(key) {
    return store_get(key) != null
}

export function store_get(key) {
    return localStorage.getItem(key)
}

export function store_save(key, value) {
    localStorage.setItem(key, value)
}

export function current_url() {
    return localStorage.getItem(URL_KEY)
}

export function save_url(url) {
    localStorage.setItem(URL_KEY, url)
}