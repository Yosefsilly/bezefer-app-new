export const state = () => ({
    counter: 0,
    studentsData: {}
  })
  
  export const getters = {
    // getCounter(state) {
    //   return state.counter
    // }
  }
  
  export const mutations = {
      setStudents(state, data) {
          state.studentsData = data
    }
  }
  
  export const actions = {
      setStudents({ context }, data) {
          context.commit("setStudents", data)
    }
  }