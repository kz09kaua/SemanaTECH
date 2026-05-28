import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight, FaClock, FaChartLine, FaHandshake, FaShieldAlt, FaRocket, FaLeaf } from 'react-icons/fa'
import { services } from '../data/content'

// ============================================
// CONSTANTES DE ANIMAÇÃO
// ============================================

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
}

const benefitsData = [
  { title: 'Atendimento Personalizado', desc: 'Consultores dedicados para cada cliente', icon: FaHandshake },
  { title: 'Suporte Técnico 24/7', desc: 'Equipe sempre disponível para emergências', icon: FaClock },
  { title: 'Relatórios Gerenciais', desc: 'Acompanhamento de KPIs e métricas', icon: FaChartLine },
  { title: 'Garantia de Qualidade', desc: 'Certificação ISO 9001 e controle rigoroso', icon: FaShieldAlt },
  { title: 'Inovação Contínua', desc: 'Laboratório próprio e novas soluções', icon: FaRocket },
  { title: 'Compromisso Sustentável', desc: 'Práticas ecológicas e economia circular', icon: FaLeaf },
]

// ============================================
// SUBCOMPONENTE MEMOIZADO PARA OS CARDS DE SERVIÇO
// ============================================

const ServiceCard = memo(({ svc, idx, isHovered, onMouseEnter, onMouseLeave, shouldReduceMotion }) => {
  const Icon = svc.icon
  
  return (
    <motion.article
      variants={fadeInUpVariants}
      transition={{ delay: idx * 0.05 }}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[320px] border border-gray-100"
    >
      {/* Background Glow no hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      
      <div className="relative z-10">
        {/* Ícone com efeito */}
        <div className="relative mb-5">
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
            <Icon className="text-2xl text-white" aria-hidden="true" />
          </div>
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold text-[#001C30] mb-3 text-center group-hover:text-cyan-600 transition-colors duration-300">
          {svc.title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 text-center leading-relaxed text-sm">
          {svc.desc}
        </p>
      </div>
      
      {/* Link de Ação com Layout Estável (aparece apenas no hover) */}
      <div className="text-center h-6 mt-6 relative z-10 flex items-center justify-center">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:gap-3 transition-all focus:outline-none focus:underline"
                aria-label={`Solicitar serviço de ${svc.title}`}
              >
                Solicitar este serviço <FaArrowRight className="text-xs" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Linha decorativa no hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
    </motion.article>
  )
})
ServiceCard.displayName = 'ServiceCard'

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const shouldReduceMotion = useReducedMotion() // Respeita a configuração do sistema do usuário

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section id="services" className="pt-32 pb-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden" aria-labelledby="services-heading">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* ========== CABEÇALHO ========== */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-cyan-100 text-cyan-700 text-xs uppercase tracking-wider font-bold px-4 py-1.5 rounded-full">
              Soluções Completas
            </span>
          </div>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-[#001C30] mb-4">
            Serviços <span className="text-cyan-500">Especializados</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Da consultoria estratégica à logística inteligente, entregamos valor em cada etapa da sua cadeia produtiva.
          </p>
        </motion.header>

        {/* ========== GRID DE SERVIÇOS ========== */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {services.map((svc, idx) => (
            <ServiceCard
              key={svc.id || idx}
              svc={svc}
              idx={idx}
              isHovered={hoveredCard === idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

        <section className="mb-24" aria-label="Nossos Diferenciais">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#001C30] mb-3">
              Por que escolher a <span className="text-cyan-500">H2B Plásticos</span>?
            </h3>
            <div className="w-12 h-0.5 bg-cyan-400 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.map((benefit, idx) => {
              const BenefitIcon = benefit.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <BenefitIcon className="text-xl text-cyan-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001C30] mb-1 text-base group-hover:text-cyan-600 transition-colors">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ========== METODOLOGIA ========== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-3xl p-8 md:p-14 mb-24 shadow-xl relative overflow-hidden"
          aria-label="Nossa Metodologia"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
          
          <div className="text-center text-white mb-12 relative z-10">
            <h3 className="text-3xl font-bold mb-3">Nossa Metodologia de Trabalho</h3>
            <p className="text-cyan-100/80 text-sm md:text-base">Como transformamos ideias em soluções reais</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { step: '01', title: 'Diagnóstico', desc: 'Análise detalhada das suas necessidades' },
              { step: '02', title: 'Projeto', desc: 'Desenvolvimento da solução personalizada' },
              { step: '03', title: 'Execução', desc: 'Implementação com acompanhamento' },
              { step: '04', title: 'Otimização', desc: 'Melhoria contínua e suporte' },
            ].map((item, idx) => (
              <div key={idx} className="text-center flex flex-col items-center group">
                <span className="text-4xl font-black text-cyan-300 mb-2 block tracking-wider group-hover:scale-110 transition-transform duration-300">{item.step}</span>
                <div className="w-8 h-[2px] bg-cyan-400/40 my-2 group-hover:w-16 transition-all duration-300" />
                <h4 className="font-bold text-white mb-1.5 text-base">{item.title}</h4>
                <p className="text-xs text-cyan-100/70 max-w-[190px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ========== NÚMEROS QUE COMPROVAM ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '200+', label: 'Clientes ativos' },
              { value: '98%', label: 'Taxa de satisfação' },
              { value: '24/7', label: 'Suporte técnico' },
              { value: '100%', label: 'Qualidade garantida' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-cyan-600">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>



        {/* ========== CHAMADA PARA AÇÃO ========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-gray-100 max-w-5xl mx-auto"
        >
          <FaCheckCircle className="text-5xl text-cyan-500 mx-auto mb-5" aria-hidden="true" />
          <h3 className="text-2xl md:text-3xl font-bold text-[#001C30] mb-3">
            Pronto para elevar a qualidade da sua embalagem?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base leading-relaxed">
            Entre em contato com nossos especialistas e descubra como podemos otimizar seus processos e reduzir custos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            <Link
              to="/produtos"
              className="border-2 border-[#001C30] text-[#001C30] hover:bg-[#001C30] hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-center text-sm tracking-wide hover:-translate-y-0.5"
            >
              Conhecer produtos
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Services