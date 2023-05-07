import { Input, Rate, Switch } from 'antd'
import TextNode from './common/TextNode'
import BottomNavBar from './common/BottomNavBar'
import Carousel from './common/Carousel'
import ImageComponent from './common/ImageComponent'
import QRCodeComponent from './common/QRCodeComponent'
import MarketingPoster from './common/MarketingPoster'
import Navigation from './common/Navigation'

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
  },
  {
    name: 'Image',
    component: ImageComponent
  },
  {
    name: 'QRCode',
    component: QRCodeComponent
  },
  {
    name: 'MarketingPoster',
    component: MarketingPoster
  },
  {
    name: 'Navigation',
    component: Navigation
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
  ],
  Image: [
    { name: 'src', type: 'text' },
    { name: 'alt', type: 'text' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' }
  ],
  QRCode: [
    { name: 'value', type: 'text' },
    { name: 'size', type: 'number' }
  ],
  MarketingPoster: [
    { name: 'backgroundImageUrl', type: 'text' },
    { name: 'qrCodeValue', type: 'text' },
    { name: 'qrCodeSize', type: 'number' },
    { name: 'qrCodePositionX', type: 'number' },
    { name: 'qrCodePositionY', type: 'number' },
    ...getStyleAttributes('width', 'height')
  ],
  Navigation: [
    {
      name: 'navItems',
      type: 'array',
      sample: [
        { name: 'title', type: 'text' },
        { name: 'link', type: 'text' },
        { name: 'iconUrl', type: 'text' }
      ]
    }
  ]
}

export { components, componentsMap, componentAttributes }
