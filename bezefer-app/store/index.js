import BezeferService from "../DAL/bezeferService";

export const state = () => ({
  isPink: false,
  colors: { blue: "#3F50B5", pink: "#F50057" },
  students: [],
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
    state.studentsData = data;
  },
  SET_THEME(state) {
    state.isPink = !state.isPink
  }
};

export const actions = {
  async getStudents({ commit }) {
    return await BezeferService.getStudents().then((response) => {
      commit("SET_STUDENTS", response);
    });
  },
  changeTheme({ commit }) {
    return commit("SET_THEME");
  },
};
