import React from 'react'
import QRCodeComponent from '../QRCodeComponent/index'
interface MarketingPosterProps {
  backgroundImageUrl: string
  qrCodeValue: string
  qrCodeSize?: number
  qrCodePositionX?: number
  qrCodePositionY?: number
}

const MarketingPoster: React.FC<MarketingPosterProps> = ({
  backgroundImageUrl,
  qrCodeValue,
  qrCodeSize = 128,
  qrCodePositionX = 0,
  qrCodePositionY = 0,
  width = 300,
  height = 100
}) => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        width,
        height
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: qrCodePositionX,
          top: qrCodePositionY
        }}
      >
        <QRCodeComponent value={qrCodeValue} size={qrCodeSize} />
      </div>
    </div>
  )
}

export default MarketingPoster
