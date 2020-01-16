<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import subappMixin from './subapp'
export default {
  name: 'App',
  mixins: [subappMixin]
}
</script>
