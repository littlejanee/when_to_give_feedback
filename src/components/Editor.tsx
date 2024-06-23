import styled from '@emotion/styled'
import { cloneDeep } from 'lodash'
import Workspace from 'polotno/canvas/workspace'
import { StoreType } from 'polotno/model/store'
import ZoomButtons from 'polotno/toolbar/zoom-buttons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MarkerType, MarkerTypes } from '../constants/markers'

interface Marker {
  id: number
  x: number
  y: number
  width: number
  height: number
  type: MarkerType
  page?: number
}

interface Props {
  store: Readonly<StoreType>
  onClick?: (x: number, y: number) => void
  hasZoomButtons?: boolean
  markers?: Marker[]
  canvasWidth: number
  canvasheight: number
  editable?: boolean
}

export function Editor({ store, onClick, hasZoomButtons = true, markers = [], canvasWidth, canvasheight, editable = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prevMarkers, setPrevMarkers] = useState<Marker[]>([])

  const click = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - left
      const clickY = e.clientY - top
      const width = containerRef.current?.clientWidth ?? 0
      const height = containerRef.current?.clientHeight ?? 0
      const scale = store.scale
      const x = (clickX - (width - canvasWidth * scale) / 2) / scale
      const y = (clickY - (height - canvasheight * scale) / 2) / scale
      onClick?.(x, y)
    },
    [canvasWidth, canvasheight, onClick, store.scale],
  )

  useEffect(() => {
    const additions = []
    const deletions = []
    const selectedElementIds = store.selectedElements.map((o) => o.id)

    for (const marker of markers) {
      if (!store.getElementById(marker.id.toString())) {
        additions.push(marker)
      }
    }
    for (const marker of prevMarkers) {
      if (markers.findIndex((m) => m.id === marker.id) === -1) {
        deletions.push(marker.id)
      }
    }
    for (const { x, y, page = 0, width, height, type, id } of additions) {
      const { xCalibrate, yCalibrate, ...attr } = MarkerTypes[type]
      store.pages[page]?.addElement({
        id: id.toString(),
        alwaysOnTop: true,
        height,
        width,
        name: 'VISUALIZATION',
        visible: true,
        x: x + xCalibrate * width,
        y: y + yCalibrate * height,
        draggable: false,
        contentEditable: false,
        styleEditable: false,
        selectable: false,
        placeholder: `[${id}]`,
        ...attr,
      } as StoreType['pages'][number]['children'][number])
    }

    store.deleteElements(deletions.map((id) => id.toString()))

    if (0 < deletions.length || 0 < additions.length) {
      setPrevMarkers(cloneDeep(markers))
    }
    store.selectElements(selectedElementIds)
  }, [markers, prevMarkers, store])

  useEffect(() => {
    if (store.width !== canvasWidth || store.height !== canvasheight) {
      setTimeout(() => {
        store.setSize(canvasWidth, canvasheight)
      }, 500)
    }
  }, [canvasWidth, canvasheight, store])

  return (
    <Container onClick={click} ref={containerRef}>
      <Workspace store={store} />
      {!editable && <Cover />}
      {hasZoomButtons && <ZoomButtons store={store} />}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
`

const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`
