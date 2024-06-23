import { FaShapes } from '@meronex/icons/fa'
import axios from 'axios'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { useInfiniteAPI } from 'polotno/utils/use-api'
import React, { useCallback, useRef } from 'react'
import { sectionFactory } from './SectionFactory'
import { StoreType } from 'polotno/model/store'

const Panel = ({ store }: { store: StoreType }) => {
  const prevCount = useRef(0)

  const loadImages = useCallback(async () => {
    //setImages([]);
    // wait to emulate network request
    const maxWidth = 200
    const scale = maxWidth / store.width
    let url = ''
    url = await store.toDataURL({ pixelRatio: scale })
    const json = store.toJSON()
    console.log('inside loadImages')

    if (prevCount.current !== store.activePage?.children?.length ?? 0) {
      axios.post('http://127.0.0.1:5000/saveToBackend', { json: JSON.stringify(json), image_url: url })
    }
    prevCount.current = store.activePage?.children?.length ?? 0
  }, [store])

  console.log('stor eitems ', prevCount)
  const { data, isLoading } = useInfiniteAPI({
    getAPI: () => `page2.json`,
  })

  React.useEffect(() => {
    loadImages()
  }, [loadImages])

  return (
    <div>
      <div style={{ height: '100%', width: '50%', flexDirection: 'column' }}>
        <ImagesGrid
          shadowEnabled={false}
          images={data?.flatMap((data) => data.items) ?? []}
          getPreview={(item) => `/${item.url}`}
          isLoading={isLoading}
          onSelect={async (item) => {
            const req = await fetch(`${item.json}`)
            const json = await req.json()
            // just inject it into store
            store.loadJSON(json)
          }}
          rowsNumber={2}
        />
      </div>
    </div>
  )
}

export const CustomSection = sectionFactory({
  name: 'Custom',
  icon: <FaShapes />,
  panel: Panel
})
