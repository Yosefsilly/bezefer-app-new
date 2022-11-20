<template>
  <div class="d-flex">
    <v-card elevation="0">
      <v-card-title>Create new class</v-card-title>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="id"
          :counter="10"
          :error-messages="errors"
          label="ClassId"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </form>
    </v-card>
    <v-spacer></v-spacer>
    <v-card elevation="0">
      <v-card-title>Add new student</v-card-title>

      <form @submit.prevent="submit">
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </form>
    </v-card>
  </div>
</template>

<script>
export default {
  // components: { ClassForm, StudentForm },

  data() {
    return {
      class: {
        id: "",
        name: "",
        naxSeats: "",
      },
      student: {
        id: "",
        firstName: "",
        lastName: "",
        age: "",
        profession: "",
      },
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style></style>
