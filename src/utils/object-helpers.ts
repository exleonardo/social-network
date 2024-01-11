import { UsersInfoType } from '@/API/profile-api'

export const updateObjectInArray = (
  items: UsersInfoType[],
  itemId: number,
  newObjProps: { followed: boolean }
) => {
  return items.map(el => (el.id === itemId ? { ...el, ...newObjProps } : el))
}
