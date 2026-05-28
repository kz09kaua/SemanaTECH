import { motion } from 'framer-motion'
import { 
  FaLeaf, FaSolarPanel, FaWater, FaHandsHelping, 
  FaRecycle, FaChartLine, FaAward, FaTree 
} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

// Animações padronizadas
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
}

// Componente de contagem animada
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={countRef} className="text-4xl md:text-5xl font-bold text-cyan-500">
      {count}{suffix}
    </span>
  )
}

const Sustainability = () => {
  const sustainabilityMetrics = [
    { icon: FaRecycle, value: 50, suffix: 't/mês', label: 'Plástico reciclado', color: 'cyan' },
    { icon: FaSolarPanel, value: 40, suffix: '%', label: 'Energia renovável', color: 'cyan' },
    { icon: FaWater, value: 30, suffix: '%', label: 'Redução no consumo de água', color: 'cyan' },
    { icon: FaTree, value: 1000, suffix: '+', label: 'Árvores equivalentes preservadas', color: 'cyan' },
  ]

  const sustainabilityInitiatives = [
    {
      icon: FaLeaf,
      title: 'Economia Circular',
      description: 'Resíduos plásticos pós-consumo e pós-industrial são reintegrados à produção, gerando novo valor e reduzindo o descarte em aterros.',
      metrics: '85% de resíduos reciclados',
      color: 'cyan'
    },
    {
      icon: FaSolarPanel,
      title: 'Energia Solar',
      description: 'Investimos em usinas fotovoltaicas que já atendem 40% da demanda energética da fábrica, reduzindo significativamente nossa pegada de carbono.',
      metrics: '200 ton CO₂/ano evitadas',
      color: 'cyan'
    },
    {
      icon: FaWater,
      title: 'Reuso de Água',
      description: 'Sistema de captação e tratamento de água da chuva, com estação de reuso que reduz o consumo em 30% e protege os recursos hídricos.',
      metrics: '5 milhões L/ano economizados',
      color: 'cyan'
    },
    {
      icon: FaAward,
      title: 'Certificações',
      description: 'Somos signatários do Pacto Global da ONU e possuímos certificação ISO 14001 e selo de material reciclado pós-consumo.',
      metrics: 'Meta 2027: 100% circular',
      color: 'cyan'
    }
  ]

  return (
    <section id="sustainability" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho */}
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
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1 rounded-full mb-4"
          >
            Sustentabilidade
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-4">
            Compromisso com o{' '}
            <span className="text-cyan-500">Planeta</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg">
            A sustentabilidade está integrada ao nosso DNA. Com metas ousadas para 2030, 
            transformamos responsabilidade ambiental em inovação.
          </p>
        </motion.div>

        {/* Métricas principais com contagem animada */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {sustainabilityMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 text-center shadow-md 
                         hover:shadow-xl transition-all duration-300
                         border border-cyan-100"
            >
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <metric.icon className="text-3xl text-cyan-600" />
              </div>
              <CountUp end={metric.value} suffix={metric.suffix} />
              <p className="text-gray-500 text-sm mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid de iniciativas */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {sustainabilityInitiatives.map((initiative, idx) => (
            <motion.div
              key={idx}
              variants={fadeLeft}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                         transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex gap-5 items-start">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 w-14 h-14 
                                rounded-xl flex items-center justify-center shadow-lg
                                group-hover:scale-110 transition-transform duration-300">
                  <initiative.icon className="text-2xl text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#001C30] mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {initiative.description}
                  </p>
                  <div className="inline-block bg-cyan-50 text-cyan-700 text-sm 
                                  font-semibold px-3 py-1 rounded-full">
                    {initiative.metrics}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Card de destaque */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-8 md:p-12 
                     text-center text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-left">
              <FaHandsHelping className="text-5xl text-cyan-300 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                +50 toneladas recicladas por mês
              </h3>
              <p className="text-cyan-100 mb-4">
                Comprometidos com o Pacto Global da ONU e com certificação de material reciclado.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
                  🌍 Pacto Global
                </span>
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
                  ✓ ISO 14001
                </span>
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
                  ♻️ Material Reciclado
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-cyan-300 mb-2">2027</div>
              <p className="text-cyan-100 text-sm">Meta de <br />100% circular</p>
              <div className="w-20 h-1 bg-cyan-400 mx-auto mt-3 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Linha do tempo de sustentabilidade */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20"
        >
          
            
       
        </motion.div>

      </div>
    </section>
  )
}

export default Sustainability