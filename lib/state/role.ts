import { nanoid } from "nanoid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { IDBStorage } from "@/lib/idb"

interface RoleState {
  roles: Role[]
  addRole: (name: string, categoryName: string) => void
  deleteRole: (roleId: string) => void
}

export const useRoleStore = create(
  persist<RoleState>(
    (set) => ({
      roles: [],

      addRole: (name, categoryName) =>
        set((state) => {
          const newRole = { id: nanoid(5), name }
          const categoriesState = useRoleCategoryStore.getState()
          const category = categoriesState.categories.find((c) => c.name === categoryName)

          if (category) {
            categoriesState.updateCategoryRoles(category.id, [
              ...(category.roleIds ?? []),
              newRole.id,
            ])
          }

          return {
            roles: [...state.roles, newRole],
          }
        }),

      deleteRole: (roleId) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== roleId),
        })),
    }),
    {
      name: "role-store",
      getStorage: () => IDBStorage,
    }
  )
)

interface RoleCategoryState {
  categories: RoleCategory[]
  addCategory: (name: string, roleIds?: string[]) => void
  deleteCategory: (categoryId: string) => void
  updateCategoryRoles: (categoryId: string, roleIds?: string[]) => void
}

export const useRoleCategoryStore = create(
  persist<RoleCategoryState>(
    (set) => ({
      categories: [],

      addCategory: (name, roleIds) =>
        set((state) => ({
          categories: [...state.categories, { id: nanoid(), name, roleIds: roleIds ?? [] }],
        })),

      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== categoryId),
        })),

      updateCategoryRoles: (categoryId, roleIds) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId ? { ...category, roleIds: roleIds ?? [] } : category
          ),
        })),
    }),
    {
      name: "role-category-store",
      getStorage: () => IDBStorage,
    }
  )
)
