import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store= new Vuex.Store({
	state:{
		historyList:uni.getStorageSync('__history') || []
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state,history){
			state.historyList = []
		}
	},
	actions:{
		set_history({commit,state},history) {
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync('__history',list)
			commit('SET_HISTORY_LIST',list)
		},
		clear_history({commit}) {
			// uni.setStorageSync('__history',[])
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store