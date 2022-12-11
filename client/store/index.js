import BezeferService from "../DAL/bezeferService";

export const state = () => ({
  isPink: false,
  colors: { blue: "#3F50B5", pink: "#F50057" },
  students: [],
  classStudents: [],
  classes: [],
  isClassIdExist: false,
  error: {},
  classesLoaded: false,
  studentsLoaded: false,
  addClassLoading: false,
  addStudentLoading: false,
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
  getClassStudents(state) {
    return state.classStudents;
  },
  getError(state) {
    return state.error;
  },
  getAvailableClasses(state) {
    return state.classes.filter(fileterAvailable);
  },
  getIsAssigned: (state) => (id) => {
    const student = state.students.find((element) => element.id == id) || null;
    return student ? (student.classId ? true : false) : false;
  },
  getAddClassLoading(state) {
    return state.addClassLoading;
  },
  getAddStudentLoading(state) {
    return state.addStudentLoading;
  },
};

export const mutations = {
  setStudents(state, data) {
    state.students = data;
    state.studentsLoaded = true;
  },
  setClassStudents(state, data) {
    state.classStudents = data;
  },
  setClasses(state, data) {
    state.classes = data;
    state.classesLoaded = true;
  },
  setTheme(state) {
    state.isPink = !state.isPink;
  },
  setError(state, e) {
    state.error = e;
  },
  setAddClassLoading(state) {
    state.addClassLoading = !state.addClassLoading;
  },
  setAddStudentsLoading(state) {
    state.addStudentLoading = !state.addStudentLoading;
  },
  setIsClassIdExist(state, value) {
    state.isClassIdExist = value
  }
};

export const actions = {
  changeTheme({ commit }) {
    return commit("setTheme");
  },
  async fetchStudents({ commit }) {
    return await BezeferService.getStudents()
      .then((response) => {
        commit("setStudents", response);
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async fetchClasses({ commit }) {
    return await BezeferService.getClasses()
      .then((response) => {
        commit("setClasses", response);
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async fetchStudentsInClass({ commit }) {
    await BezeferService.getStudentsInClass()
      .then((response) => {
        console.log(response, "hiii");
        commit("setClassStudents", response.data, );
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async deleteStudent({ commit, dispatch }, id) {
    return await BezeferService.deleteStudent(id)
      .then(() => {
        dispatch("fetchStudents", "fetchClasses");
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async deleteClass({ commit, dispatch }, id) {
    return await BezeferService.deleteClass(id)
      .then(() => {
        dispatch("fetchClasses");
      })
      .catch((error) => {
        commit("setError", error);
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
        commit("setError", error);
        throw error;
      });
  },
  async removeStudentFromClass({ commit, dispatch }, id) {
    return await BezeferService.removeStudentFromClass(id)
      .then(() => {
        dispatch("fetchClasses");
        dispatch("fetchStudents");
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async addClass({ commit, dispatch }, data) {
    commit("setAddClassLoading");
    return await BezeferService.addClass(data)
      .then(() => {
        dispatch("fetchClasses");
        dispatch("fetchStudents");
        commit("setAddClassLoading");
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async addStudent({ commit, dispatch, getters }, data) {
    commit("setAddStudentsLoading");
    return await BezeferService.addStudent(data)
      .then(() => {
        dispatch("fetchClasses");
        dispatch("fetchStudents");
        commit("setAddStudentsLoading");
      })
      .catch((error) => {
        commit("setError", error);
        throw error;
      });
  },
  async fetchIsClassIdExist({ commit }, classID) {
    return await BezeferService.getIsClassIdExist(classID).then((value) => {
      commit("setIsClassIdExist", value)
    }).catch((err) => {
      commit("setError", err)
    })
  }
};

function fileterAvailable(item) {
  return item.maxSeats - item.currentCapacity > 0;
}
