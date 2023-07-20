import { Link } from 'react-router-dom'
export default () => {
  return (
    <div className='flex gap-2 color'>
      <Link to={"/"}>Home</Link>
      <Link to={"/test"}>Test</Link>
    </div>
  )
}