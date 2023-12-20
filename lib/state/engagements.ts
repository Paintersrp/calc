import { nanoid } from "nanoid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Engagement {
  id: string
  title: string
  description: string
  date: string
  type: string
  login: string
  status: string
}

interface EngagementState {
  engagements: Engagement[]
  engagementHistory: Engagement[]
  followUpEngagements: Engagement[]

  selected: Engagement | null
  setSelected: (id: string | null) => void
  setSelectedFromHistory: (id: string | null) => void
  setSelectedFromFollowUp: (id: string | null) => void

  addEngagement: (engagementData: Omit<Engagement, "id" | "date" | "status">) => void

  updateEngagement: (id: string, data: Omit<Engagement, "id" | "date" | "status">) => void
  updateEngagementHistory: (id: string, data: Omit<Engagement, "id" | "date" | "status">) => void
  updateFollowUpEngagement: (id: string, data: Omit<Engagement, "id" | "date" | "status">) => void

  deleteFromFollowUp: (id: string) => void
  deleteEngagement: (id: string) => void
  deleteFromHistory: (id: string) => void

  markAsDone: (id: string) => void
  undoMarkAsDone: (id: string) => void
  markFollowUpAsDone: (id: string) => void
  undoMarkFollowUpAsDone: (id: string) => void

  markAsFollowUp: (id: string) => void

  getEngagement: (id: string) => Engagement | undefined
}

