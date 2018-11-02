<template>
    <div>
        <label>{{label}}</label>
        <Number :value="time.hour" min="1" max="11"/>:<Number min="0" max="59" :value="time.minutes"/>
        <am-pm :value="time.ampm"/>
    </div>
</template>

<script>
import AmPm from './AmPm.vue'
import Number from './Number.vue'

export default {
    data(){
        return{
        }
    },
    props: ['time', 'label'],
    components:{
        AmPm,
        Number
    }
}
</script>

<style scoped>

.form label{
    margin-right: 10px;
    font-size: 10pt;
}

</style>
