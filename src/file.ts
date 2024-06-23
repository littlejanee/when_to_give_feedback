import { StoreType } from 'polotno/model/store'

export const loadJSONFile = (file: Blob, store: StoreType) => {
  const reader = new FileReader()
  reader.onloadend = function () {
    const text = reader.result
    try {
      const json = JSON.parse(text as string)
      store.loadJSON(json)
    } catch (e) {
      alert('Can not load the project.')
    }
  }
  reader.onerror = function () {
    alert('Can not load Polotno project file.')
  }
  reader.readAsText(file)
}

export const loadImageFile = (file: Blob, store: StoreType) => {
  const reader = new FileReader()
  reader.onloadend = function () {
    const url = reader.result
    const img = new Image()
    img.src = url as string
    img.onload = () => {
      const scale = Math.min(1, store.width / img.width, store.height / img.height)
      store.activePage?.addElement({
        type: 'image',
        width: img.width * scale,
        height: img.height * scale,
        src: url,
      })
    }
  }
  reader.onerror = function () {
    alert('Can not load image.')
  }
  reader.readAsDataURL(file)
}

export const loadFile = (file: Blob, store: StoreType) => {
  if (file.type.indexOf('image') >= 0) {
    loadImageFile(file, store)
  } else {
    loadJSONFile(file, store)
  }
}
