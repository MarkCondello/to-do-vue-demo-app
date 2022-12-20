<template>
    <div class="item" v-for="(item, id) in toDos" :key="id">
        <input
            type="checkbox"
            :checked="item.completed"
            name="completed"
            @change="toDoStore.updateToDoComplete(item)"
        >
        <div class="details">
            <input
                type="text"
                v-model="item.task"
                :class="{ 'completed' : item.completed }"
                @blur="toDoStore.updateToDoTask(item)"
            />
             <slot></slot>
        </div>
        <button @click="toDoStore.deleteToDo(item)">delete</button>
    </div>
</template>
<script>
import {useToDoStore} from '../stores/ToDos.js'
export default {
    name: 'ToDoList',
    props: {
        toDos: {
            type: Array,
            required: true,
        }
    },
    setup(){
        const toDoStore = useToDoStore()
        return {toDoStore}
    }
}
</script>
<style scoped lang="scss">
.item {
    display: flex;
    gap: 1rem;
    .details {
        width: 100%;
        input {
            width: 100%;
            &.completed {
                text-decoration: line-through;
            }
        }
    }
}
</style>