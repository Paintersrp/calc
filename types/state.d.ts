interface Role {
  id: string
  name: string
}

interface RoleCategory {
  id: string
  name: string
  roleIds?: string[]
}

interface Entry {
  id: string
  updatedAt: string
  login: string
  department: string
  shift: string
  roles: string[]
  processes: string[]
}

interface ValleyCountByQuarter {
  id: number
  quarter_id: number
  valley_id: number
  count: number

  quarter: {
    name: string
  }

  valley: {
    name: string
  }
}

interface ValleyCountById {
  id: number
  quarter_id: number
  valley_id: number
  count: number
  updated_at: Date

  quarter: {
    name: string
  }

  valley: {
    name: string
  }
}

type ValleyCountsByQuarter = {
  [quarterId: number]: ValleyCountByQuarter[]
}

type ValleyCountsById = {
  [valleyId: string]: ValleyCountById[]
}

interface FilterOptionConfig {
  id: string
  name: string
}

interface FilterOptions {
  [key: string]: FilterOptionConfig[]
}
