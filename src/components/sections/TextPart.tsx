import { Button } from '@blueprintjs/core'
import { ZoTextBox } from '@meronex/icons/zo'
import { unstable_registerNextDomDrop } from 'polotno/config'
import { sectionFactory } from './SectionFactory'

const Content = [
  'Intro to Dance Workshop',
  'The Dancehouse San Diego',
  'Friday, August 19 at 5PM',
  'Kaycee Smith',
  'Come join us for a fun, beginner-friendly dance workshop!',
]

const DragButton = ({ onSelect, ...props }: any) => {
  return (
    <Button
      {...props}
      draggable
      className="polotno-close-panel"
      onClick={() => onSelect()}
      onDragStart={() => {
        unstable_registerNextDomDrop(({ x, y }) => {
          onSelect({ x, y })
        })
      }}
      onDragEnd={() => {
        unstable_registerNextDomDrop(null)
      }}
    />
  )
}

export const CustomText = sectionFactory({
  name: 'Text',
  icon: <ZoTextBox />,
  panel: ({ store }) => {
    const textOption = (attrs: any) => {
      const wid = attrs.width || store.width / 2

      const x = (attrs?.x || store.width / 2) - wid / 2
      const y = (attrs?.y || store.height / 2) - attrs.fontSize / 2

      store.activePage?.addElement({
        type: 'text',
        ...attrs,
        x,
        y,
        width: wid,
      })
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {Content.map((text) => {
          return (
            <DragButton
              key={text}
              style={{
                marginBottom: '5px',
                width: '100%',
                fontSize: '15px',
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}
              minimal
              onSelect={async (pos: any) => {
                textOption({
                  ...pos,
                  fontSize: 80,
                  text,
                  fontFamily: 'Roboto',
                })
              }}
            >
              {text}
            </DragButton>
          )
        })}
      </div>
    )
  },
})
