import axios from "axios"
const NotesPage = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/api/v1/notes")
    console.log(response)
  }
  return (
    <div>
      <button onClick={fetchData}>click</button>
    </div>
  )
}

export default NotesPage