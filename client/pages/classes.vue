<template>
  <v-container class="mt-10 mx-1" fluid>
    <v-progress-circular
      v-if="!loaded"
      class="v-progress-circal"
      indeterminate
      :color="color"
      :size="100"
    ></v-progress-circular>
    <div v-else>
      <v-row>
        <v-col
          cols="2"
          v-for="classy in clls"
          :key="classy.classId"
          class="pa-4"
        >
          <Class
            :classId="classy.classId"
            :name="classy.name"
            :calcSeats="calcSeats(classy)"
            :maxSeats="classy.maxSeats"
            :studentss="classy.classStudents"
          ></Class>
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
    return {
      clls: [],
    };
  },
  computed: {
    ...mapState({
      classes: "classes",
      loaded: "classesLoaded",
      students: "classStudents",
    }),
    color() {
      return this.$store.getters.getColor;
    },
  },
  methods: {
    calcSeats(item) {
      return item.maxSeats - item.currentCapacity;
    },
    inClass(classId) {
      console.log(this.students);
      const inCurrentClass = this.students.map(function (student) {
        if (student.classId === classId) {
          return student;
        }
      });
      console.log(inCurrentClass);
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchStudentsInClass").then(() => {
      console.log(this.students);
      this.clls = this.classes.map((c) => {
        console.log(c.classId);
        console.log(this.students.filter((s) => s.classId === c.classId));
        return {
          ...c,
          classStudents: this.students.filter((s) => s.classId === c.classId),
        };
      });
    });
  },
};
</script>

<style scoped>
.v-progress-circal {
  display: block;
  width: 100px;
  margin: 0 auto;
}
</style>
