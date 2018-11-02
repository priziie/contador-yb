<template>
        <input type="number" :min="min" :max="max">
</template>

<script>
export default {
    props:['min','max']
}
</script>

<style scoped>
input {
  outline: 0;
  background: #f2f2f2;
  width: 60px !important;
  border: 0;
  margin: 0 0 15px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
