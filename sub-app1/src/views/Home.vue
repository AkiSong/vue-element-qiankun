<template>
  <div class="home">
    <HelloWorld msg="Welcome to Home by App1"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return {
    }
  },
  created(){
  },
  mounted(){
    window.$store.dispatch({ type: 'INCREMENT' });
  }
}
</script>