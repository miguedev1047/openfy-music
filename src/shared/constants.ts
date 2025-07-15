import { ThemeOption } from './models'

export const THEMES: ThemeOption[] = [
  {
    name: 'Sistema',
    value: 'system'
  },
  {
    name: 'Claro',
    value: 'light',
    color: 'oklch(0.994 0 0)'
  },
  {
    name: 'Oscuro',
    value: 'dark',
    color: 'oklch(0.2217 0.0084 264.3897)'
  },
  {
    name: 'Pastel Naranja',
    value: 'orange-pastel',
    color: 'oklch(0.711 0.1889 41.4035)'
  },
  {
    name: 'Pastel Rosa',
    value: 'pink-pastel',
    color: 'oklch(0.6858 0.2652 343.7084)'
  },
  {
    name: 'Pastel Índigo',
    value: 'indigo-pastel',
    color: 'oklch(0.5319 0.2608 271.6702)'
  },
  {
    name: 'Pastel Celeste',
    value: 'light-blue-pastel',
    color: 'oklch(0.7673 0.1442 232.2722)'
  },
  {
    name: 'Lima Pastel',
    value: 'lime-pastel',
    color: 'oklch(0.8767 0.2418 147.7895)'
  }
]
