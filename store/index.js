import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store= new Vuex.Store({
	state:{
		historyList:uni.getStorageSync('__history') || [],
		userinfo:uni.getStorageInfo('USER_INFO') || {}
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state,history){
			state.historyList = []
		},
		USER_INFO(state,userinfo) {
			
			state.userinfo = userinfo
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
		},
		set_userinfo({commit},userinfo) {
			uni.setStorageSync('USERINFO',userinfo)
			commit('USER_INFO',userinfo)
		}
	}
})

export default store