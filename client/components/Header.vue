<template>
  <div>
    <v-app-bar :color="color" dark dense flat height="85">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font text-h5">Joe's Classes</v-toolbar-title>
      <v-btn :ripple="false" icon id="margin" @click="toggle_theme">
        <img src="~/static/theme.svg" alt="" />
      </v-btn>
      <v-btn :ripple="false" plain icon id="margin" @click="toggle_dark_mode"> </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.route"
            dense
            router
          >
            <v-list-item-content>
              <v-list-item-title nuxt name>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Classes", route: "/classes" },
      { title: "Students", route: "/students" },
      { title: "Create", route: "/create" },
    ],
  }),
  methods: {
    toggle_theme: function () {
      this.$store.dispatch("changeTheme");
    },
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  computed: {
    color() {
      return this.$store.getters.getColor;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
#margin {
  margin: 20px;
  background-color: transparent !important;
}
.title {
  font-size: 32px !important;
}
.font {
  font-weight: 400;
}
</style>
