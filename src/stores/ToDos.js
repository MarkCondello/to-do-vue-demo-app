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
            console.log('Reached updateToDOCompelted', todo)
            // do I need to send off a request then update the todo in the store ??
            const toDoCompletedUpdate = {...todo, "completed": !todo.completed}
            return ToDoService.updateToDo(toDoCompletedUpdate)
                .then(resp => {
                    const todoIndex = this.toDoIndex(todo)
                    this.todos[todoIndex].completed = !this.todos[todoIndex].completed
                })
                .catch(error => {throw error})
                //need to send off request
            // console.log('reached updateTodo', {todo, todoIndex, todos: this.todos})
        },
        updateToDoTask(todo){
            const todoIndex = this.toDoIndex(todo)
            // this.todos[todoIndex].task = task
                // task is already updated in state, need to send off request
            console.log({todo})
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

        deleteToDo(todo){
            //do i need to slice the todos array after sending the request
            console.log('reached delete', todo)
        },
      

    },
    getters: {
        toDoIndex: (state) => {
            return (todo) => state.todos.findIndex(item => item.id === todo.id)
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToDoStore, import.meta.hot))
}