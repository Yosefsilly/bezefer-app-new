<template>
  <div>
  <span>{{classes}}</span>
  </div>
</template>

<script>
import bezeferService from '../DAL/server.js'

export default {
  name: "classesComponent",
  data() {
    return {
      classes: {},
    };
  },
  async created() {
    this.classes = await bezeferService.getClasses()
  }
};
</script>

<style></style>
