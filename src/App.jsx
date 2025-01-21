
import {HomePage} from './pages/HomePage'
import {InformationPage} from './pages/InformationPage'
import { Route, Routes } from 'react-router-dom'


export function App(){

  return (<>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/information' element={<InformationPage/>}/>
      </Routes>
  </>);

}

