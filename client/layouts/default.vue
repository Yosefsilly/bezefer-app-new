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
    async fetch() {
    await this.$store.dispatch("fetchClasses");
     await this.$store.dispatch("fetchStudents")
  },
 
};
</script>

<style></style>
