<template>
    <div>
        <label>{{label}}</label>
        <Number name="hour" :value="time.hour" @changeConfig="changeConfig" min="1" max="11"/>:
        <Number name="minutes" :value="time.minutes" @changeConfig="changeConfig" min="0" max="59"/>
        <am-pm :value="time.ampm" @changeConfig="changeConfig" :name="name"/>
    </div>
</template>

<script>
import AmPm from './AmPm.vue'
import Number from './Number.vue'
/* eslint-disable */
export default {
    data(){
        return{

        }
    },
    props: ['time', 'label', 'name'],
    components:{
        AmPm,
        Number
    },
    methods: {
        changeConfig(namechild, value){
            console.log("entre en time "+value);
            this.$emit('changeConfig',this.name+'/'+namechild, value);
        }
    }
}
</script>

<style scoped>

.form label{
    margin-right: 10px;
    font-size: 10pt;
}

</style>
