import { Alignment, Button, Navbar } from '@blueprintjs/core'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { StoreType } from 'polotno/model/store'
import { NO_ID } from '../constants/constants'
import { experimentManager } from '../services/experimentManager'
import { DownloadButton } from './DownloadButton'
import { downloadFile } from 'polotno/utils/download'

export const TopBar = observer(({ store }: { store: StoreType }) => {
  const id = experimentManager.id ?? NO_ID

  return (
    <NavbarContainer className="bp4-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          {/* <Button
            icon="new-object"
            minimal
            onClick={() => {
              const ids = store.pages.map((page) => page.children.map((child) => child.id)).flat()
              const hasObjects = ids?.length
              if (hasObjects) {
                if (!window.confirm('Remove all content for a new design?')) {
                  return
                }
              }
              const pagesIds = store.pages.map((p) => p.id)
              store.deletePages(pagesIds)
              store.addPage()
            }}
          >
            New
          </Button> */}
          {/* <Button icon="folder-open" minimal onClick={() => document.querySelector<HTMLButtonElement>('#load-project')?.click?.()}>
            Open
          </Button>
          <input
            type="file"
            id="load-project"
            accept=".json,.polotno"
            ref={inputRef}
            style={{ width: '180px', display: 'none' }}
            onChange={(e) => {
              const input = e.target
              const file = input?.files?.[0]

              if (!file) {
                return
              }

              const reader = new FileReader()
              reader.onloadend = function () {
                try {
                  const json = JSON.parse(reader.result as string)
                  store.loadJSON(json)
                  input.value = ''
                } catch (e) {
                  alert('Can not load the project.')
                }
              }
              reader.onerror = function () {
                alert('Can not load the project.')
              }
              reader.readAsText(file)
            }}
          /> */}
          <DownloadButton store={store} />
          {/* <Button icon="document-open" minimal onClick={loadSeed}>
            Load Seed Design
          </Button> */}
          {/* <Button
            icon="floppy-disk"
            minimal
            onClick={async () => {
              const json = store.toJSON()
              const url = 'data:text/json;base64,' + window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
              downloadFile(url, 'polotno.json')
            }}
          >
            Save As JSON
          </Button> */}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Id>ID: {id}</Id>
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  )
})

const NavbarContainer = styled.div`
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`

const NavInner = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`

const Id = styled.div`
  font-size: 16px;
  padding: 8px;
`
