import { InputGroup } from '@blueprintjs/core'
import { FaVectorSquare } from '@meronex/icons/fa'
import { isAlive } from 'mobx-state-tree'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { getImageSize } from 'polotno/utils/image'
import { svgToURL } from 'polotno/utils/svg'
import { useInfiniteAPI } from 'polotno/utils/use-api'
import { getKey } from 'polotno/utils/validate-key'
import { sectionFactory } from './SectionFactory'
import { API_URL } from '../../constants/constants'

export const FlaticonSection = sectionFactory({
  name: 'Icons',
  icon: <FaVectorSquare />,
  panel: ({ store }) => {
    // load data
    const { data, isLoading, loadMore, setQuery } = useInfiniteAPI({
      getAPI: ({ page, query }) => `${API_URL}/get-flaticon?q=${query}&page=${page}&KEY=${getKey()}`,
      getSize: (res) => Math.floor(res.metadata.total / res.metadata.count),
    })

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <InputGroup
          leftIcon="search"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          style={{
            marginBottom: '20px',
          }}
        />
        <ImagesGrid
          shadowEnabled={false}
          images={data?.flatMap((data) => data.data) ?? []}
          getPreview={(item) => item.images['64']}
          isLoading={isLoading}
          onSelect={async (item, pos, element) => {
            if (element && element.type === 'image' && !element.locked) {
              const req = await fetch(`${API_URL}/download-flaticon?id=${item.id}&KEY=${getKey()}`)
              const json = await req.json()
              const base64 = await svgToURL(json.svg)
              element.set({ clipSrc: base64 })
              return
            }
            const { width, height } = await getImageSize(item.images['256'])
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
              const req = await fetch(`http://localhost:3001/api/download-flaticon?id=${item.id}&KEY=${getKey()}`)
              const json = await req.json()
              console.log(json.svg)
              const base64 = await svgToURL(json.svg)
              if (isAlive(svg)) {
                await svg.set({ src: base64 })
              }
            })
          }}
          rowsNumber={4}
          loadMore={loadMore}
        />
      </div>
    )
  },
})
