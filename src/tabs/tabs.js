
export function add_tab(tabs, content) {
    const current_tab_list = tabs.tabs
    const last_tab = current_tab_list[current_tab_list.length - 1]
    const last_key = last_tab["tab"]
    const new_key = last_key + 1

    const new_tab = {
        ...last_tab,
        key: new_key,
        innerHTML: content,
        innerText: content,
        outerText: content,
        textContent: content
    }
}