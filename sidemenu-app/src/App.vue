<template>
  <div id="sidemenuApp" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Logo from "@/components/Logo.vue";
import SidebarItem from "@/components/SidebarItem.vue";
import variables from "@/styles/variables.scss";
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      showLogo: true
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return '/';
    },
    permission_routes() {
      return window.$store.getters.permission_routes;
    },
    isCollapse() {
      return !window.$store.getters.sidebar.opened;
    },
    variables() {
      return variables;
    }
  }
};
</script>
