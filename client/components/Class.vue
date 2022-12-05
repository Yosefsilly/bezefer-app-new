<template v-slot:header>
  <div>
    <v-card oulined class="px-4 pt-4">
      <p class="font-weight-black my-size">{{ name }}</p>
      <p class="text-subtitle-2 font-weight-regular">
        there {{calcSeats == 1 ? `is ${calcSeats} seat` : `are ${calcSeats} seats`}} left
      </p>
      <p class="text-caption text--disabled">out of {{ maxSeats }}</p>
      <div class="d-flex">
        <v-btn
          class="text-body-2d pl-0 pr-0"
          elevation="0"
          plain
          :ripple="false"
          @click="openList"
          >STUDENTS LIST</v-btn
        >
        <v-btn :ripple="false" icon @click="deleteClass">
          <img v-if="theme" src="~/static/pinkRemove.svg" alt="" />
          <img v-else src="~/static/remove.svg" alt="" />
        </v-btn>
      </div>
      <span
        v-if="error"
        class="text-caption font-weight-regular red--text"
        >{{ error }}</span
      >
    </v-card>
    <template>
      <v-dialog v-model="dialogStudentList" max-width="300" min-height="100">
        <v-card>
          <v-card-title class="text-h7 justify-center"
            >Class Students</v-card-title
          >
          <v-card-actions v-for="student in this.students" :key="student.id">
            <img src="~/static/studenticon.svg" alt="" />
            <v-card-text>{{ student.firstName }} </v-card-text>
            <v-btn
              :ripple="false"
              icon
              @click="removeStudentFromClass(student.id)"
            >
              <img v-if="theme" src="~/static/pinkRemove.svg" alt="" />
              <img v-else src="~/static/remove.svg" alt="" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogStudentList: false,
      editedIndex: -1,
      editedItem: {},
      error: null,
    };
  },
  props: ["classId", "name", "calcSeats", "maxSeats"],
  methods: {
    async deleteClass() {
      try {
        this.students = null;
        this.students = await this.$store
          .dispatch("fetchStudentsInClass", this.classId)
          .then(() => {
            if (this.students.length <= 0) {
              this.$store.dispatch("deleteClass", this.classId);
            } else {
              this.error =
                "There are students in this class remove to delete!";
            }
          });
      } catch (error) {
        this.error = error;
      }
    },
    async openList() {
      this.error = null
      this.students = null;
      this.dialogStudentList = true;
      const id = this.classId;
      try {
        this.students = await this.$store.dispatch("fetchStudentsInClass", id);
      } catch (error) {
        this.error = error;
      }
    },
    async removeStudentFromClass(id) {
      try {
        this.students = await this.$store.dispatch(
          "removeStudentFromClass",
          id
        );
      } catch (error) {
        this.error = error;
      }
      this.students = null;
      this.dialogStudentList = false;
    },
  },
  computed: {
    ...mapGetters({
      theme: "getTheme",
      storeStudents: "getClassStudents",
    }),
    students: {
      get() {
        return this.storeStudents;
      },
      set(newStudent) {
        return newStudent;
      },
    },
  },
};
</script>

<style scoped>
.my-size {
  font-size: 1.2rem;
}
</style>
