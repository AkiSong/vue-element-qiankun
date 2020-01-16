<template>
  <div id="subApp1">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
#subApp1 {
  h1 {
    color: aqua;
  }
}
</style>
