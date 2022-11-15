import BezeferService from "../DAL/bezeferService";

export const state = () => ({
  isPink: false,
  colors: { blue: "#3F50B5", pink: "#F50057" },
  students: [],
  classes: [],
});

export const getters = {
  getTheme(state) {
    return state.isPink;
  },
  getColor(state, getters) {
    return getters.getTheme ? state.colors.pink : state.colors.blue;
  },
};

export const mutations = {
  SET_STUDENTS(state, data) {
    state.students = data;
  },
  SET_CLASSES(state) {
    state.classes = state;
  },
  SET_THEME(state) {
    state.isPink = !state.isPink;
  },
};

export const actions = {
  changeTheme({ commit }) {
    return commit("SET_THEME");
  },
  async getStudents({ commit }) {
    return await BezeferService.getStudents().then((response) => {
      commit("SET_STUDENTS", response);
    });
  },
  async getClasses({ commit }) {
    return await BezeferService.getClasses().then((response) => {
      commit("SETCLASSES", response);
    });
  },
  async deleteStudent(context, id) {
    return await BezeferService.deleteStudent(id).then(() => {
      context.dispatch("getStudents");
    });
  },
};
