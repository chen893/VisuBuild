import React from 'react'

const Navigation = ({ navItems, width, height }) => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: `${width}px`,
    height: `${height}px`
  }

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center'
  }

  const iconStyle = {
    maxHeight: '50%',
    maxWidth: '50%'
  }

  return (
    <nav>
      <ul style={navStyle}>
        {navItems.map((item, index) => (
          <li key={index} style={itemStyle}>
            {item.iconUrl && (
              <img src={item.iconUrl} alt={`${item.title} icon`} style={iconStyle} />
            )}
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navigation
