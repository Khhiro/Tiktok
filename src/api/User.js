import axios from "axios"

const API = 'http://localhost:2211/user'

export default async function getData(){
  try {
    const {user} = await axios.get(API)
    getUser(user)
  } catch (error) {
    onslotchange.log("error Get")
  }
}
export async function postData (user){
try {
  await axios.post(`${API}`/`${user}`)
  getData()
} catch (error) {
  console.log("error Post")
}
}