<template>
  <ul class="todo-list">
    <li class="right date"></li>
    <li class="separator"></li>

    <div class="pending-list">
      <li v-for="(item, index) in pending" :key="index">
        <input type="checkbox" :id="'pending'+index" @change="disablePeople(item,$event)"/> 
        <label class="toggle" :for="'pending'+index"></label>
        <span>{{ item.name }}</span>
      </li>
    </div>
    
    <div class="add-list">
      <li>
        <input type="checkbox" id="pnew"/> 
        <label class="toggle" for="pnew"></label>
        <input type="text" 
          placeholder="Escribe tu nombre.." 
          v-model="people"
          @focusout="addPeople" />
      </li>
    </div>
    
    <li>
    </li>
    <div class="done-list">
      <li v-for="(item, index) in done" :key="index">
        <input type="checkbox" disabled :id="'done'+index"/> 
        <label class="toggle" :for="'done'+index"></label>
        <span>{{ item.name }}</span>
      </li>
    </div>
  </ul>
</template>

<script>

export default {
  data(){
    return {
      people: "",
      list: []
    }
  },
  computed:{
    done(){
      return this.list.filter((people) => people.status);
    },
    pending(){
      return this.list.filter((people) => !people.status);
    },
  },
  methods:{
    addPeople(){
        if(this.people != ""){
            var newPeople = {name: this.people, status: false};
            this.list.push(newPeople);
            this.people = "";
        }
    },
    disablePeople(object, event){
        if(event.target.checked){
            // var found = this.list.filter((people) => people.name == value);
            object.status = true;
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ol, ul { list-style: none }
.todo-list { border-top: 1px solid #e6ebed }

.todo-list:before {
    content: '';
    width: 3px;
    z-index: 2;
    border: 1px solid #f2e3df;
    border-width: 0 1px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 35px;
}

.todo-list li {
    position: relative;
    padding: 7px 15px 7px 50px;
    line-height: 21px;
    font-size: 12px;
    color: #8b8f97;
    border-bottom: 1px solid #e6ebed;
}

input[type=checkbox] {
	display: none;
}

input[type=checkbox]:checked + .toggle:after{
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
	content: '';
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
    content: '';
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

.done-list .toggle:before, .todo-list .toggle:active:before {
    border-color: #c0c0c0 #ccc #d8d8d8;
    -webkit-box-shadow: inset 0 1px rgba(0, 0, 0, 0.05), inset 0 5px 5px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px rgba(0, 0, 0, 0.05), inset 0 5px 5px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.05), inset 0 5px 5px rgba(0, 0, 0, 0.05);
}
.todo-controls {
    margin: 0 15px 12px 50px;
    height: 12px;
}

.todo-controls li { float: left }

.todo-controls li + li { margin-left: 10px }

.todo-controls .right { float: right; }

.todo-controls a {
    display: block;
    margin: 0;
    opacity: .6;
}

.todo-controls a:hover { opacity: 1 }

.todo-pagination {
    margin: 12px 12px 0 50px;
    height: 22px;
}

.todo-pagination li { float: left }

.todo-pagination .next { float: right }

.todo-pagination .next i { margin: 0 0 0 2px }

.todo-pagination a, .todo-pagination span {
    display: block;
    line-height: 22px;
    font-size: 11px;
    color: #676f7f;
}

.todo-pagination a {
    padding: 0 8px;
    text-shadow: 0 1px #fff;
    background: #f1f0f0;
    border-radius: 3px;
}

.todo-pagination a:hover {
    background: #e9e9e9;
    text-decoration: none;
}

.todo-pagination span {
    padding: 0 4px;
    opacity: .3;
}
input[type=text]{
    border: none;
    outline: none;

    font-size: 12px;
    color: #8b8f97;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ddd;
    opacity: 1; /* Firefox */
}
input[type=text]{
    border: none;
    outline: none;

    font-size: 12px;
    color: #8b8f97;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ddd;
    opacity: 1; /* Firefox */
}

.todo-list .right { 
    text-align: right; 
    text-transform: 'capitalize';
}

.add-list .toggle {
    opacity: 0.6;
    pointer-events: none;
}

.separator{
    padding: 17px !important;
}
</style>
