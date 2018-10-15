<template>
  <ul class="todo-list">
    <li class="right date">{{ date }}</li>
    <li class="separator"></li>

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
</template>

<script>
import List from './List';

import firebase from 'firebase'

var db = firebase.initializeApp({
  databaseURL: 'https://contador-f1626.firebaseio.com'
}).database()

var peopleRef = db.ref('people');
// var curDateStatic = new Date();
// var shortDateStatic = curDateStatic.toLocaleDateString('es-SV', 
// { year: '2-digit', month: '2-digit', day: '2-digit' });

export default {
    components:{
        List
    },
    data(){
        return {
            people: "",
            curDate: new Date()
        }
    },
    firebase: {
        list: peopleRef
    },
    computed:{
        done(){
            return this.list.filter((people) => people.status);
        },
        pending(){
            return this.list.filter((people) => !people.status);
        },
        date(){
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return this.curDate.toLocaleDateString('es-SV', options);
        },
        shortDate(){
            var options = { year: '2-digit', month: '2-digit', day: '2-digit' };
            return this.curDate.toLocaleDateString('es-SV', options);
        },
        time(){
            return this.curDate.toLocaleTimeString('es-SV');
        },
        filterList(){
            return peopleRef.orderByChild('date').equalTo(this.shortDate);
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../style.css"></style>
