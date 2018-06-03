<template>
	<div>	 
		<b-modal v-model="openAuthWnd"  title="Log In" size="sm"  no-close-on-backdrop hide-header-close centered>
			<b-alert :show='loginError' variant="danger">You entered an incorrect Email.</b-alert>        
			<b-form-input v-model="user.login" type="email" placeholder="Enter your login" style='margin-bottom: 10px;'></b-form-input>
			<b-form-input v-model="user.password" type="password" placeholder="Enter your password" style='margin-bottom: 10px;'></b-form-input> 
			<div slot="modal-footer" class="w-100"> 
				<b-button @click="logIn()" variant="success">Log in</b-button>        
			</div>
		</b-modal>  
	</div>
</template>

<script>
import Store      from '../store/store.js'; 
export default {
	name: 'AuthWnd', 
	store: Store, 
	computed: {
		openAuthWnd : {  
			get()  {
				 return this.$store.getters.openAuthWnd  
			},
			set () {
				return undefined;
			}          
		},
		user(){      
			return this.$store.getters.user
		}		 
	}, 
	data () {
		return { 
			loginError: false,			 
		}
	},
	methods: {
		logIn() {       
			if (!/\S+@\S+\.\S+/.test(this.user.login )) {    
				this.$data.loginError = true;   
				return;
			}
			this.$data.loginError = false;
			this.$store.dispatch('auth');
		}		 
	}
}
</script> 