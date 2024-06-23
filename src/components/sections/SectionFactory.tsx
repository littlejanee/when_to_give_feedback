import { observer } from 'mobx-react-lite'
import { DEFAULT_SECTIONS, SectionTab } from 'polotno/side-panel'
import { StoreType } from 'polotno/model/store'

interface Props {
  name: string
  icon: React.ReactElement
  panel: ({ store }: { store: StoreType }) => JSX.Element
}

export function sectionFactory({ name, panel, icon }: Props): typeof DEFAULT_SECTIONS[number] {
  const Panel = observer(panel)

  function Tab(props: any) {
    return (
      <SectionTab name={name} {...props}>
        {icon}
      </SectionTab>
    )
  }
  Tab.displayName = 'Tab'

  return {
    name,
    Tab,
    Panel,
  }
}
