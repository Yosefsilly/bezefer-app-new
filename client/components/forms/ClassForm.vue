<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="name"
        :counter="10"
        :error-messages="errors"
        label="Name"
        required
      ></v-text-field>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
  }),
  methods: {
    submit() {},
  },
};
</script>

<style></style>
