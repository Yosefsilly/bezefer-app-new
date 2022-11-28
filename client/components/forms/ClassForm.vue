<template>
  <v-container>
    <v-card-title class="justify-center text-title font-weight-regular my-size">Create new class</v-card-title>
    <v-row
      ><v-col class="d-flex justify-center"
        >
        <span v-if="error">{{error}}</span>
        <v-form v-model="formValidity" ref="form" class="my-width"
          ><v-text-field
            v-model="classId"
            label="Class ID *"
            type="Text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Name *"
            type="Text"
            outlined
            required
            :rules="rule"
          ></v-text-field>
          <v-text-field
            v-model="maxSeats"
            label="Max Seats *"
            type="Text"
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
            >CREATE CLASS</v-btn
          >
        </v-form></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  data: () => ({
    error: null,
    formValidity: false,
    classId: "",
    name: "",
    maxSeats: "",
    rule: [(value) => !!value || "enter a value"],
  }),
  methods: {
    async onSubmit() {
      const data = {
        classId: this.classId,
        name: this.name,
        maxSeats: this.maxSeats,
      };
      try {
        await this.$store.dispatch("addClass", data).then(() => {
          this.classId = ''
          this.name = ''
          this.maxSeats = ''
          this.$refs.form.resetValidation()
        })
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
      return this.$store.getters.getAddClassLoading;
    },
  },
};
</script>

<style>
.my-size {
  font-size: 2rem;
}
.my-width {
  width: 200px;
  }
</style>
