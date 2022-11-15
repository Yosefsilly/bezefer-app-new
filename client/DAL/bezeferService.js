import axios from "axios";

const url = "http://localhost:8080/";

class BezeferService {
  static async getStudents() {
    try {
      return Promise.resolve(await axios.get(`${url}students`)).then(
        (res) => res.data
      )
    } catch (err) {
      return err
    }
  }
  static deleteStudent(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}students/${id}`);
        resolve(res);
      } catch (err) {
        return err
      }
    });
  }
  static getClasses() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await axios.get(`${url}classes`));
      } catch (err) {
        return err;
      }
    });
  }
}

export default BezeferService;
