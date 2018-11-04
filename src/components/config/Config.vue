<template>
<div class="wrapper">
    <div class="form">
        <form>
            <Time :time="from" label="Desde" name="from" @changeConfig="changeConfig"/>
            <br>
            <Time :time="to" label="Hasta" name="to" @changeConfig="changeConfig"/>
            <br>
            <router-link to="/" tag="button">Regresar</router-link>
        </form>
    </div>
</div>
</template>

<script>
import {db} from '../../db.js'
import Time from './Time.vue'
/* eslint-disable */
export default {
    data(){
        return{
        }
    },
    components:{
        Time
    },
    firebase: {
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
</style>
