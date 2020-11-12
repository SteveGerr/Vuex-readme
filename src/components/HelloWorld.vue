<template>
  <div class="hello">
    <button @click="addUser">Add user</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  methods: {
  //users - имя стора, addNewUser - имя action    
    ...mapActions("users", ["addNewUser"]),
    

    addUser() {
      // console.log("Click");
      const newUser = {
        name: "Dima",
        age: 2
      }; 
      //Вызываем action из Store
      //и передаём в него созданного пользователяы
      this.addNewUser(newUser);
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 26px;
}
</style>
