"use client"

import { nanoid } from "nanoid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { IDBStorage } from "@/lib/idb"

import { useRoleCategoryStore, useRoleStore } from "./role"

interface RosterState {
  roster: Entry[]
  addEntry: (entry: Omit<Entry, "id" | "updatedAt" | "processes">) => void
  updateEntry: (id: string, updatedInfo: Partial<Entry>) => void
  deleteEntry: (id: string) => void
  searchEntries: (criteria: { logins?: string[]; badges?: string[]; roles?: string[] }) => Entry[]
}

export const useRosterStore = create(
  persist<RosterState>(
    (set, get) => ({
      roster: [],

      addEntry: (entry) =>
        set((state) => {
          const processes = getCategoriesForRoles(entry.roles)
          return {
            roster: [
              ...state.roster,
              {
                id: nanoid(10),
                updatedAt: new Date().toISOString(),
                ...entry,
                processes,
              },
            ],
          }
        }),

      updateEntry: (id, updatedInfo) =>
        set((state) => ({
          roster: state.roster.map((entry) => {
            if (entry.id === id) {
              const updatedRoles = updatedInfo.roles || entry.roles
              const processes = getCategoriesForRoles(updatedRoles)
              return {
                ...entry,
                ...updatedInfo,
                updatedAt: new Date().toISOString(),
                processes,
              }
            }
            return entry
          }),
        })),

      deleteEntry: (id) => {
        console.log(id)
        set((state) => ({
          roster: state.roster.filter((entry) => entry.id !== id),
        }))
      },

      searchEntries: ({ logins, badges, roles }) =>
        get().roster.filter(
          (entry) =>
            (logins ? logins.includes(entry.login) : true) &&
            (badges ? badges.includes(entry.badge) : true) &&
            (roles ? entry.roles.some((role) => roles.includes(role)) : true)
        ),
    }),
    {
      name: "roster-store",
      getStorage: () => IDBStorage,
    }
  )
)

function getCategoriesForRoles(roleIds: string[]): string[] {
  const { roles } = useRoleStore.getState()
  const { categories } = useRoleCategoryStore.getState()

  const categoryNames = new Set<string>()

  for (const roleId of roleIds) {
    // Find the role by its ID
    const role = roles.find((r) => r.id === roleId)
    if (role) {
      // For each category, check if it contains the role ID
      categories.forEach((category) => {
        if (category.roleIds && category.roleIds.includes(role.id)) {
          categoryNames.add(category.name)
        }
      })
    }
  }

  return Array.from(categoryNames)
}
