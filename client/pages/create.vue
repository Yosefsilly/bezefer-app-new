<template>
  <div>
    <v-container>
      <v-row class="justify-space-around"
        ><v-col class="d-flex">
          <ClassForm></ClassForm>
          <StudentForm></StudentForm>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ClassForm from "../components/forms/ClassForm.vue";
import StudentForm from "../components/forms/StudentForm.vue";
export default {
  components: { ClassForm, StudentForm },
};
</script>

<style></style>
