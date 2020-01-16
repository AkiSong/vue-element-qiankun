<template>
  <div id="subapp2">
    <div id="nav">
      <h1>我是子应用二，sub-app2</h1>
      <router-link to="/">子应用二:首页</router-link> |
      <router-link to="/about">子应用二:about页面</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#subapp2 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
