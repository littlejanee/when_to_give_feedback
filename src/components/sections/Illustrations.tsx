import { InputGroup } from '@blueprintjs/core'
import { isAlive } from 'mobx-state-tree'
import { useInfiniteAPI } from 'polotno/utils/use-api'
import React from 'react'
import { FaPencilAlt } from '@meronex/icons/fa'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { iconscoutDownload } from 'polotno/utils/api'
import { getImageSize } from 'polotno/utils/image'
import { urlToBase64 } from 'polotno/utils/svg'
import { getKey } from 'polotno/utils/validate-key'
import { sectionFactory } from './SectionFactory'
import { API_URL } from '../../constants/constants'

export const IllustrationsSection = sectionFactory({
  name: 'Illustrations',
  icon: <FaPencilAlt />,
  panel: ({ store }) => {
    const { setQuery, loadMore, hasMore, data, isLoading, error } = useInfiniteAPI({
      defaultQuery: 'person',
      getAPI: ({ page, query }) => `${API_URL}/get-iconscout?query=${query}&page=${page}&asset=illustration&KEY=${getKey()}`,
      getSize: (first) => first.response.items.last_page,
    })

    const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastQuery = React.useRef('')
    const requestSearch = (val: string) => {
      lastQuery.current = val
      if (timeout.current) {
        return
      }
      timeout.current = setTimeout(() => {
        timeout.current = null
        setQuery(lastQuery.current)
      }, 1000)
    }
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <InputGroup
          leftIcon="search"
          placeholder={'Search illustrations...'}
          onChange={(e) => {
            requestSearch(e.target.value)
          }}
          style={{
            marginBottom: '20px',
          }}
        />
        <p style={{ textAlign: 'center' }}>
          Icons by{' '}
          <a href="https://iconscout.com/" target="_blank" rel="noreferrer">
            iconscout
          </a>
        </p>
        <ImagesGrid
          shadowEnabled={false}
          rowsNumber={2}
          images={data?.flatMap((item) => item.response.items.data) ?? []}
          getPreview={(image) => image.urls.thumb}
          isLoading={isLoading}
          error={error}
          loadMore={hasMore && loadMore}
          onSelect={async (image, pos, element) => {
            if (element && element.type === 'image' && !element.locked) {
              const { uuid } = image
              const req = await fetch(iconscoutDownload(uuid))
              const { url } = await req.json()
              if (!url) {
                alert('Image loading is failed. Please try again later.')
                return
              }
              const base64 = await urlToBase64(url)
              element.set({ clipSrc: base64 })
              return
            }
            const { width, height } = await getImageSize(image.urls.thumb)
            store.history.transaction(async () => {
              const x = (pos?.x || store.width / 2) - width / 2
              const y = (pos?.y || store.height / 2) - height / 2
              const svg = store.activePage?.addElement({
                type: 'svg',
                width,
                height,
                x,
                y,
              })
              const { uuid } = image
              const req = await fetch(iconscoutDownload(uuid))
              const { url } = await req.json()

              if (!url) {
                alert('Image loading is failed. Please try again later.')
                return
              }
              const base64 = await urlToBase64(url)
              if (isAlive(svg)) {
                await svg.set({ src: base64 })
              }
            })
          }}
        />
      </div>
    )
  },
})
