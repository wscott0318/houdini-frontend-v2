import { CardComponent } from 'houdini-react-sdk'
import React from 'react'
import QRCode from 'react-qr-code'

import { XLetterSvg } from '../Svg'

export const QrCode: React.FC<QrCodeProps> = ({
  qrCodeModal,
  setQrCodeModal,
  senderAddress,
}) => {
  const handleCloseQrModal = () => {
    setQrCodeModal(false)
  }

  return (
    <CardComponent widthClass={'100%'} heightClass={'100%'}>
      <h2 className="mt-4 text-center text-xl font-bold text-white">
        Address QR Code (scan in your Wallet app):
      </h2>
      <div>
        <div
          className="qr-code-container"
          onClick={() => {
            handleCloseQrModal()
          }}
        >
          <QRCode
            style={{ height: '100%', width: '100%' }}
            value={senderAddress}
          />
        </div>
      </div>
      <XLetterSvg
        onClick={() => {
          setQrCodeModal(false)
        }}
        className="absolute top-6 right-6 fill-white w-3 h-3 hover:cursor-pointer"
      />
    </CardComponent>
  )
}
