import {store_exists, store_get, store_save} from "./storage.js";
import {setTheme} from "mdui";
import {useColorMode, useDark} from "@vueuse/core";
import {StyleProvider, Themes} from "@varlet/ui";

export function on_mounted(use_dark_method, use_toggle_method) {
    if (!store_exists("vueuse-color-scheme")) {
        store_save("vueuse-color-scheme", "auto")
    }

    let current = store_get("vueuse-color-scheme")
    if (current !== "light" && current !== "dark" && current !== "auto") {
        current = "light"
    }

    set_theme(current, use_dark_method, use_toggle_method);
}

export function toggle_theme(use_dark_method, use_toggle_method) {
    let current = store_get("vueuse-color-scheme")
    if (current !== "light" && current !== "dark" && current !== "auto") {
        current = "auto"
        store_save("vueuse-color-scheme", "auto");
    }

    let target = current === "light" ? "dark" : "light";
    if (current === "light") {
        target = "dark";
    }
    if (current === "dark") {
        target = "light";
    }
    if (current === "auto") {
        target = useColorMode().system.value === "light" ? "dark" : "light";
    }

    let transition = document.startViewTransition(() => {
        set_theme(target, use_dark_method, use_toggle_method)
    })

    transition.ready.then(() => {
        document.documentElement.animate(
            {},
            {
                duration: 500,
                pseudoElement: "::view-transition-new(root)"
            }
        )
    })
}

export function set_theme(target, use_dark_method, use_toggle_method) {
    let isDark = use_dark_method()
    if (isDark.value) {
        setTheme("dark")
        StyleProvider(Themes.md3Dark)
        if (target === "light") {
            use_toggle_method(isDark)()
        }
    } else {
        setTheme("light")
        StyleProvider(Themes.md3Light)
        if (target === "dark") {
            use_toggle_method(isDark)()
        }
    }
}