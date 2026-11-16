import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import CountryPage from './pages/CountryPage'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="country/:code" element={<CountryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
