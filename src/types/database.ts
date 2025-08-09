// src/types/database.ts

// Define specific types for JSON columns
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system'
  language?: 'id' | 'en'
  notifications?: {
    email: boolean
    push: boolean
    community: boolean
  }
  privacy?: {
    showProfile: boolean
    showActivity: boolean
  }
}

export interface ComparisonReportData {
  summary: {
    costDifference: number
    percentageChange: number
    recommendation: string
  }
  categories: {
    housing: {
      original: number
      destination: number
      difference: number
    }
    food: {
      original: number
      destination: number
      difference: number
    }
    transport: {
      original: number
      destination: number
      difference: number
    }
    utilities: {
      original: number
      destination: number
      difference: number
    }
    entertainment: {
      original: number
      destination: number
      difference: number
    }
  }
  salaryAdjustment?: {
    currentSalary: number
    recommendedSalary: number
    adjustmentPercentage: number
  }
  proximityScores?: {
    restaurants: number
    hospitals: number
    schools: number
    malls: number
    transport: number
  }
  metadata: {
    calculatedAt: string
    dataVersion: string
    methodology: string
  }
}

// Additional JSON types for other tables
export interface OperatingHours {
  monday?: { open: string; close: string; closed?: boolean }
  tuesday?: { open: string; close: string; closed?: boolean }
  wednesday?: { open: string; close: string; closed?: boolean }
  thursday?: { open: string; close: string; closed?: boolean }
  friday?: { open: string; close: string; closed?: boolean }
  saturday?: { open: string; close: string; closed?: boolean }
  sunday?: { open: string; close: string; closed?: boolean }
}

