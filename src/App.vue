<template>
	<div id="app">     
		<b-navbar toggleable="md" type="dark" variant="info" v-if='!openAuthWnd'>
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
			<b-navbar-brand href="#">Menu</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				
				<b-navbar-nav>
					<b-nav-item v-for='(m, index) in menu' :key="index" :href="m.url" active>{{m.title}}</b-nav-item>      
				</b-navbar-nav>

				 <b-navbar-nav class="ml-auto">		        
			        <b-button size="sm" class="my-2 my-sm-0" @click='addUser()'>Add User</b-button>		      
			    </b-navbar-nav>		 
			</b-collapse>
		</b-navbar>

		<UsersTable v-if='!openAuthWnd'></UsersTable>
		<AuthWnd></AuthWnd>
		<AddEditUserWnd></AddEditUserWnd>
	</div>
</template> 

<script>
import Store          from './store/store.js';
import UsersTable     from './components/UsersTable.vue';
import AuthWnd        from './components/AuthWnd.vue';
import AddEditUserWnd from './components/AddEditUserWnd.vue';

export default {
	name: 'VueTest',
	store: Store,
	components: {
		AuthWnd,
		UsersTable,
		AddEditUserWnd		 
	},
	computed: {
		openAuthWnd() {			 
			return this.$store.getters.openAuthWnd			       
		},	
		menu(){      
			return this.$store.getters.menu
		}, 
	}, 
	methods: {	
		addUser() {
			let selectedUser = {
				login    : undefined,      
				password : undefined,
				name     : undefined,
				age      : undefined 
			};

			this.$store.commit('set', {type: 'selectedUser',    items: selectedUser}) 
			this.$store.commit('set', {type: 'openAddEditWnd',  items: true})
		}   
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 0px;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
