import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <span aria-hidden="true">404</span>
      <p>Error 404 Fuera de ruta</p>
      <h1 id="not-found-title">Esta página no existe</h1>
      <p>
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Retoma el camino y descubre tu próximo auto.
      </p>
      <div>
        <Link to="/">Volver al inicio</Link>
        <Link to="/products">
          Volver a productos <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}