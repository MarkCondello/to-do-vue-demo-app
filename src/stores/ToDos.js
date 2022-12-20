import { defineStore, acceptHMRUpdate } from 'pinia'
import ToDoService from '../services/ToDoService'

export const useToDoStore = defineStore('ToDoStore', {
    state: ()=> ({
        todos: [],
        todo: {},
    }),
    actions: {
        createToDo(todo) {
            return ToDoService.postToDo(todo)
              .then(() => {
                this.todos.push(todo)
               })
              .catch(error => {
                throw error
              })
        },
        fetchToDos(){
            return ToDoService.getToDos()
            .then(response => {
                this.todos = response.data
            })
            .catch((error) => {throw error})
        },
        updateToDoComplete(todo){
            const toDoCompletedUpdate = {...todo, "completed": !todo.completed}
            return ToDoService.updateToDo(toDoCompletedUpdate)
                .then(() => {
                    const todoIndex = this.toDoIndex(todo)
                    this.todos[todoIndex].completed = !this.todos[todoIndex].completed
                })
                .catch(error => {throw error})
            // console.log('reached updateTodo', {todo, todoIndex, todos: this.todos})
        },
        updateToDoTask(todo){
            // task is already updated in state, need to send off request to update db
            return ToDoService.updateToDo(todo)
                .then(resp => {
                    console.log('Reached updateToDoTask', {resp, todo})
                })
                .catch(error => {throw error})
        },
        deleteToDo(todo){
            return ToDoService.deleteToDo(todo.id)
                .then(() => {
                    // I need to slice the todos array after sending the request
                    const todoIndex = this.toDoIndex(todo)
                    this.todos.splice(todoIndex, 1)
                    // console.log('reached delete', {resp, todoIndex})
                })
                .catch(error => {throw error})
        },
        // fetchToDo(id) {
        //     return ToDoService.getToDo(id)
        //     .then(response => {
        //         this.todo = response.data
        //     //   commit('SET_EVENT', response.data)
        //     })
        //     .catch(error => {
        //         throw error
        //     })
        // },
    },
    getters: {
        toDoIndex: (state) => {
            return (todo) => state.todos.findIndex(item => item.id === todo.id)
        },
        completedToDos: (state) => {
            return  state.todos.filter(item => item.completed).length
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToDoStore, import.meta.hot))
}