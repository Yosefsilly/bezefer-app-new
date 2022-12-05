<template>
  <v-container>
    <v-card-title class="justify-center text-title font-weight-regular my-size"
      >Create new class</v-card-title
    >
    <v-row
      ><v-col class="d-flex justify-center">
        <v-form class="my-width" ref="form" v-model="formValidity"
          ><v-text-field
            v-model="id"
            label="ID *"
            type="text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-text-field
            v-model="firstName"
            label="First Name *"
            type="text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last Name *"
            type="text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-text-field
            v-model="age"
            label="Age"
            type="number"
            min="1"
            outlined
            :rules="numberRule"
          ></v-text-field>
          <v-text-field
            v-model="profession"
            label="profession *"
            type="text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-btn
            :color="color"
            class="white--text my-width"
            :disabled="!formValidity"
            :loading="loading"
            @click="onSubmit"
            >ADD NEW STUDENT</v-btn
          >
        </v-form></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  data: () => ({
    formValidity: false,
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
    rule: [(value) => !!value || "enter a value"],
    numberRule: [
      (value) => !!value || "enter a value",
      (value) => value > 0 || "value must be positive!",
    ],
  }),
  methods: {
    async onSubmit() {
      const data = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        profession: this.profession,
      };
      try {
        await this.$store.dispatch("addStudent", data).then(() => {
          this.id = "";
          this.firstName = "";
          this.lastName = "";
          this.age = "";
          this.profession = "";
          this.$refs.form.resetValidation();
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
  computed: {
    color() {
      return this.$store.getters.getColor;
    },
    loading() {
      return this.$store.getters.getAddStudentLoading;
    },
  },
};
</script>

<style scoped>
.my-width {
  width: 200px;
}
.my-size {
  font-size: 2rem;
}
</style>
