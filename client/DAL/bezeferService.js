import axios from "axios";

const url = "http://localhost:8080/";

class BezeferService {
  static async getStudents() {
    try {
      return Promise.resolve(await axios.get(`${url}students`)).then(
        (res) => res.data
      )
    } catch (err) {
      throw err
    }
  }
  static deleteStudent(id) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.delete(`${url}students/${id}`);
        resolve(res);
      } catch (err) {
        throw err
      }
    });
  }
  static deleteClass(id) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.delete(`${url}classes/${id}`);
        resolve(res);
      } catch (err) {
        throw err
      }
    });
  }
  static async getClasses() {
    try {
      return Promise.resolve(await axios.get(`${url}classes`)).then(
        (res) => res.data
      )
      } catch (err) {
        throw err;
      }
    
  }
  static assignStudent(ids) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.patch(`${url}students/${ids.studentId}`, {classId: ids.classId});
        resolve(res);
      } catch (err) {
        throw err
      }
    });
  }
  static getStudentsInClass(classId) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.get(`${url}students/${classId}`);
        resolve(res);
      } catch (err) {
        throw err
      }
    });
  }
  static removeStudentFromClass(id) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.patch(`${url}students/removefromclass/${id}`);
        resolve(res);
      } catch (err) {
        throw err
      }
    });
  }
}

export default BezeferService;
