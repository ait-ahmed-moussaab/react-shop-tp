import ProductCard from '../ProductCard/ProductCard.jsx'
import Pagination from '../Pagination/Pagination.jsx'
import { useProducts, PAGE_SIZE } from '../../hooks/useProducts.js'
import { useCartContext } from '../../context/cartContext.js'

/**
 * ProductList — grille de produits avec pagination.
 *
 * Props :
 *   searchQuery  : string   — requête de recherche (débouncée)
 *   currentPage  : number   — page courante (1-based)
 *   onPageChange : function — appelée avec le nouveau numéro de page
 */
export default function ProductList({ searchQuery, currentPage, onPageChange }) {
  const { products, total, loading, error } = useProducts(searchQuery, currentPage)
  const { addToCart } = useCartContext()

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-search fs-1 d-block mb-2"></i>
          Aucun produit trouvé.
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
