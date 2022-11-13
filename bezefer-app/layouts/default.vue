<template>
  <div id="app">
    <v-app>
      <Header />
      <Nuxt />
    </v-app>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: { Header },
};
</script>

<style></style>
