import { Outlet } from 'react-router'
import './styles/App.css'
import { ROUTES } from './routes'
import { redirect } from 'react-router'
function App() {

  return (
    <>
  <Outlet />
  <div>Hello</div>
  <button onClick={() => {
    console.log("Clicked")
    redirect('/auth')
    }}> click</button>
  </>
)
   
}

export default App
