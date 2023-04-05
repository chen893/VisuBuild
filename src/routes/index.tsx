import { Route, type RouteObject, Routes } from 'react-router-dom'

import LoginAndRegister from '../components/pages/LoginAndRegister'
import PrivateRoute from './PrivateRoute'
import Editor from '../components/pages/Editor'
import Home from '../components/pages/Home'
import React from 'react'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
    // children: [
    //   { path: 'login', element: <LoginAndRegister /> }

    // ]
  },
  {
    path: 'login',
    element: <LoginAndRegister />
  },
  { path: 'editor', element: <Editor /> }
]
const AppRoutes: React.FC = () => {
  return (
    <Routes>

      {routes.map((route, index) => {
        // route.wrapper ||
        const Wrapper = React.Fragment
        return (
          <Wrapper key={index}>
            <Route path={route.path} element={route.element}>
              {(route.children != null) && <Routes>{route.children.map((childRoute, childIndex) => {
                // childRoute.wrapper ||
                const ChildWrapper = React.Fragment
                return (
                  <ChildWrapper key={childIndex}>
                    <Route path={childRoute.path} element={childRoute.element} />
                  </ChildWrapper>
                )
              })}</Routes>}
            </Route>
          </Wrapper>
        )
      })}

    </Routes>
  )
}
export default AppRoutes
