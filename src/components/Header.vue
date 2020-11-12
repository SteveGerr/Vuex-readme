<template>
  <div>
    Header
    {{ usersList }}

  </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
  name: 'Header',

  computed: {
    //mapGetters('name store in modules', ['nameGetter', 'nameGetter2', ...])
    ...mapGetters('users', ['usersList'])
  }
}
</script>

<style>

</style>
