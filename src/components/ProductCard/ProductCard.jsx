/**
 * ProductCard — affiche les informations d'un produit.
 *
 * Props :
 *   product     : object   — objet produit de l'API dummyjson
 *   onAddToCart : function — appelée avec le produit en argument
 *
 * Structure d'un produit dummyjson :
 *   { id, title, price, thumbnail, rating, category, ... }
 */
export default function ProductCard({ product, onAddToCart }) {
  const { title, price, thumbnail, rating } = product

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={thumbnail}
        className="card-img-top"
        alt={title}
        style={{ height: 200, objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{title}</h6>
        <p className="text-muted small mb-1">
          <i className="bi bi-star-fill text-warning me-1"></i>
          {rating}
        </p>
        <p className="fw-bold mt-auto mb-2">{price.toFixed(2)} $</p>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onAddToCart(product)}
        >
          <i className="bi bi-cart-plus me-1"></i>Ajouter au panier
        </button>
      </div>
    </div>
  )
}
