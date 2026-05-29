import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Practice from './pages/Practice'
import MockTest from './pages/MockTest'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/mock-test" element={<MockTest />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  )
}
