<template>
<div>
    <img src="config.png" alt="" @click="goToConfig">
    <section class="todo">
        <ul class="todo-list">
            <li class="right date">{{ date }}</li>
            <li class="time" v-if="timePerPerson != '-'">
                Para que todas puedan pasar,<br/> cada una tiene {{timePerPerson}}</li>
            <li class="separator" v-else></li>

            <li v-if="infoText != ''">
                {{ infoText }}
            </li>
            <div class="pending-list">
            <List :items="pending" nameProp="pending" :status="false" @disable="disablePeople"/>
            </div>
            
            <div class="add-list">
            <li>
                <input type="checkbox" id="pnew"/> 
                <label class="toggle" for="pnew"></label>
                <input type="text" 
                placeholder="Escribe tu nombre.." 
                v-model="people"
                @focusout="addPeople"
                @keydown.enter="addPeople" />
            </li>
            </div>
            
            <li>
            </li>
            <div class="done-list">
            <List :items="done" nameProp="done" :status="true"/>
            
            </div>
        </ul>
    </section>
</div>
</template>

<script>
import List from './List';

import {db} from '../../db.js'

/* eslint-disable */
var peopleRef = db.ref('people');

export default {
    components:{
        List
    },
    data(){
        return {
            people: "",
            curDate: new Date(),
            minVal: '',
            maxVal: '',
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
    firebase() {
       return{
           list: peopleRef.orderByChild('date').equalTo(this.shortDate),
           from: {
                source: db.ref('config/from'),
                asObject: true
            },
            to: {
                source: db.ref('config/to'),
                asObject: true
            }
       } 
    },
    computed:{
        done(){
            return this.list.filter((people) => people.status);
        },
        pending(){
            let newList = this.list.filter((people) => !people.status);
            // si hay mas de una pendiente, haacer el calculo
            let totalPeople = newList.length;
            if(totalPeople > 1){

                //tiempo estimado en milisecungo
                let val = this.totalEstimatedTime();
                var countTime = this.minVal;
                let options = { hour12: true, hour: 'numeric', minute: 'numeric' };
                //lo que tienen en milisegundos
                val = val/totalPeople;
                
                newList = newList.map((x) =>{
                    //primero, transformo a horas el valor
                    let timeFrom= new Date(countTime).toLocaleTimeString('es-SV', options);
                    // sumo el tiempo que le queda
                    countTime+=val;
                    let timeTo= new Date(countTime).toLocaleTimeString('es-SV', options);
                    let time = (timeFrom + ' - '+ timeTo);
                    x['time'] = time.replace("p. m.", "").replace("a. m.","");
                    return x;
                });
            }
            console.log(newList);
            return newList;
            
        },
        date(){
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return this.curDate.toLocaleDateString('es-SV', options);
        },
        shortDate(){
            let options = { year: '2-digit', month: '2-digit', day: '2-digit' };
            return this.curDate.toLocaleDateString('es-SV', options);
        },
        time(){
            return this.curDate.toLocaleTimeString('es-SV');
        },
        timePerPerson(){
            let val = this.totalEstimatedTime();

            let totalPeople = this.pending.length;
            if(totalPeople > 1){
                
                //lo que tienen en milisegundos
                val = val/totalPeople;
                let minutes = val/60000;
                let hours = val/3600000;
            
                if(minutes < 60){
                    let aprox = Math.floor(minutes);
                    return aprox +' min';
                }
                else{

                    let integer = Math.floor(hours);
                    let decimal = hours % 1;
                    if(decimal > 0){
                        //convertirla a minutos multiplicando por 60
                        decimal *= 60;
                        decimal = (Math.round(decimal * 100) / 100);
                        decimal = Math.floor(decimal);
                        return integer+'h '+ decimal+ 'm';
                    }
                    return integer+'h';
                }
            }
            return '-';
        }
    },
    methods:{
        addPeople(){
            if(this.people != ""){
                var newPeople = {name: this.people, 
                                status: false,
                                date: this.shortDate,
                                hour: this.time};
                peopleRef.push(newPeople);
                this.people = "";
            }
        },
        disablePeople(object, event){
            if(event.target.checked){
                peopleRef.child(object['.key']).child("status").set(true);
            }
        },
        goToConfig(){
            this.$router.replace('/config');
        },
        totalEstimatedTime(){
            let date = new Date();
             var options = { year: '2-digit', month: '2-digit', day: '2-digit', 
             hour: '2-digit', minute: '2-digit' };
                
            //validar formato 12h
            let hours = parseInt(this.from.hour);
            if(this.from.ampm == 'PM')
                hours += 12;
            date.setHours(hours,this.from.minutes);

            this.minVal = date.getTime();

            hours = parseInt(this.to.hour);
            if(this.to.ampm == 'PM')
                hours +=12;
            date.setHours(hours, this.to.minutes);

            this.maxVal = date.getTime();

            //si la hora actual esta entre el minimo y maximo, setear la hora actual
            if(this.curDate.getTime() > this.minVal && this.curDate.getTime() < this.maxVal){
                this.minVal = this.curDate.getTime();
            }

            let val = this.maxVal-this.minVal;
            return val;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.css"></style>
