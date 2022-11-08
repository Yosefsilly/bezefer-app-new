<template>
  <div>
  <span v-if="error"></span>
    <span>{{ students }}</span>
  </div>
</template>

<script>
import bezeferService from "../DAL/server.js";

export default {
  name: "studentsCompontnt",
  data() {
    return {
      students: {},
      error: null
    };
  },
  async created() {
    try {
    this.students = await bezeferService.getStudents();
    this.students = students.data.map(student => ({
      ...student
    }))
    } catch(eror) {
      this.error = eror.message
    }
  },
};
</script>

<style></style>
