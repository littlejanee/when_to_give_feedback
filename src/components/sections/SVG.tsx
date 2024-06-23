import { InputGroup } from '@blueprintjs/core'
import { FaVectorSquare } from '@meronex/icons/fa'
import { getImageSize } from 'polotno/utils/image'
import { svgToURL } from 'polotno/utils/svg'
import { useInfiniteAPI } from 'polotno/utils/use-api'
import { getKey } from 'polotno/utils/validate-key'
import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { sectionFactory } from './SectionFactory'
import { API_URL } from '../../constants/constants'

export const VectorSection = sectionFactory({
  name: 'SVGIcons',
  icon: <FaVectorSquare />,
  panel: ({ store }) => {
    // load data
    const { data, isLoading, loadMore, setQuery } = useInfiniteAPI({
      getAPI: ({ page, query }) => `${API_URL}/get-svgapi?query=${query}&page=${page - 1}&key=${getKey()}`,
      getSize: (res) => Math.floor(res.count / res.limit),
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
          images={data?.flatMap((data) => data.icons) ?? []}
          getPreview={(item) => item.url}
          isLoading={isLoading}
          onSelect={async (item, pos, element) => {
            const req = await fetch(`${API_URL}/download-svgapi?key=${getKey()}&path=${item.path}`)
            const json = await req.json()
            const base64 = await svgToURL(json.content)
            if (element && element.type === 'image') {
              element.set({ clipSrc: base64 })
              return
            }
            const { width, height } = await getImageSize(item.url)
            const x = (pos?.x || store.width / 2) - width / 2
            const y = (pos?.y || store.height / 2) - height / 2
            store.activePage?.addElement({
              type: 'svg',
              width,
              height,
              x,
              y,
              src: base64,
            })
          }}
          rowsNumber={4}
          loadMore={loadMore}
        />
      </div>
    )
  },
})
