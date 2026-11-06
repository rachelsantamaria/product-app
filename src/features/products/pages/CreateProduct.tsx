import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { getProducts } from "../services/ProductService";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los productos"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <div>
        <Link to="/products/new">
          + Agregar producto
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          style={{ color: "red", margin: "10px 0" }}
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <p role="status">Cargando productos...</p>
      ) : (
        <div>
          <h2>Lista de productos</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Product Resource ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productResourceId}>
                    <td>{product.productResourceId}</td>
                    <td>{product.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}