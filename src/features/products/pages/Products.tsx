import ProductsTable from '../components/ProductTable'

export default function Products() {
  return (
    <section aria-labelledby="products-title">
      <div>
        <p>Administración del catálogo</p>
        <h1 id="products-title">Productos</h1>
        <p>
          Consulta, agrega y administra los productos de tu catálogo.
        </p>
      </div>
      <ProductsTable />
    </section>
  )
}
