import React, { useState } from 'react'
import './wine.scss'

const Wine = ({ wine }) => {
  const [barcode, setBarcode] = useState(false)
  return (
    <div className='product-container'>
      <div className='product-img'>
        <img src={wine.image} alt={wine.name} />
      </div>
      <h3>{wine.name}</h3>
      <div className='product-details'>
        <p className='product-description'>{wine.description}</p>
        <div className='product-tags'>
          <p><span>Price: </span>{wine.price}</p>
          <p><span>Base Price: </span>{wine.base_price}</p>
          <p><span>Type: </span>{wine.type}</p>
          <p><span>Rating: </span>{wine.rating}</p>
          <p><span>On Hand: </span>{wine.on_hand}</p>
          <p><span>SKU: </span>{wine.sku}</p>
        </div>
      </div>
      {barcode ? (
        <div className="barcode">
          <img src={`https://barcode.tec-it.com/barcode.ashx?data=${wine.sku}&code=Code128`} alt="barcode" />
        </div>
      ) : (
        <button
          type="button"
          className='button'
          onClick={() => setBarcode(true)}>
          View Barcode
        </button>
      )}
    </div>
  )
}

export default Wine
