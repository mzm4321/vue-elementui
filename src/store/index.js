import Vue from 'vue';
import Vuex from 'vuex';
import activeIndex from './activeIndex'
import menu from "./menu";
import user from "./user";
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        activeIndex,
        menu,
        user
    }
})