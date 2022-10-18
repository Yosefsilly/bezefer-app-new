import axios from 'axios'
import { promise } from 'protractor'

const url = 'http://loclahost:5000/'


class bezeferService {
    static getStudents = () => {
        return new promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}students`)
                const data = res.data
                resolve(
                    data.map(student => ({
                        ...student
                    }))
                )
            } catch(err) {
                reject(err)
            }
        })
    }
}

export default bezeferService