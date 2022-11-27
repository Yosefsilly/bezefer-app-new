<template>
  <v-card oulined class="px-4 pt-4">
    <p class="font-weight-black my-size">{{ name }}</p>
    <p class="text-subtitle-2 font-weight-regular">
      there are {{ calcSeats }} seats left
    </p>
    <p class="text-caption text--disabled">out of {{ maxSeats }}</p>
    <div class="d-flex">
      <v-btn class="text-body-2d pl-0 pr-0" elevation="0" plain :ripple="false"
        >STUDENTS LIST</v-btn
      >
      <v-btn :ripple="false" icon @click="deleteClass(classId)">
        <img v-if="theme" src="~/static/pinkRemove.svg" alt="" />
        <img v-else src="~/static/remove.svg" alt="" />
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["classId", "name", "calcSeats", "maxSeats"],
  methods: {
    async deleteClass(classId) {
      try {
        await this.$store.dispatch("deleteClass", classId);
        this.closeDelete();
      } catch (error) {
        this.error = error;
      }
    },
  },
  computed: {
    ...mapGetters({
      theme: "getTheme",
    }),
  },
};
</script>

<style>
.my-size {
  font-size: 1.2rem;
}
</style>
