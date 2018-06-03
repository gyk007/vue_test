import Vue   from 'vue'
import Vuex  from 'vuex' 
import Conf  from '../conf/conf.js'
import axios  from 'axios'
import moxios from 'moxios'  

Vue.use(Vuex) 

const store = new Vuex.Store({
	state: {
		openAuthWnd    : true,
		userList       : [],
		openAddEditWnd : false,		 
		selectedUser : {
			id       : undefined,
			login    : undefined,      
			password : undefined,
			name     : undefined,
			age      : undefined 
		}, 
		user : {		 
			login    : undefined,      
			password : undefined, 
		},
		menu: [
			{url: '#', title: 'Users'}
		],
	},
	getters: {
		openAuthWnd(state) {
			return  state.openAuthWnd
		}, 
		user(state) {
			return  state.user
		},
		userList(state){
			return  state.userList
		},
		selectedUser(state){
			return  state.selectedUser
		},
		selectedUser(state){
			return  state.selectedUser
		},
		menu(state){
			return  state.menu
		},
		openAddEditWnd(state){
			return  state.openAddEditWnd
		}
	},
	mutations: {
		set(state, {type, items}) {
			state[type] = items
		}, 
	},
	actions: {
		auth({state, commit}){
			moxios.withMock(function () {					 
				let  onFulfilled = function(response) {					 
					if (response) {
						commit('set', {type: 'openAuthWnd',  items: false})
						commit('set', {type: 'user',         items: response.data.user}) 
					}
				}
			
				axios.post(Conf.url.auth, state.user).then(onFulfilled);				 	 
			
				moxios.wait(function () {
					let request = moxios.requests.mostRecent()											 
					request.respondWith({
						status: 200,
						response: {
							user : {
								id: 12345,
								firstName: 'Andrey', 
								age: 29
							}
						}
				}).then(function () {
						onFulfilled()						 
					})
				})
			})			 
		},
		getUserList({state, commit}){
			moxios.withMock(function () {					 
				let  onFulfilled = function(response) {				 
					if (response) {
						commit('set', {type: 'userList',  items: response.data.users}) 
					}
				}
			
				axios.get(Conf.url.userList, state.user).then(onFulfilled);				 	 
			
				moxios.wait(function () {
					let request = moxios.requests.mostRecent()						 
					request.respondWith({
						status: 200,
						response: {
							users : [
								{ id: 1, age: 40, login: 'dickerson@gmail.com', name: 'Macdonald' },
								{ id: 2, age: 21, login: 'larsen@gmail.com', name: 'Shaw' },
								{ id: 3, age: 89, login: 'geneva@gmail.com', name: 'Wilson' },
								{ id: 4, age: 38, login: 'jami@gmail.com',   name: 'Carney' }
							]
						}
				}).then(function () {
						onFulfilled()						 
					})
				})
			})			 
		}
	}
})

export default store