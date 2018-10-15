<template>
    <div>
        <li v-for="(item, index) in items" :key="nameProp+index">
            <input type="checkbox" :id="nameProp+index" 
                :disabled="status"
                :checked="status"
                @change="$emit('disable',item, $event)"/> 
            <label class="toggle" :for="nameProp+index"></label>
            <span>{{ item.name }}</span>
        </li>
    </div>
</template>

<script>
export default {
    props: ['items','status','nameProp']
}
</script>