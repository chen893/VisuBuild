import React from 'react'

export interface NavItem {
  iconName: string
  link: string
}

interface BottomNavBarProps {
  navItems: NavItem[]
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  navItems = [{
    link: 'https:baidu.com',
    iconName: '123'
  }]
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => (
          <a key={index} href={item.link} className="text-gray-600">
            <i className={`iconfont ${item.iconName}`} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default BottomNavBar
