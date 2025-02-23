
const SUCCESS = 100
const FAIL = 101
const ALREADY_EXISTS = 102
const NOT_FOUND = 103
const FOUND = 104
const UNAUTHORIZED = 105
const FORBIDDEN = 106

export function localize(code) {
    switch (code) {
        case SUCCESS: return "成功"
        case FAIL: return "失败"
        case ALREADY_EXISTS: return "对象已存在"
        case NOT_FOUND: return "找不到对象"
        case FOUND: return "找到对象"
        case UNAUTHORIZED: return "令牌异常"
        case FORBIDDEN: return "无权操作"
    }
}

export {
    SUCCESS,
    FAIL,
    ALREADY_EXISTS,
    NOT_FOUND,
    FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

