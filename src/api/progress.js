import {ElLoading} from "element-plus";
import {CircularProgress} from "mdui";

const circular_instance = {
    _target: null,
    _count: 0
}

export function show_progress() {
    circular_instance._count++
    if (circular_instance._count === 1) {
        circular_instance._target = ElLoading.service({ text: "加载中..." });
    }
}

export function close_progress() {
    if (circular_instance._count > 0) {
        circular_instance._count--
    }
    if (circular_instance._count === 0) {
        if (circular_instance._target !== null) {
            circular_instance._target.close()
        }
        circular_instance._target = null
    }
}


