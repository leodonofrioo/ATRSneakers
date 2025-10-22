import { Service } from '../types';

export const services: Service[] = [
  // PLANOS DE LAVAGEM
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    description: 'Limpeza básica completa para manter seus tênis sempre limpos',
    price: 69.90,
    duration: 3,
    category: 'lavagem',
    features: [
      'Lavagem externa',
      'Neutralizador de odores'
    ]
  },
  {
    id: 'deep-wash',
    name: 'Deep Wash',
    description: 'Limpeza profunda para tênis com sujeira mais intensa',
    price: 89.90,
    duration: 5,
    category: 'lavagem',
    features: [
      'Lavagem completa',
      'Higienização interna',
      'Neutralizador de odores'
    ]
  },
  {
    id: 'ultimate-wash',
    name: 'Ultimate Wash',
    description: 'Limpeza premium com tratamento completo e acabamento superior',
    price: 109.90,
    duration: 7,
    category: 'lavagem',
    features: [
      'Lavagem completa',
      'Higienização interna',
      'Neutralizador de odores',
      'Impermeabilização'
    ]
  },
  // PROTEÇÃO
  {
    id: 'impermeabilizacao',
    name: 'Impermeabilização',
    description: 'Proteção completa contra água e manchas',
    price: 59.90,
    duration: 7,
    category: 'protecao',
    features: [
      'Proteção contra água',
      'Proteção contra manchas',
      'Aplicação profissional',
      'Durabilidade prolongada'
    ]
  },
  {
    id: 'hidratacao-couro',
    name: 'Hidratação do Couro',
    description: 'Tratamento especializado para manter o couro macio e flexível',
    price: 39.90,
    duration: 7,
    category: 'protecao',
    features: [
      'Hidratação profunda',
      'Restaura flexibilidade',
      'Previne rachaduras',
      'Produtos especializados'
    ]
  },
  // RENOVAÇÃO
  {
    id: 'desoxidacao-entressola',
    name: 'Desoxidação da Entressola',
    description: 'Remoção do amarelado com tratamento clareador de alto desempenho',
    price: 49.90,
    duration: 7,
    category: 'renovacao',
    features: [
      'Remove amarelado',
      'Tratamento clareador',
      'Alto desempenho',
      'Resultado duradouro'
    ]
  },
  {
    id: 'higienizacao-antifungica',
    name: 'Higienização Antifúngica Profunda',
    description: 'Eliminação completa de bolor e odores com tecnologia antibacteriana',
    price: 39.90,
    duration: 7,
    category: 'renovacao',
    features: [
      'Elimina bolor',
      'Remove odores',
      'Tecnologia antibacteriana',
      'Higienização profunda'
    ]
  },
  {
    id: 'reativacao-fibras',
    name: 'Reativação de Fibras (Camurça e Nobuck)',
    description: 'Textura original e toque macio por meio de ativador especializado',
    price: 49.90,
    duration: 7,
    category: 'renovacao',
    features: [
      'Restaura textura original',
      'Toque macio',
      'Ativador especializado',
      'Para camurça e nobuck'
    ]
  },
  // RECONSTRUÇÃO
  {
    id: 'revestimento-superior',
    name: 'Revestimento Superior (Cabedal)',
    description: 'Restauração estética e pintura da parte superior do calçado',
    price: 149.90,
    duration: 10,
    category: 'reconstrucao',
    features: [
      'Restauração estética',
      'Pintura profissional',
      'Renovação completa',
      'Aspecto de novo'
    ]
  },
  {
    id: 'refinish-entressola',
    name: 'Refinish de Entressola (Boost/Midsole)',
    description: 'Pintura técnica da base intermediária, devolvendo aspecto de novo',
    price: 139.90,
    duration: 10,
    category: 'reconstrucao',
    features: [
      'Pintura técnica',
      'Base intermediária',
      'Aspecto de novo',
      'Tecnologia especializada'
    ]
  },
  {
    id: 'revitalizacao-camurca',
    name: 'Revitalização de Camurça',
    description: 'Pigmentação especializada com acabamento aveludado e uniforme',
    price: 139.90,
    duration: 10,
    category: 'reconstrucao',
    features: [
      'Pigmentação especializada',
      'Acabamento aveludado',
      'Resultado uniforme',
      'Textura renovada'
    ]
  }
];

export const additionalServices = [
  {
    id: 'entrega-expressa',
    name: 'Entrega Expressa',
    description: 'Entrega em 48h',
    price: 30.00
  },
  {
    id: 'protecao-extra',
    name: 'Proteção Extra',
    description: 'Camada adicional de proteção',
    price: 25.00
  },
  {
    id: 'embalagem-premium',
    name: 'Embalagem Premium',
    description: 'Embalagem especial para presente',
    price: 15.00
  }
];