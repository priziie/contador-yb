<template>
    <div class="login-page">
        <div class="form">
          <h3>Registro</h3>
          <form class="login-form">
              <input type="text" v-model="email" placeholder="email"/>
              <input type="password" v-model="password" placeholder="password"/>
              <button @click="signUp">Registrase</button>
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
        signUp(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function(user){
                    alert("Registro exitoso");
                    //this.$router.replace('/config'); // more on: https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
                },
                function(err){
                    alert("nop");
                }
            )
        }
    }
}
</script>

<style scoped src="./style.css"></style>
