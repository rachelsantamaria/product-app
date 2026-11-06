import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { Product } from "../models/response/Product";
import { deleteProduct, getProducts } from "../services/ProductService";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
            : "Error al obtener los productos",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleDelete = async (productResourceId: string) => {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );

    if (!confirmed) return;

    setDeletingId(productResourceId);
    setError(null);

    try {
      await deleteProduct(productResourceId);

      // Actualizar la tabla sin recargar la página
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.productResourceId !== productResourceId,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div>
        <Link to="/products/new">+ Agregar producto</Link>
      </div>

      {error && (
        <div role="alert" style={{ color: "red", margin: "10px 0" }}>
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productResourceId}>
                    <td>{product.productResourceId}</td>
                    <td>{product.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.productResourceId)}
                        disabled={deletingId !== null}
                        title={`Eliminar ${product.name}`}
                        aria-label={`Eliminar ${product.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <Link
                        to={`/products/${product.productResourceId}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
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
