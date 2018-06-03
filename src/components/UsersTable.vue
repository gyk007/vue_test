<template>
  <div>
    <b-table striped hover :items="userList" :fields="fields" v-if='userList'>      
        <template slot="edit" slot-scope="row">      
          <b-button size="sm"  @click="edit(row.item)"   class="mr-2">Edit</b-button>
          <b-button size="sm"  @click="deleteUserConfirm(row.item)" class="mr-2" variant="danger">Delete</b-button>     
        </template>
    </b-table>
      <b-modal v-model="openConfirmDeleteWnd" size="sm" title="Delete">
        <p>Delete User ?</p>
        <div slot="modal-footer" class="w-100"> 
          <b-button @click="deleteUser()" variant="danger">Delete</b-button>
          <b-button @click="openConfirmDeleteWnd = !openConfirmDeleteWnd" variant="primary">Cancel</b-button>        
        </div>
      </b-modal>
  </div>
</template>

<script>
import Store from '../store/store.js'

export default {
  name: 'UserTable',
  store: Store,
  computed: {    
    userList() {
      return this.$store.getters.userList 
    },
    selectedUser() {
      return this.$store.getters.selectedUser 
    }
  }, 
  data () {
    return {
     openConfirmDeleteWnd : false,     
      fields: {
        login: {
          label: 'Login',
          sortable: true
        },
        name: {
          label: 'Name',
          sortable: true
        },
        age: {          
          label: 'age',
          sortable: true
        },
        edit:{},
      },     
    }
  },
  methods: {   
    edit(user) {  
      let selectedUser = {}; 
      Object.assign(selectedUser, user)     
      this.$store.commit('set', {type: 'selectedUser',    items: selectedUser}) 
      this.$store.commit('set', {type: 'openAddEditWnd',  items: true})       
    },
    deleteUserConfirm(user) {
      this.$store.commit('set', {type: 'selectedUser',    items: user})
      this.$data.openConfirmDeleteWnd = true;           
    }, 
    deleteUser(){
      let userList = this.userList.filter((user) => {
        return user.id !==  this.selectedUser.id;
      });
    
      this.$store.commit('set', {type: 'userList',        items: userList})

      this.$data.openConfirmDeleteWnd = false; 
    }    
  }, 
  beforeCreate: function() {
    this.$store.dispatch('getUserList')
  } 
}
</script>