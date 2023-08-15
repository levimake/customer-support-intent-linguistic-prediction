import Home from './pages/Home'
import Chat from './pages/Chat'
import Teams from './pages/Teams'
// import Demo from './components/ModelDemo'
import Layout from './Layout/Layout'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Layout classname="flex items-stretch">

      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/teams" element={<Teams/>}/>
            <Route path="/chat" element={<Chat/>}/>
            {/* <Route path="/demo" element={<Demo/>}/> */}
          </Routes>
      </Router>
    
    </Layout>
    </>
  )
}

export default App
