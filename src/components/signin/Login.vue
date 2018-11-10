<template>
    <div class="login-page">
        <div class="form">
          <h3>Login</h3>
          <form class="login-form">
            <input type="text" v-model="username" placeholder="username"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button @click="signIn">Ingresar</button>
            <p class="message"><router-link to="/">Inicio</router-link></p>
          </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../db.js'

var userRef = db.ref('admin');
/* eslint-disable */
export default {
    data(){
        return{
            username: '',
            password: ''
        }
    },
    firebase:{
        users: userRef
    },
    computed:{
        findByUser(){
            return this.users.filter((u) => u.username == this.username)[0].email;
        },
    },
    methods:{
        signIn: function(){
            if(this.username != "" && this.password != ""){
                let email = this.findByUser;
                firebase.auth().signInWithEmailAndPassword(email, this.password).then(
                    (user) => {
                        this.$router.replace('/config');
                    },
                    function(err){
                        alert("Credenciales incorrectas");
                        console.log("Error ");
                    }
                )
            }
        }
    }
}
</script>

<style scoped src="./style.css"></style>
