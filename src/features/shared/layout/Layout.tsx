import { Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar' // O ajusta la ruta según la ubicación de tus componentes
import Footer from '../layout/Footer'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
