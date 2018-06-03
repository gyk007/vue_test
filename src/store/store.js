import Vue   from 'vue'
import Vuex  from 'vuex' 
import Conf  from '../conf/conf.js'
import axios from 'axios'; 

Vue.use(Vuex) 

const store = new Vuex.Store({
	state: {
		openAuthWnd    : false,
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
			axios.post('/questions/1', state.user).then(({data}) => {
                this.feedback = true;
            });

			commit('set', {type: 'openAuthWnd',  items: false}) 
		},
		getUserList({state, commit}){
			console.log('sdffdsfdsdsdsdsf')
			let items = [
		        { id: 1, age: 40, login: 'dickerson@gmail.com', name: 'Macdonald' },
		        { id: 2, age: 21, login: 'larsen@gmail.com', name: 'Shaw' },
		        { id: 3, age: 89, login: 'geneva@gmail.com', name: 'Wilson' },
		        { id: 4, age: 38, login: 'jami@gmail.com',   name: 'Carney' }
	     	]

	     	commit('set', {type: 'userList',  items: items}) 
		}
	}
})

export default store