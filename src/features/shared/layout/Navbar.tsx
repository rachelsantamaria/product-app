import { Link, NavLink } from 'react-router-dom'
import { Package } from 'lucide-react'

export default function Navbar() {
  return (
    <header>
      <nav aria-label="Navegación principal">
        <Link to="/products">
          <span>
            <Package size={22} aria-hidden="true" />
          </span>
          <span>
            Product<span>Hub</span>
          </span>
        </Link>
        <div>
          <NavLink to="/products" end>
            Productos
          </NavLink>
          <NavLink to="/products/new">
            Nuevo producto
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
