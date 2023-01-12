import { React, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { apis, invokeZoomAppsSdk } from '../apis'
import './ApiScrollview.css'

function ApiScrollview() {
  const [imageUrl, setImageUrl] = useState('')

  const handleImageUrl = (e) => {
    setImageUrl(e.target.value)
  }

  return (
    <div className="api-scrollview">
      <input
        placeholder="Enter Image Url"
        onChange={handleImageUrl}
        label="Image Url"
        id="api-scrollview-input"
      />

      <div className="api-buttons-list">
        {apis?.map((api) => (
          <Button
            onClick={invokeZoomAppsSdk({
              ...api,
              options: { fileUrl: imageUrl },
            })}
            className="api-button"
            key={api.buttonName || api.name}
          >
            {' '}
            {api.buttonName || api.name}
          </Button>
        ))}
      </div>
      <hr className="hr-scroll-border"></hr>
    </div>
  )
}

export default ApiScrollview
