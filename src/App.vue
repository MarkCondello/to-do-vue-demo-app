<script>
import HelloWorld from './components/HelloWorld.vue'
import ToDoList from './components/ToDoList.vue'
import ToDoForm from './components/ToDoForm.vue'

import {useCounterStore} from './stores/counter'
import {useToDoStore} from './stores/ToDos'

export default {
  components: {HelloWorld, ToDoList, ToDoForm },
  setup(){
    const countStore = useCounterStore()
    const toDoStore = useToDoStore()
    // console.log(useCounterStore(), countStore.count)

    toDoStore.fetchToDos()
    return {countStore, toDoStore}
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>{{countStore.count}}</h1>
      <HelloWorld msg="You did it!" />
      <button @click="countStore.increment()">Inc</button>
    </div>
  </header>

  <main>
    <ToDoForm />
    <ToDoList :toDos="toDoStore.todos"/>
    <!-- <TheWelcome /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
