<template>
    <div class="todo-form">
        <input
            type="text"
            v-model="todoTask"
        >
        <button @click="handleAddToDo">Add ToDo</button>
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
            const item = {
                "id": "" + Math.floor(Math.random() * 10000) + 3,
                "task": this.todoTask,
                "completetion_date": Math.floor(Math.random() * 31),
                "completed": false
            }
            console.log('Reached handleToDo', item)
            this.toDoStore.createToDo(item)
        }
    }
}
</script>
<style>
.todo-form {
    display: flex;
}
</style>