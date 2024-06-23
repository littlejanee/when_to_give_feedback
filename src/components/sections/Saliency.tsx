import { ImagesGrid } from 'polotno/side-panel/images-grid'
import { getImageSize } from 'polotno/utils/image'
import { MdPhotoLibrary } from '@meronex/icons/md'
import { useInfiniteAPI } from 'polotno/utils/use-api'
import { sectionFactory } from './SectionFactory'

// define the new custom section
export const CustomSaliency = sectionFactory({
  name: 'Saliency',
  icon: <MdPhotoLibrary />,
  panel: ({ store }) => {
    const { data, isLoading } = useInfiniteAPI({
      getAPI: () => `page1.json`,
    })

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* you can create yur own custom component here */}
        {/* but we will use built-in grid component */}
        <ImagesGrid
          shadowEnabled={false}
          images={data?.flatMap((data) => data.items) ?? []}
          getPreview={(item) => `/saliency_predicted/${item.url}`}
          isLoading={isLoading}
          onSelect={async (image, pos) => {
            // image - an item from your array
            // pos - relative mouse position on drop. undefined if user just clicked on image
            // element - model from your store if images was dropped on an element.
            //    Can be useful if you want to change some props on existing element instead of creating a new one
            const { width, height } = await getImageSize(image)
            store.activePage?.addElement({
              type: 'image',
              src: image,
              width,
              height,
              x: pos?.x || 0,
              y: pos?.y || 0,
            })
          }}
          rowsNumber={2}
          loadMore={false}
        />
      </div>
    )
  },
})
