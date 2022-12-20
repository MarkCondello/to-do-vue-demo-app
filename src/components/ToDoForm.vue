<template>
    <div class="todo-form">
        <input type="text" v-model="todoTask" @keyup.enter="handleAddToDo">
        <button @click="handleAddToDo">Add to do</button>
    </div>
</template>
<script>
import {useToDoStore} from '../stores/ToDos.js'
import { ref } from 'vue'
export default {
    name: 'ToDoForm',
    setup(){
        const todoTask = ref("")
        const toDoStore = useToDoStore()
        return {toDoStore, todoTask}
    },
    methods: {
        handleAddToDo(){
            if(this.todoTask) {
                const item = {
                    "id": "" + Math.floor(Math.random() * 10000) + 3,
                    "task": this.todoTask,
                    "completetion_date": Math.floor(Math.random() * 31),
                    "completed": false
                }
                this.toDoStore.createToDo(item)
                this.todoTask = ""
            }
        }
    }
}
</script>
<style>
.todo-form {
    display: flex;
}
</style>