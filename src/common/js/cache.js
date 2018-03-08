import storage from 'good-storage'
const MAX_LEN = 100
function insertArray(arr, val, compare, maxlen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function savePlay(song) {
  let songs = storage.get('play', [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, MAX_LEN)
  storage.set('play', songs)
  return songs
}
export function loadPlay() {
  return storage.get('play', [])
}

export function loadFavourite() {
  return storage.get('favourite', [])
}

export function saveFavourite(song) {
  let songs = storage.get('favourite', [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, MAX_LEN)
  storage.set('favourite',songs)
  return songs
}

export function deleteFavourite(song) {
  let songs = storage.get('favourite', [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set('favourite', songs)
  return songs
}

