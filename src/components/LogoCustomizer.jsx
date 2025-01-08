import { useState, useRef } from 'react'
import '../styles/LogoCustomizer.css'
import Tshirt from "../assets/tshirt.jpg"

export function LogoCustomizer() {
  const [logoUrl, setLogoUrl] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 100, height: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoUrl(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragStart = (e) => {
    if (!logoUrl) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleDrag = (e) => {
    if (!isDragging || !containerRef.current) return

    const containerBounds = containerRef.current.getBoundingClientRect()
    const newX = Math.min(
      Math.max(0, e.clientX - dragStart.x),
      containerBounds.width - size.width
    )
    const newY = Math.min(
      Math.max(0, e.clientY - dragStart.y),
      containerBounds.height - size.height
    )

    setPosition({ x: newX, y: newY })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted with position:', position)
  }

  return (
    <div className="container2">
      <div 
        ref={containerRef}
        className="tshirt-container"
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <img
          src={Tshirt}
          alt="T-shirt Template"
          className="tshirt-image"
        />
        
        {logoUrl && (
          <div
            className="logo-container"
            style={{
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
            }}
            onMouseDown={handleDragStart}
          >
            <img
              src={logoUrl}
              alt="Logo"
              className="logo-image"
              draggable={false}
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        </div>
        <div className="button-container">
        <button 
          type="submit"
          className="submit-button"
        >
          Submit Button
        </button>
        </div>
      </form>
    </div>
  )
}

