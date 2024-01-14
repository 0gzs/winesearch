import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'

import './wine.scss'

const Wine = ({ wine, keywords }) => {
  const [barcode, setBarcode] = useState(false)

  return (
    <div className='card'>
        <div className='product-img'>
          <img src={wine.image} alt={wine.name} />
        </div>
          <h3>
            <Highlighter
              highlightClassName='highlight'
              searchWords={keywords}
              autoEscape={true}
              textToHighlight={wine.name}
            />
          </h3>

          <p className='product-description'>
            <Highlighter
              highlightClassName='highlight'
              searchWords={keywords}
              autoEscape={true}
              textToHighlight={wine.description}
            />
          </p>
      <div className='product-details'>
        <ul>
          <span>
            <strong>Price:</strong> {wine.price}
          </span>
          <span>
            <strong>Base Price:</strong> ${wine.base_price}
          </span>
          <span>
            <strong>Type:</strong> {wine.type}
          </span>
          <span>
            <strong>Brand:</strong> {wine.brand}
          </span>
          <span>
            <strong>Size:</strong> {wine.size}
          </span>
          <span>
            <strong>SKU:</strong> {wine.sku}
          </span>
        </ul>
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
