import { uniq } from 'lodash'
import { StoreType } from 'polotno/model/store'
import { TextElementType } from 'polotno/model/text-model'
import { store } from '../App';
import { Pages } from '../types/polotno'

export class PolotnoUtil {
  static filterTextElements(pages: StoreType['pages']): TextElementType[] {
    return pages.flatMap((page) => page.children.filter((p) => p.type === 'text'))
  }

  static filterTextElementsBy(pages: Pages, key: keyof TextElementType): TextElementType[typeof key][] {
    return uniq(pages.flatMap((page) => page.children.filter((p) => p.type === 'text')).map((textElement: TextElementType) => textElement[key])).sort()
  }

  static loadPolotnoState(width: number, height: number, polotnoState: StoreType['pages'][number]) {
    store.loadJSON({
      width,
      height,
      fonts: [],
      pages: [polotnoState],
      unit: 'px',
      dpi: 72,
    })
  }
}
