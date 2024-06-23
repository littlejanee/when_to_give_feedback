import { ZoViewTile } from '@meronex/icons/zo'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { StoreType } from 'polotno/model/store'
import { sectionFactory } from './SectionFactory'

const Panel = ({ store }: {store: StoreType}) => {
  const [images, setImages] = useState<{ url: string }[]>([])
  const [color, setColor] = useState('#88DFF3')

  const changeColor = (newColor: string) => {
    setColor(newColor)
    store.activePage?.set({
      background: newColor,
    })
  }

  React.useEffect(() => {
    // for demo images are hard coded
    // in real app here will be something like JSON structure
    const URL: Array<{ url: string }> = []
    for (let i = 1; i <= 23; i++) {
      const link = `./photos/dance/f${i.toString()}.png`
      URL.push({ url: link })
    }
    setImages(URL)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <HexColorPicker color={color} onChange={changeColor} />
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if you want to change some props on existing element instead of creating a new one
          const width = store.width
          const height = store.height
          store.activePage?.addElement({
            type: 'image',
            src: image.url,
            width,
            height,
            x: pos?.x || 0,
            y: pos?.y || 0,
          })
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  )
}

export const BackgroundPart = sectionFactory({
  name: 'Background',
  icon: <ZoViewTile />,
  panel: Panel,
})
