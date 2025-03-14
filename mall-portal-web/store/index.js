// import Vue from 'vue'
import {createStore } from 'vuex'
import * as Vue from 'vue';

import app from '../main.js';
// 使用 app 实例
// app.component('Vuex', Vuex);
// Vue.use(Vuex)

const store = createStore({
  state: {
		hasLogin: false,
		userInfo: {},
	},
  mutations: {
  	login(state, provider) {
  
  		state.hasLogin = true;
  		state.userInfo = provider;
  		uni.setStorage({//缓存用户登陆状态
  		    key: 'userInfo',  
  		    data: provider  
  		}) 
  		console.log(state.userInfo);
  	},
  	logout(state) {
  		state.hasLogin = false;
  		state.userInfo = {};
  		uni.removeStorage({  
              key: 'userInfo'  
          });
  		uni.removeStorage({
  		    key: 'token'  
  		})
  	}
  },
  actions: {
  
  }
});

// const store = new Vuex.Store({
// 	state: {
// 		hasLogin: false,
// 		userInfo: {},
// 	},
// 	mutations: {
// 		login(state, provider) {

// 			state.hasLogin = true;
// 			state.userInfo = provider;
// 			uni.setStorage({//缓存用户登陆状态
// 			    key: 'userInfo',  
// 			    data: provider  
// 			}) 
// 			console.log(state.userInfo);
// 		},
// 		logout(state) {
// 			state.hasLogin = false;
// 			state.userInfo = {};
// 			uni.removeStorage({  
//                 key: 'userInfo'  
//             });
// 			uni.removeStorage({
// 			    key: 'token'  
// 			})
// 		}
// 	},
// 	actions: {
	
// 	}
// })

export default store
