<template>
    <div class="login-page">
        <div class="form">
          <h3>Login</h3>
          <form class="login-form">
            <input type="text" v-model="email" placeholder="email"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button @click="signIn">Ingresar</button>
            <p class="message">Si no tiene cuenta, haga click <router-link to="/signup">aquí</router-link></p>
            <p class="message"><router-link to="/login">Inicio</router-link></p>
          </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
/* eslint-disable */
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        signIn: function(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('/config');
                },
                function(err){
                    console.log("Error ");
                }
            )
        }
    }
}
</script>

<style scoped src="./style.css"></style>
