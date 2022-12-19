import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  // baseURL: 'https://76uzvdqjx7.execute-api.us-east-1.amazonaws.com/dev',
//   baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'HYkiInenDN5PE5JM2HdGL2xKQGyG4wn22CKjwQN0'
  }
})

export default {
  getToDos() {
    return apiClient.get('/to-dos')
    // return apiClient.get('/todos') // typicode api
  },
//   getToDo(id) {
//     return apiClient.get('/to-do/' + id)
//   },
  postToDo(todo) { 
    return apiClient.post('/to-dos/', todo)
    // return apiClient.post('/to-do/', todo)
  },

//need to rig up these methods
  deleteToDo(id) {
    return apiClient.delete('/to-dos/' + id)
    // return apiClient.delete('/to-do/' + id)
  },
  updateToDo(todo) {
    console.log('reached updateToDo', todo)
    return apiClient.put('/to-dos/' + todo.id, todo)
    // return apiClient.put('/to-do/' + todo.id, todo)
  },
}
