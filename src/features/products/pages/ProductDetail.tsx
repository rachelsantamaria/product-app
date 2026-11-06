import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/ProductService";
import type { Product } from "../models/response/Product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      if (!id) {
        if (active) {
          setError("Identificador de producto no válido");
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductById(id);

        if (active) {
          setProduct(data);
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Error al obtener el producto"
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div>
      <div>
        <h2>Detalle del producto</h2>

        {isLoading && <p>Cargando producto...</p>}

        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && product && (
          <div>
            <div>
              <label>Product Resource ID</label>
              <p>{product.productResourceId}</p>
            </div>

            <div>
              <label>Nombre del producto</label>
              <p>{product.name}</p>
            </div>
          </div>
        )}

        <div>
          <Link to="/products">Volver a productos</Link>
        </div>
      </div>
    </div>
  );
}