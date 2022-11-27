<template>
  <v-container class="mt-10 mx-1" fluid>
    <div v-if="!loaded">loading...</div>
    <span v-else>{{availableClasses}}</span>
    <div>
      <v-row >
        <v-col cols="2" v-for="classy in classes" :key="classy.classId" class="pa-4" >
          <Class :classId="classy.classId" :name="classy.name" :calcSeats="calcSeats(classy)" :maxSeats="classy.maxSeats"></Class>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Class from "../components/Class.vue";
import { mapState } from "vuex";

export default {
  components: { Class },
  name: "classesPage",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      classes: "classes",
      loaded: "classesLoaded"
    }),
    availableClasses() {
      this.$store.getters.getAvailableClasses
    }
  },
  methods: {
    calcSeats(item) {
      return item.maxSeats - item.currentCapacity
    }
  }
};
</script>

<style></style>
