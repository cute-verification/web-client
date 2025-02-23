import service from "./services.js";

export function info_server(then) {
    get({
        url: "/info/server"
    }).then(then)
}

export function login(username, password, then) {
    post({
        url: "/admin/login",
        params: {
            username: username,
            password: password,
        }
    }).then(then)
}

export function change_password(old_password, new_password, then) {
    put({
        url: "/admin/password",
        params: {
            old: old_password,
            new: new_password
        }
    }).then(then)
}

export function logout(then) {
    post({
        url: "/admin/logout"
    }).then(then)
}

export function users(page, then) {
    if (page === undefined) {
        get({
            url: "/users/list",
        }).then(then)
        return;
    }

    get({
        url: "/users/list",
        params: {
            page: page
        }
    }).then(then)
}

export function search_users(username, then) {
    get({
        url: "/users/search",
        params: {
            username: username,
        }
    }).then(then)
}

export function user_info(id, then) {
    get({
        url: '/users/info',
        params: {
            id: id
        }
    }).then(then)
}

export function records(page, then) {
    if (page === undefined) {
        get({
            url: "/records/list",
        }).then(then)
        return;
    }

    get({
        url: "/records/list",
        params: {
            page: page
        }
    }).then(then)
}

export function search_records(message, then) {
    get({
        url: "/records/search",
        params: {
            message: message,
        }
    }).then(then)
}

export function identifications(page, link, then) {
    if (page === undefined) {
        get({
            url: "/identifications/list",
            params: {
                link: link
            }
        }).then(then)
        return
    }

    get({
        url: "/identifications/list",
        params: {
            page: page
        }
    }).then(then)
}

export function search_identifications(code, link, then) {
    get({
        url: "/identifications/search",
        params: {
            code: code,
            link: link
        }
    }).then(then)
}

export function identification_info(id, then) {
    get({
        url: '/identifications/info',
        params: {
            id: id
        }
    }).then(then)
}

export function restrictions(page, link, then) {
    if (page === undefined) {
        get({
            url: "/restrictions/list",
            params: {
                link: link
            }
        }).then(then)
        return
    }

    get({
        url: "/restrictions/list",
        params: {
            page: page,
            link: link
        }
    }).then(then)
}

export function restriction_info(id, then) {
    get({
        url: '/restrictions/info',
        params: {
            id: id
        }
    }).then(then)
}

export function restriction_affected_identifications(id, link, then) {
    get({
        url: `/query/restriction/${id}/identifications`,
        params: {
            link: link
        }
    }).then(then)
}

export function restriction_affected_users(id, then) {
    get({
        url: `/query/restriction/${id}/users`,
    }).then(then)
}

export function user_identification_sources(user_id, link, then) {
    get({
        url: `/query/user/${user_id}/identification/sources`,
        params: {
            link: link
        }
    }).then(then)
}

export function user_available_restrictions(user_id, link, then) {
    get({
        url: `/users/restrictions`,
        params: {
            id: user_id,
            link: link,
            status: "available"
        }
    }).then(then)
}

export function user_expired_restrictions(user_id, link, then) {
    get({
        url: '/users/restrictions',
        params: {
            id: user_id,
            link: link,
            status: 'expired'
        }
    }).then(then)
}

export function identification_available_restrictions(identification_id, link, then) {
    get({
        url: `/identifications/restrictions`,
        params: {
            id: identification_id,
            link: link,
            status: 'available'
        }
    }).then(then)
}

export function identification_expired_restrictions(identification_id, link, then) {
    get({
        url: `/identifications/restrictions`,
        params: {
            id: identification_id,
            link: link,
            status: 'expired'
        }
    }).then(then)
}

export function create_restriction(start_at, expire_at, targets, then) {
    post({
        url: '/restrictions/create',
        data: {
            "start-at": start_at,
            "expire-at": expire_at,
            targets: targets
        }
    }).then(then)
}

export function delete_restriction(id, then) {
    delete_({
        url: '/restrictions/delete',
        params: {
            id: id
        }
    }).then(then)
}

export function restore_restriction(id, then) {
    put({
        url: '/restrictions/restore',
        params: {
            id: id
        }
    }).then(then)
}

const get = (config) => {
    return service({
        ...config,
        method: 'get',
        params: config.params
    })
}

const post = (config) => {
    return service({
        ...config,
        method: 'post',
        params: config.params
    })
}

const put = (config) => {
    return service({
        ...config,
        method: 'put',
        params: config.params
    })
}

const delete_ = (config) => {
    return service({
        ...config,
        method: 'delete',
        params: config.params
    })
}

export {
    get,
    post,
}