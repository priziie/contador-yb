<template>
    <div> 
        <div  v-for="(e,i) in events" :key="i" class="prueba">
            <input type="button" value="Eliminar" class="eliminar" @click="deleteConfig(e['.key'])">
            <Time :time="e.from" label="Desde" :name="e['.key']+'/from'" @changeConfig="changeConfig"/>
            <br>
            <Time :time="e.to" label="Hasta" :name="e['.key']+'/to'" @changeConfig="changeConfig"/>
            
            <hr>
        </div>
        <input type="button" class="addNew" value="Agregar horas a bloquear" @click="addNewEvent">
        <!-- <div v-for="(e,i) in newEvents" :key="i" class="prueba">
            <Time :time="e.from" label="Desde" name="events/from" @changeConfig="changeConfig"/>
            <br>
            <Time :time="e.to" label="Hasta" name="events/to" @changeConfig="changeConfig"/>
            
            <hr>
        </div> -->
    </div>
</template>

<script>
import {db} from '../../db.js'

/* eslint-disable */
import Time from './Time.vue'
export default {
    components: {
        Time
    },
    firebase:{
        events: db.ref('config/events'),
        from: {
            source: db.ref('config/from'),
            asObject: true
        },
        to: {
            source: db.ref('config/to'),
            asObject: true
        }
    },
    props: ['min','max'],
    methods:{
        changeConfig(namechild, value){
            console.log("entre en events name ", namechild, " val ", value);
            this.$emit('changeConfig',namechild, value);
            db.ref('config/events').child(namechild).set(value);
        },
        deleteConfig(id){
            console.log("entre en delete name", id);
            db.ref('config/events').child(id).remove();
        },
        addNewEvent(){
            db.ref('config').child("events").push({
                from:{
                    ampm: this.from.ampm,
                    hour: this.from.hour,
                    minutes: this.from.minutes
                },
                to:{
                    ampm: this.from.ampm,
                    hour: this.from.hour,
                    minutes: this.from.minutes
                }
            })
        }
    }
}
</script>

<style scoped>

.addNew{
    margin-bottom: 20px;
    outline: 0;
    background: #5B8F95;
    border: 0;
    padding: 5px 15px;
    color: #FFFFFF;
    font-size: 14px;
}
.eliminar{
    margin-bottom: 0px;
    outline: 0;
    background: #5B8F95;
    border: 0;
    padding: 3px 10px;
    color: #FFFFFF;
    font-size: 12px;
    display: flex;
}
input[type='button']:hover,
input[type='button']:active,
input[type='button']:focus {
    background: #52A0AA;
}
</style>

