<template>
<div class="wrapper">
    <div class="form">
        <form>
            <Time :time="from" label="Desde" name="from" @changeConfig="changeConfig"/>
            <br>
            <Time :time="to" label="Hasta" name="to" @changeConfig="changeConfig"/>
            <br>
            <textarea v-model="infoText" @focusout="setInfoText" placeholder="Texto informativo"></textarea>
            <br>
            <Events/>
            <router-link to="/" tag="button">Regresar</router-link>
        </form>
    </div>
</div>
</template>

<script>
import {db} from '../../db.js'
import Time from './Time.vue'
import Events from './Events.vue'
/* eslint-disable */
export default {
    data(){
        return{
            infoText: ''
        }
    },
    created(){
        var th = this;
        var infTexRef = db.ref('config/infoText');
        infTexRef.once('value', function(snapshot) {
            th.infoText = snapshot.val();
        });
    },
    components:{
        Time,
        Events
    },
    firebase: {
        // events: db.ref('config/events'),
        from: {
            source: db.ref('config/from'),
            // optionally bind as an object
            asObject: true
        },
        to: {
            source: db.ref('config/to'),
            asObject: true
        }
    },
    methods:{
        changeConfig(name, value){
            console.log("entre en config");
            db.ref('config').child(name).set(value);
        },
        setInfoText(){
            console.log("entre en info text");
            db.ref('config').child("infoText").set(this.infoText);
        }
    }
}
</script>

<style scoped>
.wrapper {
  width: 400px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  background: #FFFFFF;
  max-width: 400px;
  margin: 0 auto 50px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form button {
  text-transform: uppercase;
  outline: 0;
  background: #5B8F95;
  width: 140px;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
}
.form button:hover,.form button:active,.form button:focus {
  background: #52A0AA;
}
.form textarea{
    width: 300px;
    border-color: rgb(221, 221, 221);
    margin: 0px;
    height: 85px;
    margin-bottom: 10%;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
