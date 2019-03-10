<template>
        <input type="number" :min="min" :max="max" 
        v-on:input="$emit('changeConfig',name, $event.target.value)">
</template>

<script>
export default {
    props:['min','max','name']
}
</script>

<style scoped>
input {
  outline: 0;
  background: #f2f2f2;
  width: 60px !important;
  border: 0;
  margin: 0px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
