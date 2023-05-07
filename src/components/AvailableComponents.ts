import { Input, Rate, Switch } from 'antd'
import TextNode from './common/TextNode'
import BottomNavBar from './common/BottomNavBar'
import Carousel from './common/Carousel'

const components = [
  { name: 'Input', component: Input },
  { name: 'Rate', component: Rate },
  { name: 'Switch', component: Switch },
  {
    name: 'BottomNavBar',
    component: BottomNavBar
  },
  {
    name: 'Text',
    component: TextNode
  },
  {
    name: 'Carousel',
    component: Carousel
  }
]

const componentsMap = new Map()
for (const com of components) {
  componentsMap.set(com.name, com.component)
}

const styleAttributes = {
  width: 'number',
  height: 'number'
}

function getStyleAttributes (...keys: string[]) {
  return keys.map((item) => ({
    name: item,
    type: styleAttributes[item]
  }))
}
const componentAttributes: Record<string, Attribute[]> = {
  Input: [
    { name: 'placeholder', type: 'text' },
    ...getStyleAttributes('width', 'height')
  ],
  // BottomNavBar: [
  //   { name: 'navItems', type: 'array' }
  // ],
  Rate: [{ name: 'count', type: 'number' }],
  Switch: [{ name: 'checked', type: 'boolean' }],
  Text: [
    {
      name: 'text',
      type: 'text'
    },
    ...getStyleAttributes('width', 'height')
  ],
  Carousel: [
    {
      name: 'items',
      type: 'array',
      sample: [
        { name: 'link', type: 'text' },
        { name: 'imageUrl', type: 'text' }
      ]
    }
  ]
}

export { components, componentsMap, componentAttributes }
