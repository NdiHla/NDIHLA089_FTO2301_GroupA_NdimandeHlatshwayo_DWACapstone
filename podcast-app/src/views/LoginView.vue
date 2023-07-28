<template>
  <h1>Login</h1>

  <div class="inputContainer">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name">
  </div>

  <div class="inputContainer">
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email">
  </div>

  <div class="inputContainer">
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password">
  </div>

  <div class="buttonContainer">
    <button @click="createAccount">Create</button>
    <button @click="login">Login</button>
    <button @click="seeCurrentUser">See User</button>
    <button @click="logout">Logout</button>
  </div>
  
</template>

<script setup>
  import { ref } from 'vue'
  import { supabase } from '../clients/supabase'

  // connects form inputs to values
  let name = ref("");
  let email = ref("");
  let password = ref("");

  const createAccount = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: name.value
        }
      }
    })
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

  const seeCurrentUser = async () => {
    const localUser = await supabase.auth.getSession()
      console.log(localUser)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      console.log("Logout successful")
    }
  }
</script>

<style scoped>
.inputContainer {
  margin: 1rem;
  display: flex;

}
.buttonContainer {
  margin: 1rem;
  display: flex;
}

button {
  margin: 1rem;
}

input{
  background-color: rgb(90, 90, 90);
  border-radius: 10px;
  margin-left: 1rem;
}
</style>
