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
