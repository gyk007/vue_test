<template> 
	<div>
		<b-modal v-model="openAddEditWnd"  :title="title" size="sm"  no-close-on-backdrop centered>		   
			<b-form-input v-model="selectedUser.login"    type="email"      placeholder="Enter user login"    style='margin-bottom: 10px;'></b-form-input>
			<b-form-input v-model="selectedUser.password" type="password"   placeholder="Enter user password" style='margin-bottom: 10px;'></b-form-input> 
			<b-form-input v-model="selectedUser.name"     type="text"       placeholder="Enter user password" style='margin-bottom: 10px;'></b-form-input> 
			<b-form-input v-model="selectedUser.age"      type="number"     placeholder="Enter user password" style='margin-bottom: 10px;'></b-form-input> 
			<div slot="modal-footer" class="w-100"> 
				<b-button @click="Save" variant="success">Save</b-button>        
			</div>
		</b-modal>
	</div>	 
</template>

<script>
import Store from '../store/store.js';  

export default {
	name: 'AddEditWnd',
	store: Store,	 
	computed: {		 
		selectedUser(){      
			return this.$store.getters.selectedUser
		},
		title () {
			if (this.$store.getters.selectedUser.id) {
				return 'Edit User'
			} else {
				return 'Add User'
			}
		},
		userList() {
      		return this.$store.getters.userList 
    	},
		openAddEditWnd : {
			get()  {
				return this.$store.getters.openAddEditWnd  
			},
			set (newValue) {				 
				this.$store.commit('set', {type: 'openAddEditWnd',  items: newValue});
			} 		 
		} 
	}, 	 
	methods: {
		Save() { 
			if (this.selectedUser.id) {
				this.userList.forEach((user) => {
					if (user.id == this.selectedUser.id) {
						Object.assign(user, this.selectedUser);
						this.$store.commit('set', {type: 'openAddEditWnd',  items: false});
						return; 
					}
				})
			}  else {
				let idArr = [];
				this.userList.forEach((user) => {
					idArr.push(user.id)
				});
				let maxId =  Math.max.apply(null, idArr);
				this.selectedUser.id = ++maxId;				 
				this.userList.push(this.selectedUser);
				this.$store.commit('set', {type: 'openAddEditWnd',  items: false}); 
			}		 
		},   
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
