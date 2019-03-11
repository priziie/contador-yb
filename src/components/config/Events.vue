<template>
    <div> 
        <div  v-for="(i,e) in events" :key="i" class="prueba">
            <Time :time="e.from" label="Desde" name="events/from" @changeConfig="changeConfig"/>
            <Time :time="e.to" label="Hasta" name="events/to" @changeConfig="changeConfig"/>
        </div>
        <div v-for="(i,e) in newEvents" :key="i" class="prueba">
            <Time :time="e.from" label="Desde" name="events/from" @changeConfig="changeConfig"/>
            <Time :time="e.to" label="Hasta" name="events/to" @changeConfig="changeConfig"/>
        </div>
        <input type="button" value="Agregar horas a bloquear" @click="addNewEvent">
    </div>
</template>

<script>
export default {
    props: ['events', 'min','max'],
    data(){
        return{
            newEvents: []
        }
    },
    methods:{
        addNewEvent(){
            this.newEvents.push({
                from:{
                    ampm: '',
                    hour: '',
                    minutes: ''
                },
                to:{
                    ampm: '',
                    hour: '',
                    minutes: ''
                }
            })
        }
    }
}
</script>


<style scoped>
input[type="number"]{
  outline: 0;
  background: #f2f2f2;
  width: 80px !important;
  border: 0;
  margin: 0 10px 15px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>