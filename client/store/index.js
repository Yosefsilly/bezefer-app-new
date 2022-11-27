import BezeferService from "../DAL/bezeferService";

export const state = () => ({
  isPink: false,
  colors: { blue: "#3F50B5", pink: "#F50057" },
  students: [],
  classes: [],
  error: {},
  classesLoaded: false,
  studentsLoaded: false,
});

export const getters = {
  getTheme(state) {
    return state.isPink;
  },
  getColor(state, getters) {
    return getters.getTheme ? state.colors.pink : state.colors.blue;
  },
  getClasses(state) {
    return state.classes;
  },
  getError(state) {
    return state.error;
  },
  getAvailableClasses(state) {
    return state.classes.filter(fileterAvailable);
  },
};

export const mutations = {
  SET_STUDENTS(state, data) {
    state.students = data;
    state.studentsLoaded = true;
  },
  SET_CLASSES(state, data) {
    state.classes = data;
    state.classesLoaded = true;
  },
  SET_THEME(state) {
    state.isPink = !state.isPink;
  },
  SET_ERROR(state, e) {
    state.error = e;
  },
};

export const actions = {
  changeTheme({ commit }) {
    return commit("SET_THEME");
  },
  async fetchStudents({ commit }) {
    return await BezeferService.getStudents()
      .then((response) => {
        commit("SET_STUDENTS", response);
      })
      .catch((error) => {
        commit("SET_ERROR", error);
        throw error;
      });
  },
  async fetchClasses({ commit }) {
    return await BezeferService.getClasses()
      .then((response) => {
        commit("SET_CLASSES", response);
      })
      .catch((error) => {
        commit("SET_ERROR", error);
        throw error;
      });
  },
  async deleteStudent({ commit, dispatch }, id) {
    return await BezeferService.deleteStudent(id)
      .then(() => {
        dispatch("fetchStudents");
      })
      .catch((error) => {
        commit("SET_ERROR", error);
        throw error;
      });
  },
  async deleteClass({ commit, dispatch }, id) {
    return await BezeferService.deleteClass(id)
      .then(() => {
        dispatch("fetchClasses");
      })
      .catch((error) => {
        commit("SET_ERROR", error);
        throw error;
      });
  },
};

function fileterAvailable(item) {
  if (item.maxSeats - item.currentCapacity > 0) {
    return true;
  }
}
