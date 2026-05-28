import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Services from './components/Services'
import Differentials from './components/Differentials'
import Sustainability from './components/Sustainability'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import PostDetail from './components/PostDetail'
import Contact from './components/Contact'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/diferenciais" element={<Differentials />} />
          <Route path="/sustentabilidade" element={<Sustainability />} />
          <Route path="/depoimentos" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App