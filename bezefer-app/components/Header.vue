<template>
  <div>
    <v-app-bar class="primary" dark dense flat height="80">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="title">Joe's Classes</v-toolbar-title>
      <v-btn icon id="margin" @click="toggle_dark_mode">
        <img src="~/static/theme.svg" alt="" />
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary light>
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
              <v-list-item-title name>{{ item.title }}</v-list-item-title>
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
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
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
}
.title {
  font-size: 32px !important;
}
</style>
