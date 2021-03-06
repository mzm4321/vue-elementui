
export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            localStorage.setItem('token',val)
            console.log(state.token)
        },
        clearToken(state){
            state.token=''
            localStorage.removeItem('token')
        },
        getToken(state){
            state.token=state.token||localStorage.getItem('token')
        }
    }
}