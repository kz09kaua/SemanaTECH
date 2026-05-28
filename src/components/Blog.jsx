import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaCalendarAlt, FaUser, FaFolderOpen, FaSearch, FaArrowRight, 
  FaTimes, FaNewspaper, FaFire, FaEye, FaClock, FaTags 
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { blogPosts } from '../data/content'

// ============================================
// ANIMAÇÕES PADRONIZADAS
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const stagger = (delayChildren = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
}

// ============================================
// COMPONENTES
// ============================================

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md 
                 hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Imagem com overlay gradiente */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001C30]/60 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Categoria badge na imagem */}
        <div className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-semibold 
                        px-3 py-1 rounded-full shadow-md">
          {post.category}
        </div>
        
        {/* Indicador de tempo de leitura */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white 
                        text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <FaClock size={10} />
          <span>5 min leitura</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Metadados */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-cyan-500" /> 
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <FaUser className="text-cyan-500" /> 
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-cyan-500" /> 
            {Math.floor(Math.random() * 1000) + 100} visualizações
          </span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-[#001C30] mb-3 line-clamp-2 
                       group-hover:text-cyan-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Resumo */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Link de leitura */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-cyan-600 font-semibold 
                     hover:text-cyan-700 transition-all duration-300 group/link
                     text-sm"
        >
          <span>Ler artigo completo</span>
          <FaArrowRight className="text-sm group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Linha decorativa no hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.article>
  )
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [showAll, setShowAll] = useState(false)
  const visibleCategories = showAll ? categories : categories.slice(0, 6)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm
              ${selectedCategory === cat
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {cat === 'Todos' ? <span className="flex items-center gap-1">📋 Todos</span> : cat}
          </motion.button>
        ))}
      </div>
      
      {categories.length > 6 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-cyan-500 text-sm font-medium hover:text-cyan-600 transition-colors self-start"
        >
          + Ver mais categorias
        </button>
      )}
    </div>
  )
}

const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubscribed(true)
    setEmail('')
    setLoading(false)
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20 bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <FaNewspaper className="text-5xl text-cyan-300 mx-auto mb-4" />
      <h3 className="text-2xl md:text-3xl font-bold mb-2">
        Receba conteúdos exclusivos
      </h3>
      <p className="mb-6 text-cyan-100 max-w-md mx-auto">
        Assine nossa newsletter e fique por dentro de lançamentos, dicas e cases do setor plástico.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
        <div className="flex-1 relative">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail" 
            required
            className="w-full px-5 py-3 rounded-full text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400
                       placeholder:text-gray-400"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 
                     rounded-full font-semibold transition-all duration-300 
                     shadow-lg hover:shadow-xl hover:-translate-y-0.5
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Assinar
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
      
      <AnimatePresence>
        {subscribed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-cyan-200 text-sm mt-4"
          >
            ✓ Inscrição realizada com sucesso! Agora você receberá nossas novidades.
          </motion.p>
        )}
      </AnimatePresence>
      
      <p className="text-xs text-cyan-200/70 mt-4">
        Não enviamos spam. Você pode cancelar a qualquer momento.
      </p>
    </motion.div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)

  const categories = ['Todos', ...new Set(blogPosts.map(post => post.category))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.slice(0, 3)
  const recentPosts = filteredPosts.slice(3, 6)

  // Estatísticas do blog
  const blogStats = {
    totalPosts: blogPosts.length,
    categories: categories.length - 1,
    totalViews: blogPosts.reduce((acc, post) => acc + (post.views || 0), 0) + 15000
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* ========== CABEÇALHO ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1 rounded-full mb-4"
          >
            Blog e Conteúdos
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#001C30] mb-4">
            Blog e <span className="text-cyan-500">Novidades</span>
          </h1>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fique por dentro das tendências, inovações e cases do setor plástico. 
            Conteúdo técnico e estratégico para sua indústria.
          </p>
        </motion.div>

        {/* ========== ESTATÍSTICAS DO BLOG ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          {[
            { value: blogStats.totalPosts, label: 'Artigos publicados', icon: FaNewspaper },
            { value: blogStats.categories, label: 'Categorias', icon: FaTags },
            { value: '15k+', label: 'Visualizações', icon: FaEye }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="text-center p-4 bg-white rounded-xl shadow-sm border border-cyan-100"
            >
              <stat.icon className="text-cyan-500 text-xl mx-auto mb-2" />
              <div className="text-xl font-bold text-[#001C30]">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== BARRA DE BUSCA E FILTROS ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="Buscar artigos por título ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 
                           focus:border-transparent transition-all bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filtros de categoria */}
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </motion.div>

        {/* ========== RESULTADO DA BUSCA ========== */}
        <AnimatePresence mode="wait">
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-cyan-50 rounded-xl border border-cyan-100"
            >
              <p className="text-gray-600 text-sm">
                🔍 {filteredPosts.length} resultado(s) encontrado(s) para "{searchTerm}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== DESTAQUES ========== */}
        {filteredPosts.length > 0 && selectedCategory === 'Todos' && !searchTerm && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaFire className="text-orange-500" />
              <h2 className="text-xl font-bold text-[#001C30]">Artigos em Destaque</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} index={idx} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ========== GRID DE POSTS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(searchTerm || selectedCategory !== 'Todos' ? filteredPosts : recentPosts).map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </motion.div>

        {/* ========== NENHUM RESULTADO ========== */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-cyan-50/50 rounded-2xl p-10 max-w-md mx-auto border border-cyan-100">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-3xl text-cyan-400" />
              </div>
              <p className="text-gray-500 mb-4">Nenhum artigo encontrado com os filtros atuais.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todos')
                }}
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 
                           font-medium transition-colors"
              >
                Limpar todos os filtros
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========== NEWSLETTER ========== */}
        <NewsletterForm />

      </div>
    </section>
  )
}

export default Blog