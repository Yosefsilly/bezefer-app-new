<template>
  <v-container>
    <div v-if="!loaded">loading...</div>
    <v-row v-else align="center" justify="center">
      <v-card tile min-width="1125" flat class="mt-10">
        <v-data-table
          :headers="headers"
          :items="items"
          disable-sort
          hide-default-footer
          class="my-border row-height elevation-3"
          font-size="3rem"
        >
          <template v-slot:header>
            <v-dialog v-model="dialogAssign" width="228">
              <v-card>
                <v-card-title
                  class="justify-center text-body font-weight-regular"
                  >Available Classes</v-card-title
                >
                <v-card-actions
                  class="full-height pa-2 d-flex flex-row ml-9"
                  v-for="availableClass in availableClasses"
                  :key="availableClass.id"
                >
                <img src="~/static/classicon.svg" alt="" />
                  <v-card-text color="blue darken-1" text
                    >{{ availableClass.name }}
                    <v-btn
                      small
                      elevation="0"
                      icon
                      :color="color"
                      :ripple="false"
                      @click="assignItemConfirm(availableClass.classId)"
                    >
                      <v-icon dark small>mdi-plus </v-icon></v-btn
                    ></v-card-text
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="500" min-height="200">
              <v-card>
                <v-card-title class="text-h7 justify-center"
                  >Are you sure you want to delete
                  {{ editedItem.firstName }}?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :color="color" text @click="closeDelete">Cancel</v-btn>
                  <v-btn :color="color" text @click="deleteItemConfirm"
                    >Yes</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item="row">
            <tr align="center">
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.firstName }}</td>
              <td>{{ row.item.lastName }}</td>
              <td>{{ row.item.age }}</td>
              <td>{{ row.item.profession }}</td>
              <td>
                <v-btn
                  dark
                  medium
                  :color="color"
                  outlined
                  @click="assignItem(row.item)"
                  v-if="!$store.getters.getIsAssigned(row.item.id)"
                >
                  Assign to class
                </v-btn>
              </td>
              <td>
                <v-btn
                  dark
                  medium
                  outlined
                  :color="color"
                  @click="deleteItem(row.item)"
                >
                  Delete
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "studentsCompontnt",
  data() {
    return {
      headers: [],
      error: null,
      dialogDelete: false,
      dialogAssign: false,
      editedIndex: -1,
      editedItem: {},
    };
  },
  created() {
    if (this.loaded) {
      this.tableSort();
    }
  },
  computed: {
    ...mapState({
      items: "students",
      classes: "classes",
      loaded: "studentsLoaded",
    }),
    ...mapGetters({
      availableClasses: "getAvailableClasses",
      color: "getColor",
      isAssigned: "getIsAssigned",
    }),
  },
  watch: {
    "$store.state.studentsLoaded": function () {
      const student = this.items[0];
      const entries = Object.keys(student);
      for (let i = 0; i < entries.length; i++) {
        this.headers.push({
          text: entries[i],
          value: entries[i],
          align: "center",
        });
      }
      this.headers.splice(5, 3);
      this.headers.push(
        { text: "Assign", value: "assign", align: "center" },
        { text: "Delete", value: "delete", align: "center" }
      );
    },
  },
  methods: {
    tableSort() {
      const student = this.items[0];
      const entries = Object.keys(student);
      for (let i = 0; i < entries.length; i++) {
        this.headers.push({
          text: entries[i],
          value: entries[i],
          align: "center",
        });
      }
      this.headers.splice(5, 3);
      this.headers.push(
        { text: "Assign", value: "assign", align: "center" },
        { text: "Delete", value: "delete", align: "center" }
      );
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    assignItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAssign = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAssign() {
      this.dialogAssign = false;
    },
    async deleteItemConfirm() {
      try {
        await this.$store.dispatch("deleteStudent", this.editedItem.id);
        this.closeDelete();
      } catch (error) {
        this.error = error;
      }
    },
    async assignItemConfirm(classId) {
      try {
        const ids = {};
        ids.classId = classId;
        ids.studentId = this.editedItem.id;
        await this.$store.dispatch("assignStudent", ids);
        this.closeAssign();
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style>
.my-border {
  border: 1px solid #d1d1d1;
}
.row-height tr,
td {
  height: 86px !important;
}
tbody > tr:hover {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
th {
  font-weight: 400;
  font-size: 1rem;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: 400;
  font-size: 1rem;
}
</style>
