import { Input, Rate, Switch } from 'antd'

const components = [
  { name: 'Input', component: Input },
  { name: 'Rate', component: Rate },
  { name: 'Switch', component: Switch }
]

const componentsMap = new Map()
for (const com of components) {
  componentsMap.set(com.name, com.component)
}

export { components, componentsMap }
