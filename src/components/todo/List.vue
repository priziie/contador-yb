<template>
  <div>
    <li v-for="(item, index) in items" :key="nameProp+index">
      <input
        type="checkbox"
        :id="nameProp+index"
        :disabled="status"
        :checked="status"
        @change="$emit('disable',item, $event)"
      />
      <label class="toggle" :for="nameProp+index"></label>
      <div class="names">{{ item.name }}</div>
      <span class="time2" v-if="isLogged && !item.twoHours">{{item.time}}</span>
      <span class="time2 specialTime" v-if="isLogged && item.twoHours" v-html="item.time"></span>
    </li>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["items", "status", "nameProp"],
  data() {
    return {
      isLogged: firebase.auth().currentUser != null
    };
  }
};
</script>

<style>
.specialTime {
  top: -4px !important;
}
.todo-controls li {
  float: left;
}

.todo-controls li + li {
  margin-left: 10px;
}

.todo-pagination li {
  float: left;
}

.todo-list li {
  position: relative;
  padding: 7px 15px 7px 50px;
  line-height: 21px;
  font-size: 12px;
  color: #8b8f97;
  border-bottom: 1px solid #e6ebed;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .toggle:after {
  opacity: 1;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .toggle:after {
  opacity: 1;
}

.todo-list .toggle {
  display: block;
  height: 35px;
  width: 35px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  text-indent: 100%;
  overflow: hidden;
  cursor: pointer;
}

.toggle:after {
  content: "";
  position: absolute;
  position: absolute;
  width: 7px;
  height: 3px;
  background: transparent;
  top: 14px;
  left: 13px;
  border: 2px solid #aaa;
  border-top: none;
  border-right: none;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0;
}

.todo-list .toggle:before {
  content: "";
  width: 15px;
  height: 15px;
  background: #faf9f9;
  border: 1px solid #6bb3ca;
  border-radius: 2px;
  position: absolute;
  top: 9px;
  left: 9px;
  -webkit-box-shadow: 0 1px 1px #dfecf4;
  -moz-box-shadow: 0 1px 1px #dfecf4;
  box-shadow: 0 1px 1px #dfecf4;
}

.todo-list .toggle:hover:before {
  -webkit-box-shadow: 0 0 3px #6bb3ca;
  -moz-box-shadow: 0 0 3px #6bb3ca;
  box-shadow: 0 0 3px #6bb3ca;
}

.done-list .toggle:before,
.todo-list .toggle:active:before {
  border-color: #c0c0c0 #ccc #d8d8d8;
  -webkit-box-shadow: inset 0 1px rgba(0, 0, 0, 0.05),
    inset 0 5px 5px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: inset 0 1px rgba(0, 0, 0, 0.05),
    inset 0 5px 5px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.05),
    inset 0 5px 5px rgba(0, 0, 0, 0.05);
}

.time2 {
  font-size: 6pt;
  position: absolute;
  right: 15px;
  top: 7px;
  width: 110px;
  text-align: right;
}
.names {
  width: 125px;
  max-width: 125px;
}
</style>

