import { Route, Routes } from 'react-router-dom'

import LoginAndRegister from '../components/pages/register'
import PrivateRoute from './PrivateRoute'
const AppRoutes: React.FC = (...props) => {
  return (
    <Routes {...props}>
      <Route path="/" element={<LoginAndRegister />} />
      <Route path="/login" element={<LoginAndRegister />} />
      <PrivateRoute element={<LoginAndRegister/>}/>
    </Routes>
  )
}

export default AppRoutes
