<template>
  <the-navigation></the-navigation>
  <div class="container">
    <div v-if="showLeftSidebar" class="left-sidebar">
      <router-view class="view" name="LeftSidebar" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </div>
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" @after-leave="showLeftSidebar = true"></component>
      </transition>   
    </router-view>     
  </div>
</template>

<script>
  import TheNavigation from './components/TheNavigation.vue';
  export default {
    components: {TheNavigation},
      data() {
      return {
        showLeftSidebar: false
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.showLeftSidebar = true;
      });
    },
  }
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s, transform .3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.container {
  display: flex;
}

.left-sidebar {
  width: 20%;
}

.main-view {
  width: 100%;
}
</style>