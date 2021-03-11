import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-solidification'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		subfile:''
	},
	plugins:[
		// createPersistedState()
	],
	mutations:{
	},
	actions:{
		
	},
	getters:{
		
	},
	modules:{
		
	}
})

export default store