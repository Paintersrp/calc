import { nanoid } from "nanoid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Engagement {
  id: string
  title: string
  description: string
  date: string
  type: string
  login: string
}

interface EngagementState {
  selected: Engagement | null
  setSelected: (id: string | null) => void
  engagements: Engagement[]
  addEngagement: (engagementData: Omit<Engagement, "id" | "date">) => void
  getEngagement: (id: string) => Engagement | undefined
}

const useEngagementStore = create(
  persist<EngagementState>(
    (set, get) => ({
      selected: null,
      setSelected: (id) => {
        if (!id) set({ selected: null })

        const engagement = get().engagements.find((e) => e.id === id)
        set({ selected: engagement })
      },
      engagements: [
        // Sample engagements for testing
        {
          id: nanoid(10),
          title: "Meeting with Team",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu lorem ut odio sodales cursus vitae vel eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas quam urna, condimentum at congue sed, consectetur at. ",
          date: new Date().toISOString(),
          type: "Meeting",
          login: "user1",
        },
        {
          id: nanoid(10),
          title: "Client Call",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, sem ut ultrices lobortis, nisi justo pretium ipsum, sit amet eleifend mauris elit eu erat. Aenean est ipsum, placerat eget lobortis hendrerit, maximus eget neque. Fusce tempus tortor ex, venenatis.",
          date: new Date().toISOString(),
          type: "Call",
          login: "user2",
        },
        {
          id: nanoid(10),
          title: "Team Strategy Meeting",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros odio, dictum nec elementum id, tristique eu neque. Duis nisl tellus, lacinia quis euismod ut, blandit in augue. Nunc at tortor posuere, laoreet nisi quis, mollis metus. Proin sed erat. ",
          date: "2023-01-15T09:00:00.000Z",
          type: "Meeting",
          login: "manager",
        },
        {
          id: nanoid(10),
          title: "Product Launch Review",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis nibh aliquet sem posuere aliquet. Sed finibus porttitor sem, vitae ultricies libero vulputate egestas. Praesent id lorem et arcu imperdiet consequat in eu lacus. In rutrum nisl posuere, pharetra ante.",
          date: "2023-01-20T11:00:00.000Z",
          type: "Review",
          login: "product_lead",
        },
      ],
      addEngagement: (data) => {
        const newEngagement = {
          id: nanoid(10),
          title: data.title,
          description: data.description,
          date: new Date().toISOString(),
          type: data.type,
          login: data.login,
        }
        set((state) => ({ engagements: [...state.engagements, newEngagement] }))
      },
      getEngagement: (id) => get().engagements.find((e) => e.id === id),
    }),
    {
      name: "engagement-storage",
    }
  )
)

export { useEngagementStore }
