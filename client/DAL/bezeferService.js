import axios from "axios";

const url = "http://localhost:8080/";

class BezeferService {
  static async getStudents() {
    try {
      return Promise.resolve(await axios.get(`${url}students`)).then(
        (res) => res.data
      );
    } catch (err) {
      throw err;
    }
  }
  static deleteStudent(id) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.delete(`${url}students/${id}`);
        resolve(res);
      } catch (err) {
        throw err;
      }
    });
  }
  static deleteClass(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}classes/${id}`);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
  static async getClasses() {
    try {
      return Promise.resolve(await axios.get(`${url}classes`)).then(
        (res) => res.data
      );
    } catch (err) {
      throw err;
    }
  }
  static async getIsClassIdExist(classId) {
    try {
      return Promise.resolve(
        await axios.get(`${url}classes/isExist/${classId}`)
      ).then((res) => res.data);
    } catch (err) {
      reject(err);
    }
  }
  static async addClass(data) {
    try {
      return Promise.resolve(
        await axios({
          method: "post",
          url: `${url}classes`,
          data: {
            classId: data.classId,
            name: data.name,
            maxSeats: data.maxSeats,
          },
        })
      ).then((res) => res.data);
    } catch (err) {
      throw err;
    }
  }
  static async addStudent(data) {
    try {
      return Promise.resolve(
        await axios({
          method: "post",
          url: `${url}students`,
          data: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            profession: data.profession,
          },
        })
      ).then((res) => res.data);
    } catch (err) {
      throw err;
    }
  }

  static assignStudent(ids) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.patch(`${url}students/${ids.studentId}`, {
          classId: ids.classId,
        });
        resolve(res);
      } catch (err) {
        throw err;
      }
    });
  }
  static getStudentsInClass(classId) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.get(`${url}students/all`, {
          params: { id: classId },
        });
        resolve(res);
      } catch (err) {
        throw err;
      }
    });
  }
  static removeStudentFromClass(id) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.patch(`${url}students/removefromclass/${id}`);
        resolve(res);
      } catch (err) {
        throw err;
      }
    });
  }
}

export default BezeferService;