export interface MenuItems {
  [category: string]: {
    name: string
    price: number
    description?: string
    image?: string
    available: boolean
  }[]
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          subscription_tier: 'free' | 'premium' | 'corporate'
          subscription_start_date: string | null
          subscription_end_date: string | null
          reports_created: number
          last_login: string
          preferences: UserPreferences
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          subscription_tier?: 'free' | 'premium' | 'corporate'
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          reports_created?: number
          last_login?: string
          preferences?: UserPreferences
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          subscription_tier?: 'free' | 'premium' | 'corporate'
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          reports_created?: number
          last_login?: string
          preferences?: UserPreferences
          updated_at?: string
        }
      }
      cities: {
        Row: {
          id: number
          name: string
          slug: string
          province: string
          is_major_city: boolean
          latitude: number
          longitude: number
          population: number | null
          avg_income: number | null
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          province: string
          is_major_city?: boolean
          latitude: number
          longitude: number
          population?: number | null
          avg_income?: number | null
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          province?: string
          is_major_city?: boolean
          latitude?: number
          longitude?: number
          population?: number | null
          avg_income?: number | null
          timezone?: string
          updated_at?: string
        }
      }
      districts: {
        Row: {
          id: number
          city_id: number
          name: string
          slug: string
          latitude: number
          longitude: number
          income_level: 'low' | 'medium' | 'high' | 'very_high'
          rent_price_avg: number | null
          transport_score: number | null
          safety_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          city_id: number
          name: string
          slug: string
          latitude: number
          longitude: number
          income_level?: 'low' | 'medium' | 'high' | 'very_high'
          rent_price_avg?: number | null
          transport_score?: number | null
          safety_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          city_id?: number
          name?: string
          slug?: string
          latitude?: number
          longitude?: number
          income_level?: 'low' | 'medium' | 'high' | 'very_high'
          rent_price_avg?: number | null
          transport_score?: number | null
          safety_score?: number | null
          updated_at?: string
        }
      }
      housing_listings: {
        Row: {
          id: number
          city_id: number
          district_id: number | null
          title: string
          price: number
          price_type: 'monthly' | 'yearly' | 'purchase'
          property_type: string
          bedrooms: number | null
          bathrooms: number | null
          area_sqm: number | null
          latitude: number | null
          longitude: number | null
          address: string | null
          description: string | null
          amenities: string[] | null
          image_urls: string[] | null
          source_url: string | null
          source_platform: string | null
          is_verified: boolean
          proximity_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          city_id: number
          district_id?: number | null
          title: string
          price: number
          price_type: 'monthly' | 'yearly' | 'purchase'
          property_type: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_sqm?: number | null
          latitude?: number | null
          longitude?: number | null
          address?: string | null
          description?: string | null
          amenities?: string[] | null
          image_urls?: string[] | null
          source_url?: string | null
          source_platform?: string | null
          is_verified?: boolean
          proximity_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          city_id?: number
          district_id?: number | null
          title?: string
          price?: number
          price_type?: 'monthly' | 'yearly' | 'purchase'
          property_type?: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_sqm?: number | null
          latitude?: number | null
          longitude?: number | null
          address?: string | null
          description?: string | null
          amenities?: string[] | null
          image_urls?: string[] | null
          source_url?: string | null
          source_platform?: string | null
          is_verified?: boolean
          proximity_score?: number | null
          updated_at?: string
        }
      }
      comparison_reports: {
        Row: {
          id: number
          user_id: string
          origin_city_id: number | null
          destination_city_id: number | null
          origin_district_id: number | null
          destination_district_id: number | null
          salary_input: number | null
          lifestyle_preset: 'standard' | 'student' | 'family'
          report_data: ComparisonReportData
          slug: string
          is_public: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          origin_city_id?: number | null
          destination_city_id?: number | null
          origin_district_id?: number | null
          destination_district_id?: number | null
          salary_input?: number | null
          lifestyle_preset?: 'standard' | 'student' | 'family'
          report_data: ComparisonReportData
          slug: string
          is_public?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          origin_city_id?: number | null
          destination_city_id?: number | null
          origin_district_id?: number | null
          destination_district_id?: number | null
          salary_input?: number | null
          lifestyle_preset?: 'standard' | 'student' | 'family'
          report_data?: ComparisonReportData
          slug?: string
          is_public?: boolean
          view_count?: number
          updated_at?: string
        }
      }
      community_posts: {
        Row: {
          id: number
          user_id: string
          city_id: number | null
          district_id: number | null
          title: string
          content: string
          post_type: 'question' | 'review' | 'tip' | 'guide' | 'recommendation'
          category: 'housing' | 'food' | 'transport' | 'utilities' | 'healthcare' | 'education' | 'work' | 'shopping' | 'general'
          tags: string[] | null
          upvotes: number
          reply_count: number
          is_featured: boolean
          is_solved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          city_id?: number | null
          district_id?: number | null
          title: string
          content: string
          post_type?: 'question' | 'review' | 'tip' | 'guide' | 'recommendation'
          category: 'housing' | 'food' | 'transport' | 'utilities' | 'healthcare' | 'education' | 'work' | 'shopping' | 'general'
          tags?: string[] | null
          upvotes?: number
          reply_count?: number
          is_featured?: boolean
          is_solved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          city_id?: number | null
          district_id?: number | null
          title?: string
          content?: string
          post_type?: 'question' | 'review' | 'tip' | 'guide' | 'recommendation'
          category?: 'housing' | 'food' | 'transport' | 'utilities' | 'healthcare' | 'education' | 'work' | 'shopping' | 'general'
          tags?: string[] | null
          upvotes?: number
          reply_count?: number
          is_featured?: boolean
          is_solved?: boolean
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier_enum: 'free' | 'premium' | 'corporate'
      lifestyle_preset_enum: 'standard' | 'student' | 'family'
      income_level_enum: 'low' | 'medium' | 'high' | 'very_high'
      post_type_enum: 'question' | 'review' | 'tip' | 'guide' | 'recommendation'
      category_enum: 'housing' | 'food' | 'transport' | 'utilities' | 'healthcare' | 'education' | 'work' | 'shopping' | 'general'
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type District = Database['public']['Tables']['districts']['Row']
export type HousingListing = Database['public']['Tables']['housing_listings']['Row']
export type ComparisonReport = Database['public']['Tables']['comparison_reports']['Row']
export type CommunityPost = Database['public']['Tables']['community_posts']['Row']

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type CityInsert = Database['public']['Tables']['cities']['Insert']
export type DistrictInsert = Database['public']['Tables']['districts']['Insert']
export type HousingListingInsert = Database['public']['Tables']['housing_listings']['Insert']
export type ComparisonReportInsert = Database['public']['Tables']['comparison_reports']['Insert']
export type CommunityPostInsert = Database['public']['Tables']['community_posts']['Insert']

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type CityUpdate = Database['public']['Tables']['cities']['Update']
export type DistrictUpdate = Database['public']['Tables']['districts']['Update']
export type HousingListingUpdate = Database['public']['Tables']['housing_listings']['Update']
export type ComparisonReportUpdate = Database['public']['Tables']['comparison_reports']['Update']
export type CommunityPostUpdate = Database['public']['Tables']['community_posts']['Update']

// Enums
export type SubscriptionTier = Database['public']['Enums']['subscription_tier_enum']
export type LifestylePreset = Database['public']['Enums']['lifestyle_preset_enum']
export type IncomeLevel = Database['public']['Enums']['income_level_enum']
export type PostType = Database['public']['Enums']['post_type_enum']
export type PostCategory = Database['public']['Enums']['category_enum']