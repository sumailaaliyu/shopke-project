import { useState } from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Navbar from './components/marketing-temp/Navbar'
import Footer from './components/marketing-temp/Footer'
import { products as initialProducts } from './data/products'
import Landing from './pages/Landing/Landing'
import About from './pages/About/About'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import AuthPage from './pages/Auth/AuthPage'
import Onboarding from './pages/Onboarding/Onboarding'
import Overview from './pages/Overview/Overview'
import Orders from './pages/Orders/Orders'
import Products from './pages/Products/Products'
import ProductForm from './pages/ProductForm/ProductForm'
import ContactInfo from './pages/ContactInfo/ContactInfo'
import Payments from './pages/Payments/Payments'
import Customize from './pages/Customize/Customize'
import Settings from './pages/Settings/Settings'
import Storefront from './pages/Storefront/Storefront'

function MarketingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <h1>Page not found</h1>
      <p>That link does not lead anywhere.</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(initialProducts)

  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/signup" element={<AuthPage key="signup" initialMode="signup" />} />
      <Route path="/signin" element={<AuthPage key="signin" initialMode="signin" />} />
      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/s/:storeId" element={<Overview products={products} />} />
      <Route path="/s/:storeId/orders" element={<Orders />} />
      <Route
        path="/s/:storeId/products"
        element={<Products products={products} setProducts={setProducts} />}
      />
      <Route
        path="/s/:storeId/products/new"
        element={<ProductForm products={products} setProducts={setProducts} />}
      />
      <Route
        path="/s/:storeId/products/:productId"
        element={<ProductForm products={products} setProducts={setProducts} />}
      />
      <Route path="/s/:storeId/payments" element={<Payments />} />
      <Route path="/s/:storeId/customize" element={<Customize />} />
      <Route path="/s/:storeId/contact-info" element={<ContactInfo />} />
      <Route path="/s/:storeId/settings" element={<Settings />} />

      <Route path="/store/:storeSlug" element={<Storefront products={products} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App