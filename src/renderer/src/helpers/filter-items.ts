import { SongProps } from "@shared/models"

export const filterItems = (data: SongProps[], search = '') => {
  return data.filter((item) => {
    const matches = [
      search ? item.title.toLowerCase().includes(search.toLowerCase()) : true,
    ]

    return matches.every(Boolean)
  })
}
