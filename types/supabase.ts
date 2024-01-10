export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assignment_templates: {
        Row: {
          id: number
          role_id: number
          template_id: number
        }
        Insert: {
          id?: number
          role_id: number
          template_id: number
        }
        Update: {
          id?: number
          role_id?: number
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "assignment_templates_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_templates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "group_templates"
            referencedColumns: ["id"]
          }
        ]
      }
      assignments: {
        Row: {
          associate_id: number | null
          group_id: number | null
          id: number
          role_id: number | null
        }
        Insert: {
          associate_id?: number | null
          group_id?: number | null
          id?: number
          role_id?: number | null
        }
        Update: {
          associate_id?: number | null
          group_id?: number | null
          id?: number
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_associate_id_fkey"
            columns: ["associate_id"]
            isOneToOne: false
            referencedRelation: "associates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      associates: {
        Row: {
          created_at: string
          department_id: number
          id: number
          login: string
          shift_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id: number
          id?: number
          login: string
          shift_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: number
          id?: number
          login?: string
          shift_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "associates_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associates_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          }
        ]
      }
      associates_roles: {
        Row: {
          associates_id: number
          created_at: string
          id: number
          roles_id: number
          updated_at: string
        }
        Insert: {
          associates_id: number
          created_at?: string
          id?: number
          roles_id: number
          updated_at?: string
        }
        Update: {
          associates_id?: number
          created_at?: string
          id?: number
          roles_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "associates_roles_associates_id_fkey"
            columns: ["associates_id"]
            isOneToOne: false
            referencedRelation: "associates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associates_roles_roles_id_fkey"
            columns: ["roles_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      dates: {
        Row: {
          date: string
          id: number
        }
        Insert: {
          date: string
          id?: number
        }
        Update: {
          date?: string
          id?: number
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      group_templates: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          id: number
          name: string
          plan_id: number
        }
        Insert: {
          id?: number
          name: string
          plan_id: number
        }
        Update: {
          id?: number
          name?: string
          plan_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      plans: {
        Row: {
          date_id: number
          id: number
          type: Database["public"]["Enums"]["shift-type"]
        }
        Insert: {
          date_id: number
          id?: number
          type: Database["public"]["Enums"]["shift-type"]
        }
        Update: {
          date_id?: number
          id?: number
          type?: Database["public"]["Enums"]["shift-type"]
        }
        Relationships: [
          {
            foreignKeyName: "plans_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "dates"
            referencedColumns: ["id"]
          }
        ]
      }
      processes: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string
          process_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          process_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          process_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          }
        ]
      }
      shifts: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "shift-type": "day (1st)" | "day (2nd)" | "night (1st)" | "night (2nd)"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
