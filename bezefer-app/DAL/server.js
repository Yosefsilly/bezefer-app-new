import axios from 'axios'
const url = "http://localhost:8080/"

class bezeferService {
    static async getStudents() {
        try {
            return await axios.get(`${url}students`)
        } catch(err) {
            return err
        }
    }
    static async getClasses() {
        try {
            return await axios.get(`${url}classes`)
        } catch(err) {
            return err
        }
    }
}

export default bezeferService