import { motion } from 'framer-motion'
import { 
  FaCheckCircle, FaRocket, FaRecycle, FaMedal, 
  FaChartLine, FaClock, FaAward, FaUsers, 
  FaLeaf, FaIndustry, FaBoxOpen, FaTruck 
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

// ============================================
// DIFERENCIAIS ESPECÍFICOS DA H2B PLÁSTICOS
// ============================================

const DIFFERENTIALS_DATA = [
  {
    icon: FaMedal,
    title: 'Qualidade Premium',
    description: 'Certificação ISO 9001 e rigoroso controle de qualidade em todo processo produtivo.',
    stats: '+12 anos de excelência',
    color: 'cyan'
  },
  {
    icon: FaRecycle,
    title: 'Compromisso Sustentável',
    description: '+50 toneladas de plástico reciclado por mês. Redução ativa da pegada de carbono.',
    stats: 'Meta 2027: 100% circular',
    color: 'cyan'
  },
  {
    icon: FaRocket,
    title: 'Inovação Tecnológica',
    description: 'Laboratório próprio e parcerias com universidades para desenvolvimento de novas resinas.',
    stats: 'Pesquisa contínua',
    color: 'cyan'
  },
  {
    icon: FaClock,
    title: 'Agilidade na Entrega',
    description: 'Frota própria e logística otimizada para atender todo território nacional.',
    stats: 'Entregas em até 48h',
    color: 'cyan'
  },
  {
    icon: FaBoxOpen,
    title: 'Produtos Especializados',
    description: 'Garrafões de água mineral, tampas e embalagens para produtos lácteos de alta resistência.',
    stats: 'Referência nacional',
    color: 'cyan'
  },
  {
    icon: FaLeaf,
    title: 'Economia Circular',
    description: 'Reintegração de resíduos pós-consumo e pós-industrial à cadeia produtiva.',
    stats: '+50t/mês recicladas',
    color: 'cyan'
  },
  {
    icon: FaUsers,
    title: 'Atendimento Personalizado',
    description: 'Consultoria técnica especializada e soluções sob medida para cada cliente.',
    stats: 'Satisfação 98%',
    color: 'cyan'
  },
  {
    icon: FaTruck,
    title: 'Logística Eficiente',
    description: 'Entregas programadas e monitoradas para garantir o melhor prazo e segurança.',
    stats: 'Cobertura nacional',
    color: 'cyan'
  }
]

// ============================================
// ANIMAÇÕES
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const stagger = (delayChildren = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 200 } 
  },
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Differentials = () => {
  const firstRow = DIFFERENTIALS_DATA.slice(0, 4)
  const secondRow = DIFFERENTIALS_DATA.slice(4, 8)

  return (
    <section
      id="differentials"
      className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-6">

        {/* ========== CABEÇALHO ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-1 rounded-full mb-4"
          >
            Vantagens Competitivas
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-4">
            Diferenciais <span className="text-cyan-500">Competitivos</span>
          </h2>

          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6 rounded-full" />

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Por que a H2B Plásticos é a escolha certa para sua empresa.
            Qualidade, inovação e sustentabilidade em cada solução.
          </p>
        </motion.div>

        {/* ========== PRIMEIRA LINHA ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {firstRow.map((diff, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden 
                         shadow-lg hover:shadow-2xl transition-all duration-500 
                         border border-gray-100 hover:-translate-y-2"
            >
              {/* EFEITO DE FUNDO */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* BORDA BRILHO */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-200/0 group-hover:border-cyan-200/70 transition-all duration-500" />

              {/* CONTEÚDO */}
              <div className="relative p-6">

                {/* ÍCONE */}
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <diff.icon className="text-2xl text-cyan-600" />
                  </div>

                  {/* GLOW */}
                  <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TÍTULO */}
                <h3 className="text-lg font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                  {diff.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {diff.description}
                </p>

                {/* STATUS */}
                <div className="inline-block bg-cyan-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-cyan-600">
                    {diff.stats}
                  </span>
                </div>

                {/* LINHA ANIMADA */}
                <div className="w-12 h-0.5 bg-cyan-300 mt-5 rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== SEGUNDA LINHA ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {secondRow.map((diff, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden 
                         shadow-lg hover:shadow-2xl transition-all duration-500 
                         border border-gray-100 hover:-translate-y-2"
            >
              {/* EFEITO DE FUNDO */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* BORDA BRILHO */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-200/0 group-hover:border-cyan-200/70 transition-all duration-500" />

              {/* CONTEÚDO */}
              <div className="relative p-6">

                {/* ÍCONE */}
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <diff.icon className="text-2xl text-cyan-600" />
                  </div>

                  {/* GLOW */}
                  <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TÍTULO */}
                <h3 className="text-lg font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                  {diff.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {diff.description}
                </p>

                {/* STATUS */}
                <div className="inline-block bg-cyan-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-cyan-600">
                    {diff.stats}
                  </span>
                </div>

                {/* LINHA ANIMADA */}
                <div className="w-12 h-0.5 bg-cyan-300 mt-5 rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== DESTAQUE ESPECIAL ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 rounded-2xl p-6 border border-cyan-200/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              <div className="flex items-center gap-4">
                <div className="bg-cyan-100 rounded-full p-3">
                  <FaIndustry className="text-2xl text-cyan-600" />
                </div>

                <div>
                  <h4 className="font-bold text-[#001C30] text-lg">
                    Especialistas em Água Mineral e Produtos Lácteos
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Produção de garrafões, tampas e embalagens com alta resistência e segurança
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">50+</div>
                  <p className="text-xs text-gray-500">t/mês recicladas</p>
                </div>

                <div className="w-px h-10 bg-cyan-200" />

                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">98%</div>
                  <p className="text-xs text-gray-500">satisfação</p>
                </div>

                <div className="w-px h-10 bg-cyan-200" />

                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">12+</div>
                  <p className="text-xs text-gray-500">anos de mercado</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== SELOS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            { text: 'Certificação ISO 9001', icon: FaAward },
            { text: 'Selo Verde', icon: FaLeaf },
            { text: 'Qualidade Garantida', icon: FaCheckCircle },
            { text: 'Compromisso Ambiental', icon: FaRecycle },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border border-cyan-100 hover:shadow-xl transition-all duration-500"
            >
              <item.icon className="text-cyan-500 text-sm" />
              <span className="text-gray-700 text-sm font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== CTA ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-3">
              Pronto para elevar a qualidade da sua embalagem?
            </h3>

            <p className="text-cyan-100 mb-6 max-w-xl mx-auto">
              Solicite uma proposta comercial e descubra como podemos atender sua empresa com excelência.
            </p>

            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 
                         text-white font-semibold px-8 py-3 rounded-full 
                         transition-all duration-300 shadow-lg hover:shadow-xl 
                         hover:-translate-y-1 group"
            >
              Solicitar proposta comercial

              <FaRocket className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Differentials