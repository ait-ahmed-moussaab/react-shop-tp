import { useState } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProductList from './components/ProductList/ProductList.jsx'
import CartModal from './components/CartModal/CartModal.jsx'
import { useDebounce } from './hooks/useDebounce.js'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedQuery = useDebounce(searchQuery, 400)

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value)
          setCurrentPage(1)
        }}
        onCartClick={() => {
          setIsCartOpen(true)
        }}
      />

      <main className="flex-grow-1 container py-4">
        <ProductList
          searchQuery={debouncedQuery}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
        />
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false)
        }}
      />
    </div>
  )
}
