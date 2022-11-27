import BezeferService from "../DAL/bezeferService";

export const state = () => ({
  isPink: false,
  colors: { blue: "#3F50B5", pink: "#F50057" },
  students: [],
  classStudents: [],
  classes: [],
  error: {},
  classesLoaded: false,
  studentsLoaded: false,
});

export const getters = {
  getTheme(state) {
    console.log(state.students);
    return state.isPink;
  },
  getColor(state, getters) {
    return getters.getTheme ? state.colors.pink : state.colors.blue;
  },
  getClasses(state) {
    return state.classes;
  },
  getClassStudents(state) {
    return state.classStudents
  },
  getError(state) {
    return state.error;
  },
  getAvailableClasses(state) {
    return state.classes.filter(fileterAvailable);
  },
  getIsAssigned: (state) => (id) => {
    const student =  state.students.find(element => element.id == id) || null
    return student ? student.classId ? true : false : false
  }
};

export const mutations = {
  SET_STUDENTS(state, data) {
    state.students = data;
    state.studentsLoaded = true;
  },
  SET_CLASS_STUDENTS(state, data) {
    state.classStudents = data
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
  async fetchStudentsInClass({commit}, classId) {
    await BezeferService.getStudentsInClass(classId)
    .then((response) => {
      commit("SET_CLASS_STUDENTS", response.data, classId)
    })
    .catch((error) => {
      commit("SET_ERROR", error);
      throw error;
    })
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
  async assignStudent({ commit, dispatch }, ids) {
    return await BezeferService.assignStudent(ids)
      .then(() => {
        dispatch("fetchClasses");
        dispatch("fetchStudents");
      })
      .catch((error) => {
        commit("SET_ERROR", error);
        throw error;
      });
  },
  async removeStudentFromClass({commit, dispatch}, id) {
    return await BezeferService.removeStudentFromClass(id)
    .then(() => {
      dispatch("fetchClasses");
      dispatch("fetchStudents");
    })
    .catch((error) => {
      commit("SET_ERROR", error);
      throw error;
    });
  }
};

function fileterAvailable(item) {
  if (item.maxSeats - item.currentCapacity > 0) {
    return true;
  }
}
