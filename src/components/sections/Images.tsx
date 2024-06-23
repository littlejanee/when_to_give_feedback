import { MdPhotoLibrary } from '@meronex/icons/md'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { getImageSize } from 'polotno/utils/image'
import React from 'react'
import { sectionFactory } from './SectionFactory'
import { StoreType } from 'polotno/model/store'

const Panel = ({ store }: { store: StoreType }) => {
  const [images, setImages] = React.useState<{ url: string }[]>([])

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
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if you want to change some props on existing element instead of creating a new one
          const { width, height } = await getImageSize(image.url)
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

export const CustomPhotos = sectionFactory({
  name: 'Images',
  icon: <MdPhotoLibrary />,
  panel: Panel
})
