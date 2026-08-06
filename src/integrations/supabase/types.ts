export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          aadhaar_no: string | null
          address: string
          admin_note: string | null
          candidate_name: string
          category: string | null
          contact: string
          course_id: string | null
          created_at: string
          date_of_birth: string
          email: string | null
          father_income: string | null
          father_name: string | null
          father_occupation: string | null
          gender: string
          id: string
          mother_income: string | null
          mother_name: string | null
          mother_occupation: string | null
          nationality: string
          registration_date: string
          religion: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["admission_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          aadhaar_no?: string | null
          address: string
          admin_note?: string | null
          candidate_name: string
          category?: string | null
          contact: string
          course_id?: string | null
          created_at?: string
          date_of_birth: string
          email?: string | null
          father_income?: string | null
          father_name?: string | null
          father_occupation?: string | null
          gender: string
          id?: string
          mother_income?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          nationality?: string
          registration_date?: string
          religion?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["admission_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          aadhaar_no?: string | null
          address?: string
          admin_note?: string | null
          candidate_name?: string
          category?: string | null
          contact?: string
          course_id?: string | null
          created_at?: string
          date_of_birth?: string
          email?: string | null
          father_income?: string | null
          father_name?: string | null
          father_occupation?: string | null
          gender?: string
          id?: string
          mother_income?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          nationality?: string
          registration_date?: string
          religion?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["admission_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admissions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          batch_timing: string
          course_group: string
          created_at: string
          description: string
          fee_half_yearly: number | null
          fee_monthly: number | null
          fee_quarterly: number | null
          fee_yearly: number | null
          id: string
          is_active: boolean
          level: string
          slug: string
          sort_order: number
          subjects: string[]
          title: string
          updated_at: string
        }
        Insert: {
          batch_timing?: string
          course_group?: string
          created_at?: string
          description?: string
          fee_half_yearly?: number | null
          fee_monthly?: number | null
          fee_quarterly?: number | null
          fee_yearly?: number | null
          id?: string
          is_active?: boolean
          level?: string
          slug: string
          sort_order?: number
          subjects?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          batch_timing?: string
          course_group?: string
          created_at?: string
          description?: string
          fee_half_yearly?: number | null
          fee_monthly?: number | null
          fee_quarterly?: number | null
          fee_yearly?: number | null
          id?: string
          is_active?: boolean
          level?: string
          slug?: string
          sort_order?: number
          subjects?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      payment_settings: {
        Row: {
          id: number
          instructions: string
          payee_name: string
          qr_image_url: string | null
          updated_at: string
          upi_id: string
        }
        Insert: {
          id?: number
          instructions?: string
          payee_name?: string
          qr_image_url?: string | null
          updated_at?: string
          upi_id?: string
        }
        Update: {
          id?: number
          instructions?: string
          payee_name?: string
          qr_image_url?: string | null
          updated_at?: string
          upi_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          admin_note: string | null
          admission_id: string
          amount: number
          created_at: string
          id: string
          plan: string
          screenshot_path: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
          utr: string | null
        }
        Insert: {
          admin_note?: string | null
          admission_id: string
          amount: number
          created_at?: string
          id?: string
          plan?: string
          screenshot_path?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
          utr?: string | null
        }
        Update: {
          admin_note?: string | null
          admission_id?: string
          amount?: number
          created_at?: string
          id?: string
          plan?: string
          screenshot_path?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
          utr?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admission_status: "pending" | "approved" | "rejected"
      app_role: "admin" | "student"
      payment_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admission_status: ["pending", "approved", "rejected"],
      app_role: ["admin", "student"],
      payment_status: ["pending", "verified", "rejected"],
    },
  },
} as const
