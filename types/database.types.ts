export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          subdomain: string;
          billing_status: "active" | "past_due" | "locked";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subdomain: string;
          billing_status?: "active" | "past_due" | "locked";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tenants"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          tenant_id: string | null;
          full_name: string | null;
          role: "super_admin" | "tenant_admin" | "manager" | "staff";
          created_at: string;
        };
        Insert: {
          id: string;
          tenant_id?: string | null;
          full_name?: string | null;
          role?: "super_admin" | "tenant_admin" | "manager" | "staff";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      customers: {
        Row: {
          id: string;
          tenant_id: string;
          full_name: string;
          phone: string;
          source: "telegram" | "instagram" | "web" | "manual";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          full_name: string;
          phone: string;
          source?: "telegram" | "instagram" | "web" | "manual";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      menu_items: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          sku: string | null;
          price: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          sku?: string | null;
          price: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["menu_items"]["Insert"]>;
      };
      inventory_items: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          unit: string;
          stock_qty: number;
          low_stock_threshold: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          unit: string;
          stock_qty?: number;
          low_stock_threshold?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inventory_items"]["Insert"]>;
      };
      recipes: {
        Row: {
          id: string;
          tenant_id: string;
          menu_item_id: string;
          inventory_item_id: string;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          menu_item_id: string;
          inventory_item_id: string;
          quantity: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["recipes"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          tenant_id: string;
          customer_id: string | null;
          status: "new" | "confirmed" | "preparing" | "delivered" | "cancelled";
          channel: "telegram" | "instagram" | "web" | "phone";
          total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          customer_id?: string | null;
          status?: "new" | "confirmed" | "preparing" | "delivered" | "cancelled";
          channel?: "telegram" | "instagram" | "web" | "phone";
          total_amount?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          tenant_id: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          unit_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          unit_price: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          tenant_id: string;
          customer_id: string | null;
          channel: "telegram" | "instagram" | "web";
          status: "open" | "pending" | "resolved";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          customer_id?: string | null;
          channel: "telegram" | "instagram" | "web";
          status?: "open" | "pending" | "resolved";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          tenant_id: string;
          conversation_id: string;
          sender_type: "customer" | "agent" | "ai";
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          conversation_id: string;
          sender_type: "customer" | "agent" | "ai";
          body: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
