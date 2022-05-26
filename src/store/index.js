import { createStore } from "vuex";
import router from '../router/'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0,
    },
  },
  mutations: {
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload);
      localStorage.setItem('tareas1', JSON.stringify(state.tareas))
    },
    delete(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload);
      localStorage.setItem('tareas1', JSON.stringify(state.tareas))
    },
    edit(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/');
        return;
      }
      state.tarea = state.tareas.find(item => item.id === payload);
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/')
      localStorage.setItem('tareas1', JSON.stringify(state.tareas))
    },

  },
  actions: {
    cargarLocalStorage({commit}){
      if(localStorage.getItem('tareas1')){
        console.log('existe');
        const tareas = JSON.parse(localStorage.getItem('tareas1'));
        commit('cargar', tareas);
      } else {
        localStorage.setItem('tareas1', JSON.stringify([]));
      }
    },
    setTareas({ commit }, tarea) {
      commit("set", tarea);
    },
    deleteTareas({ commit }, id){
      commit('delete', id);
    },
    editTarea({ commit }, id) {
      commit("edit", id);
    },
    updateTarea({commit}, tarea){
      commit('update', tarea )
    }
  },
  modules: {},
});
