import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Layout from './common/layout/Layout'
import { useSelector } from 'react-redux'

function App() {

  const PrivateRoute = ({children}) => {
    const {authToken} = useSelector(state => state.auth);
    return authToken ? children : <Navigate to={"/login"} replace />
  }

  const PublicRoute = ({children}) => {
  const {authToken} = useSelector(state => state.auth);
  return authToken ? <Navigate to="/" replace /> : children;
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        
        <Route path='/' element={<Layout />}>
          <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
