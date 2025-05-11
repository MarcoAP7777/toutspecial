'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Image from 'next/image'
import { ProductImageFormData } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ImageUploaderProps {
  images: ProductImageFormData[]
  onChange: (images: ProductImageFormData[]) => void
  maxImages?: number
}

const DraggableImage = ({ 
  image, 
  index, 
  moveImage, 
  onRemove 
}: { 
  image: ProductImageFormData
  index: number
  moveImage: (dragIndex: number, hoverIndex: number) => void
  onRemove: (index: number) => void
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'IMAGE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'IMAGE',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index)
        item.index = index
      }
    },
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="p-2">
        <Image
          src={image.url}
          alt={image.alt}
          width={200}
          height={200}
          className="object-cover rounded"
        />
        <input
          type="text"
          value={image.alt}
          onChange={(e) => {
            // Implementar alteração do alt text
          }}
          className="mt-2 w-full text-sm"
          placeholder="Texto alternativo"
        />
        <Button
          variant="destructive"
          size="sm"
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100"
          onClick={() => onRemove(index)}
        >
          ×
        </Button>
      </Card>
    </div>
  )
}

export const ImageUploader = ({ images, onChange, maxImages = 10 }: ImageUploaderProps) => {
  const [error, setError] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      setError(`Máximo de ${maxImages} imagens permitido`)
      return
    }

    // Aqui você implementaria o upload real para seu servidor/storage
    const newImages = acceptedFiles.map((file, index) => ({
      url: URL.createObjectURL(file),
      alt: file.name,
      display_order: images.length + index
    }))

    onChange([...images, ...newImages])
    setError('')
  }, [images, maxImages, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  })

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    const newImages = [...images]
    const draggedImage = newImages[dragIndex]
    newImages.splice(dragIndex, 1)
    newImages.splice(hoverIndex, 0, draggedImage)
    
    // Atualizar display_order
    newImages.forEach((img, idx) => {
      img.display_order = idx
    })
    
    onChange(newImages)
  }, [images, onChange])

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, idx) => idx !== index)
    
    // Atualizar display_order
    newImages.forEach((img, idx) => {
      img.display_order = idx
    })
    
    onChange(newImages)
  }, [images, onChange])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
            ${error ? 'border-red-500' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte as imagens aqui...</p>
          ) : (
            <p>Arraste imagens ou clique para selecionar</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <DraggableImage
              key={image.url}
              image={image}
              index={index}
              moveImage={moveImage}
              onRemove={removeImage}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
} 