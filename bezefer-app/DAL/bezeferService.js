import axios from "axios";

const url = "http://localhost:8080/";

class BezeferService {
  static getStudents() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}students`);
          const data = res.data;
          console.log(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
    static deleteStudent(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}students/${id}`)
                resolve(res)
            } catch (err) {
                reject(err)
          }
      })
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