const useEngagements = create(
  persist<EngagementState>(
    (set, get) => ({
      // Array of active engagements
      engagements: [],

      // Array of engagements marked done, up to 25 items
      engagementHistory: [],

      // Array of follow-up engagements
      followUpEngagements: [
        {
          id: nanoid(10),
          title: "Team Strategy Meeting",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros odio, dictum nec elementum id, tristique eu neque. Duis nisl tellus, lacinia quis euismod ut, blandit in augue. Nunc at tortor posuere, laoreet nisi quis, mollis metus. Proin sed erat. ",
          date: "2023-01-15T09:00:00.000Z",
          type: "Meeting",
          login: "manager",
          status: "active",
        },

        {
          id: nanoid(10),
          title: "Meeting with Team",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu lorem ut odio sodales cursus vitae vel eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas quam urna, condimentum at congue sed, consectetur at. ",
          date: new Date().toISOString(),
          type: "Meeting",
          login: "user1",
          status: "active",
        },
        {
          id: nanoid(10),
          title: "Client Call",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, sem ut ultrices lobortis, nisi justo pretium ipsum, sit amet eleifend mauris elit eu erat. Aenean est ipsum, placerat eget lobortis hendrerit, maximus eget neque. Fusce tempus tortor ex, venenatis.",
          date: new Date().toISOString(),
          type: "Call",
          login: "user2",
          status: "active",
        },
      ],

      // Getter/State for the currently selected engagement, for details display.
      selected: null,

      // Setter for selected state from active array
      setSelected: (id) => {
        if (!id) set({ selected: null })

        const engagement = get().engagements.find((e) => e.id === id)
        set({ selected: engagement })
      },

      // Setter for selected state from history array
      setSelectedFromHistory: (id) => {
        if (!id) set({ selected: null })

        const engagement = get().engagementHistory.find((e) => e.id === id)
        set({ selected: engagement })
      },

      // Setter for selected state from follow up array
      setSelectedFromFollowUp: (id) => {
        if (!id) set({ selected: null })

        const engagement = get().followUpEngagements.find((e) => e.id === id)
        set({ selected: engagement })
      },

      // Adds a new engagement to the active array.
      addEngagement: (data) => {
        const newEngagement = {
          id: nanoid(10),
          date: new Date().toISOString(),
          status: "active",
          ...data,
        }
        set((state) => ({ engagements: [...state.engagements, newEngagement] }))
      },

      // Update an existing engagement with the given data.
      updateEngagement: (id, data) => {
        set((state) => {
          const engagementIndex = state.engagements.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.engagements[engagementIndex],
            ...data,
          }

          const newEngagements = [...state.engagements]
          newEngagements[engagementIndex] = updatedEngagement

          return {
            engagements: newEngagements,
            engagementHistory: state.engagementHistory,
            followUpEngagements: state.followUpEngagements,
          }
        })
      },

      // Update an existing historical engagement with the given data.
      updateEngagementHistory: (id, data) => {
        set((state) => {
          const engagementIndex = state.engagementHistory.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.engagementHistory[engagementIndex],
            ...data,
          }

          const newHistory = [...state.engagementHistory]
          newHistory[engagementIndex] = updatedEngagement

          return {
            engagements: state.engagements,
            engagementHistory: newHistory,
            followUpEngagements: state.followUpEngagements,
          }
        })
      },

      // Update an existing follow up engagement with the given data.
      updateFollowUpEngagement: (id, data) => {
        set((state) => {
          const engagementIndex = state.followUpEngagements.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.followUpEngagements[engagementIndex],
            ...data,
          }

          const newFollowUps = [...state.followUpEngagements]
          newFollowUps[engagementIndex] = updatedEngagement

          return {
            engagements: state.engagements,
            engagementHistory: state.engagementHistory,
            followUpEngagements: newFollowUps,
          }
        })
      },

      // Removes an engagement from the active array.
      deleteEngagement: (id) => {
        set((state) => ({
          engagements: state.engagements.filter((e) => e.id !== id),
        }))
      },

      // Removes an engagement from the history array.
      deleteFromHistory: (id) => {
        set((state) => ({
          engagementHistory: state.engagementHistory.filter((e) => e.id !== id),
        }))
      },

      // Removes an engagement from the follow up array.
      deleteFromFollowUp: (id) => {
        set((state) => ({
          followUpEngagements: state.followUpEngagements.filter((e) => e.id !== id),
        }))
      },

      // Moves an engagement from the active array to the history array.
      markAsDone: (id) => {
        set((state) => {
          const engagementIndex = state.engagements.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = { ...state.engagements[engagementIndex], status: "done" }
          const newEngagements = state.engagements.filter((e, index) => index !== engagementIndex)
          const newHistory = [updatedEngagement, ...state.engagementHistory].slice(0, 25)

          return { engagements: newEngagements, engagementHistory: newHistory }
        })
      },

      // Moves an engagement back from the history array to the active array.
      undoMarkAsDone: (id) => {
        set((state) => {
          const engagementIndex = state.engagementHistory.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.engagementHistory[engagementIndex],
            status: "active",
          }
          const newHistory = state.engagementHistory.filter((e, index) => index !== engagementIndex)
          const newEngagements = [updatedEngagement, ...state.engagements]

          return { engagements: newEngagements, engagementHistory: newHistory }
        })
      },

      // Moves an engagement from the follow up array to the history array.
      markFollowUpAsDone: (id) => {
        set((state) => {
          const engagementIndex = state.followUpEngagements.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.followUpEngagements[engagementIndex],
            status: "done",
          }

          const newFollowUps = state.followUpEngagements.filter(
            (e, index) => index !== engagementIndex
          )
          const newHistory = [updatedEngagement, ...state.engagementHistory].slice(0, 25)

          return {
            engagements: state.engagements,
            engagementHistory: newHistory,
            followUpEngagements: newFollowUps,
          }
        })
      },

      // Moves an engagement back from the history array to the follow up array.
      undoMarkFollowUpAsDone: (id) => {
        set((state) => {
          const engagementIndex = state.engagementHistory.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = {
            ...state.engagementHistory[engagementIndex],
            status: "followUp",
          }
          const newHistory = state.engagementHistory.filter((e, index) => index !== engagementIndex)
          const newFollowUps = [updatedEngagement, ...state.engagements]

          return {
            engagements: state.engagements,
            engagementHistory: newHistory,
            followUpEngagements: newFollowUps,
          }
        })
      },

      // Moves an engagement from the active array to the follow up array
      markAsFollowUp: (id) => {
        set((state) => {
          const engagementIndex = state.engagements.findIndex((e) => e.id === id)
          if (engagementIndex === -1) return state

          const updatedEngagement = { ...state.engagements[engagementIndex], status: "followUp" }
          const newEngagements = state.engagements.filter((e, index) => index !== engagementIndex)
          const newFollowUps = [updatedEngagement, ...state.followUpEngagements]

          return {
            engagements: newEngagements,
            engagementHistory: state.engagementHistory,
            followUpEngagements: newFollowUps,
          }
        })
      },

      // Retrieves an engagement from the active array by its ID.
      getEngagement: (id) => get().engagements.find((e) => e.id === id),
    }),
    {
      name: "engagement-storage",
      getStorage: () => localStorage,
    }
  )
)

export { useEngagements }
