<template>
     <div class="switch-field">
        <input type="radio" id="switch_left" value="AM" v-model="ampm"/>
        <label for="switch_left">AM</label>
        <input type="radio" id="switch_right" value="PM" v-model="ampm"/>
        <label for="switch_right">PM</label>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data(){
        return{
            ampm: ''
        }
    },
    mounted(){
        this.ampm= this.value
    }
}
</script>

<style>

.switch-field {
  overflow: hidden;
  width: 90px;
  float: right;
}
.switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
}

.switch-field label {
  float: left;
}

.switch-field label {
  display: inline-block;
  width: 20px;
  background-color: #e4e4e4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  text-shadow: none;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition:    all 0.1s ease-in-out;
  -ms-transition:     all 0.1s ease-in-out;
  -o-transition:      all 0.1s ease-in-out;
  transition:         all 0.1s ease-in-out;
}

.switch-field label:hover {
	cursor: pointer;
}

.switch-field input:checked + label {
  background-color: rgb(147, 176, 180);
  -webkit-box-shadow: none;
  box-shadow: none;
}

.switch-field label:first-of-type {
  border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
  border-radius: 0 4px 4px 0;
}
</style>
