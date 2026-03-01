
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Layout from './Components/layout/Layout'
import Notfound from './Components/Notfound/Notfound'
import AuthContextProvider from './Context/AuthContextProvider'
import Profile from './Pages/Profile/Profile'
import Gard from './gard/Gard'
import AuthRoute from './authRoute/AuthRoute'
import PostData from './Pages/postData/PostData'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'


let client = new QueryClient()


function App() {
  const [count, setCount] = useState(0)

  let Routes = createBrowserRouter([
    {
      path: '/', element: <Layout />, children:[
        { index: true, element: <Gard> <Home /> </Gard> },
        { path:'/Home', element: <Gard> <Home /> </Gard>},
      { path: '/Login', element: <AuthRoute> <Login /> </AuthRoute> },
      { path: '/Register', element: <AuthRoute> <Register /> </AuthRoute> },
      { path: '/Profile', element: <Gard> <Profile /> </Gard> },
      { path: '*', element: <Notfound /> },
      { path: '/PostData/:postId', element: <Gard> <PostData /> </Gard>  },
    ]
    },

  ])
  return (
    <>
     
     <QueryClientProvider client={client}>


     <AuthContextProvider>

      <ToastContainer />

      <RouterProvider router={Routes} />
      
     </AuthContextProvider>

     </QueryClientProvider>
    </>
  )
}

export default App
