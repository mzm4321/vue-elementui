export default {
    state: {
        activeIndex: ""
    },
    mutations: {
        collapseMenu(state, path) {
            state.activeIndex = path
            console.log("++++"+state.activeIndex)
        }
    }
}