import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './pages/layout'
import Feed from './pages/feed'
import Map from './pages/map'
import Paths from './paths'
import theme from './styles/theme'
import { ThemeProvider } from '@mui/system'
import { Header } from './components'
import Saved from './pages/savedScreen'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SignIn from './pages/signIn'
import Profile from './pages/profile'
import SignUp from './pages/signUp'
import FeedContext from './context/FeedContext'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FeedContext>
            <Header />
            <Routes>
              <Route path={Paths.Root} element={<Layout />}>
                <Route path={Paths.Root} element={<Feed />}></Route>
                <Route path={Paths.Map} element={<Map />} />
                <Route path={Paths.Bookmarks} element={<Saved />}></Route>
                <Route path={Paths.Profile} element={<Profile />}></Route>
                <Route path={Paths.SignIn} element={<SignIn />}></Route>
                <Route path={Paths.SignUp} element={<SignUp />}></Route>
              </Route>
            </Routes>
          </FeedContext>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
