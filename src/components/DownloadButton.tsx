import { Button, Menu, Position, Slider } from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { observer } from 'mobx-react-lite'
import { StoreType } from 'polotno/model/store'
import { downloadFile } from 'polotno/utils/download'
import * as unit from 'polotno/utils/unit'
import { useState } from 'react'
import { experimentManager } from '../services/experimentManager'
import { fireStorage } from '../services/fireStorage'

export const DownloadButton = observer(({ store }: { store: StoreType }) => {
  const [saving, setSaving] = useState(false)
  const [quality, setQuality] = useState(1)
  const [type, setType] = useState('png')

  const getName = () => {
    const texts: string[] = []
    store.pages.forEach((p) => {
      p.children.forEach((c) => {
        if (c.type === 'text') {
          texts.push(c.text)
        }
      })
    })
    const allWords = texts.join(' ').split(' ')
    const words = allWords.slice(0, 6)
    return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'polotno'
  }
  return (
    <Popover2
      content={
        <Menu>
          {/*
          <li className="bp4-menu-header">
            <h6 className="bp4-heading">File type</h6>
          </li>
           <HTMLSelect
            fill
            onChange={(e) => {
              setType(e.target.value)
              setQuality(1)
            }}
            value={type}
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </HTMLSelect> */}
          <li className="bp4-menu-header">
            <h6 className="bp4-heading">Size</h6>
          </li>
          <div style={{ padding: '10px' }}>
            <Slider
              value={quality}
              labelRenderer={false}
              // labelStepSize={0.4}
              onChange={(quality) => {
                setQuality(quality)
              }}
              stepSize={0.2}
              min={0.2}
              max={3}
              showTrackFill={false}
            />
            {type === 'pdf' && (
              <div>
                {unit.pxToUnitRounded({
                  px: store.width,
                  dpi: store.dpi / quality,
                  precious: 0,
                  unit: 'mm',
                })}{' '}
                x{' '}
                {unit.pxToUnitRounded({
                  px: store.height,
                  dpi: store.dpi / quality,
                  precious: 0,
                  unit: 'mm',
                })}{' '}
                mm
              </div>
            )}
            {type !== 'pdf' && (
              <div>
                {Math.round(store.width * quality)} x {Math.round(store.height * quality)} px
              </div>
            )}
          </div>
          <Button
            fill
            intent="primary"
            loading={saving}
            onClick={async () => {
              const id = experimentManager.id
              const json = store.toJSON()
              await fireStorage.upload(`drafts/${id}.json`, JSON.stringify(json))

              if (type === 'pdf') {
                setSaving(true)
                await store.saveAsPDF({
                  fileName: getName() + '.pdf',
                  dpi: store.dpi / quality,
                  pixelRatio: 2 * quality,
                })
                setSaving(false)
              } else if (['png', 'jpeg'].some((t) => t === type)) {
                store.pages.forEach((page, index) => {
                  // do not add index if we have just one page
                  const indexString = store.pages.length > 1 ? '-' + (index + 1) : ''
                  store.saveAsImage({
                    pageId: page.id,
                    pixelRatio: quality,
                    mimeType: `image/${type}` as 'image/png' | 'image/jpeg',
                    fileName: getName() + indexString + '.' + type,
                  })
                })
                // add JSON save
                const json = store.toJSON()
                const url = 'data:text/json;base64,' + window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
                downloadFile(url, 'polotno.json')
              }
            }}
          >
            Save As PNG & JSON
            {/* Save {type.toUpperCase()} */}
          </Button>

          {/* <MenuItem
            icon="media"
            text={t('toolbar.saveAsImage')}
            onClick={async () => {
              store.pages.forEach((page, index) => {
                // do not add index if we have just one page
                const indexString = store.pages.length > 1 ? '-' + (index + 1) : ''
                store.saveAsImage({
                  pageId: page.id,
                  fileName: getName() + indexString + '.png',
                })
              })
            }}
          />
          <MenuItem
            icon="document"
            text={t('toolbar.saveAsPDF')}
            onClick={async () => {
              setSaving(true)
              await store.saveAsPDF({
                fileName: getName() + '.pdf',
              })
              setSaving(false)
            }}
          /> */}
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button
        icon="download"
        text={'Download'}
        minimal
        loading={saving}
        onClick={() => {
          setQuality(1)
        }}
      />
    </Popover2>
  )
})
