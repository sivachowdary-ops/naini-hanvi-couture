"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getProducts, Product } from "@/lib/products";
import { 
  LogOut, Search, Check, X, Edit, 
  ShoppingBag, ClipboardList, Download, Printer, User, Phone, MapPin, Calendar, CreditCard
} from "lucide-react";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  customer_name: string;
  mobile: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  email?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  status: "Pending" | "Shipped" | "Cancelled";
  created_at: string;
};

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    customer_name: "Siva Chowdary",
    mobile: "9100050610",
    address: "Door No 4-12, Heritage Residency, Near Benz Circle",
    state: "Andhra Pradesh",
    city: "Vijayawada",
    pincode: "520001",
    email: "siva@nainihanvi.com",
    notes: "Please pack with extra protection. Delivering as gift.",
    items: [
      { id: "prod-1", name: "Elegant Maroon Saree", price: 4500, quantity: 1 }
    ],
    subtotal: 4500,
    status: "Pending",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    customer_name: "Priya Sharma",
    mobile: "9876543210",
    address: "Flat 402, Lotus Apartments, HSR Layout Sector 3",
    state: "Karnataka",
    city: "Bengaluru",
    pincode: "560102",
    email: "priya@example.com",
    notes: "",
    items: [
      { id: "prod-2", name: "Classic Gold Saree", price: 6200, quantity: 2 }
    ],
    subtotal: 12400,
    status: "Shipped",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
  }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Auth states
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Active Tab: "products" | "orders"
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  // Catalog / Orders lists states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Check auth
  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured) {
        setAuthLoading(false);
        return; // Allow local mock mode
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }

        // Verify MFA AAL level
        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalData?.nextLevel === "aal2" && aalData?.currentLevel !== "aal2") {
          router.push("/admin/login");
          return;
        }

        setSession(session);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Load data based on tab
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "products") {
        const data = await getProducts();
        setProducts(data);
      } else {
        if (!isSupabaseConfigured) {
          setOrders(MOCK_ORDERS);
          setLoading(false);
          return;
        }
        
        const { data, error: dbErr } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (dbErr) throw dbErr;
        
        // Map database response to Order type
        const mappedOrders = (data || []).map((o: any) => ({
          id: o.id,
          customer_name: o.customer_name,
          mobile: o.mobile,
          address: o.address,
          state: o.state,
          city: o.city,
          pincode: o.pincode,
          email: o.email || "",
          notes: o.notes || "",
          items: Array.isArray(o.items) ? o.items : [],
          subtotal: Number(o.subtotal),
          status: o.status,
          created_at: o.created_at,
        })) as Order[];

        setOrders(mappedOrders);
      }
    } catch (err: any) {
      setError(err.message || `Failed to fetch ${activeTab}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadData();
    }
  }, [authLoading, activeTab]);

  // Inline Toggles for Products
  const handleToggleStock = async (productId: string, currentStock: boolean) => {
    const newStock = !currentStock;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: newStock } : p))
    );

    if (!isSupabaseConfigured) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({ in_stock: newStock })
        .eq("id", productId);

      if (error) throw error;
    } catch (err: any) {
      console.error("Failed to update stock:", err);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, inStock: currentStock } : p))
      );
      alert("Failed to update stock status: " + err.message);
    }
  };

  const handleToggleBestseller = async (productId: string, currentBestseller: boolean) => {
    const newBestseller = !currentBestseller;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isBestSeller: newBestseller } : p))
    );

    if (!isSupabaseConfigured) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({ is_bestseller: newBestseller })
        .eq("id", productId);

      if (error) throw error;
    } catch (err: any) {
      console.error("Failed to update bestseller:", err);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, isBestSeller: currentBestseller } : p))
      );
      alert("Failed to update best-seller: " + err.message);
    }
  };

  // Status Change for Orders
  const handleOrderStatusChange = async (orderId: string | number, newStatus: "Pending" | "Shipped" | "Cancelled") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    if (!isSupabaseConfigured) return;

    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;
    } catch (err: any) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status: " + err.message);
    }
  };

  // CSV Export for Orders
  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = [
      "Order ID", "Customer Name", "Mobile", "Email", "Date", 
      "Items Summary", "Subtotal", "Status", "Address", "City", "State", "Pincode", "Notes"
    ];

    const rows = filteredOrders.map((o) => {
      const itemsText = o.items.map((item) => `${item.name} (Qty ${item.quantity})`).join(" | ");
      return [
        o.id,
        `"${o.customer_name.replace(/"/g, '""')}"`,
        `'${o.mobile}`,
        o.email || "",
        new Date(o.created_at).toLocaleDateString(),
        `"${itemsText.replace(/"/g, '""')}"`,
        o.subtotal,
        o.status,
        `"${o.address.replace(/"/g, '""')}"`,
        o.city,
        o.state,
        o.pincode,
        `"${(o.notes || "").replace(/"/g, '""')}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `naini_hanvi_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesStock = stockFilter === "all" || 
                         (stockFilter === "instock" && p.inStock) || 
                         (stockFilter === "outofstock" && !p.inStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || 
                          o.mobile.includes(search) || 
                          o.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Unique categories for filters
  const categories = Array.from(new Set(products.map((p) => p.category)));

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Checking authorization settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Top row: Brand name + Logout */}
          <div className="flex justify-between items-center h-12 sm:h-14">
            <span className="text-base sm:text-lg font-serif font-bold text-gray-800 tracking-tight">
              Naini Hanvi Couture
            </span>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                {session?.user?.email || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-gray-300 rounded-md text-[11px] sm:text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
          {/* Bottom row: Tab Toggles */}
          <div className="flex items-center gap-1 pb-2">
            <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab("products"); setSearch(""); }}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "products" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <ShoppingBag size={14} />
                Products
              </button>
              <button
                onClick={() => { setActiveTab("orders"); setSearch(""); }}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "orders" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <ClipboardList size={14} />
                Orders
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Container */}
      <main className="max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">

        {/* Header section based on Tab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              {activeTab === "products" ? "Product Catalog" : "Store Orders"}
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              {activeTab === "products" ? "Manage pricing details and catalog availability." : "Track customer orders and fulfillment."}
            </p>
          </div>
        </div>

        {/* Filters and search section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === "products" ? "Search products..." : "Search by Customer or Mobile..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm placeholder-gray-400"
            />
          </div>

          {/* Filter select values */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {activeTab === "products" ? (
              <>
                {/* Category filter */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="py-1.5 pl-2 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 text-xs focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Stock status filter */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>Stock:</span>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="py-1.5 pl-2 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 text-xs focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="all">All Inventory</option>
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* Order status filter */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="py-1.5 pl-2 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 text-xs focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="all">All Orders</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Export button */}
                <button
                  onClick={handleExportCSV}
                  disabled={filteredOrders.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm disabled:opacity-50"
                >
                  <Download size={14} />
                  Export CSV
                </button>
              </>
            )}
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 text-sm flex gap-2">
            <span>{error}</span>
          </div>
        )}

        {/* Main Grid View list */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-20 text-center text-gray-500 text-sm">
              Loading details...
            </div>
          ) : activeTab === "products" ? (
            
            /* PRODUCTS LIST VIEW */
            filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-gray-400 text-sm">
                No products found matching filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-4">Product</th>
                      <th scope="col" className="px-6 py-4">Category</th>
                      <th scope="col" className="px-6 py-4">Price</th>
                      <th scope="col" className="px-6 py-4 text-center">Stock Status</th>
                      <th scope="col" className="px-6 py-4 text-center">Bestseller</th>
                      <th scope="col" className="px-6 py-4 text-center">Badge</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredProducts.map((p) => {
                      const primaryImage = p.gallery.find((g) => g.type === "image")?.src || "/placeholder.jpg";
                      return (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-16 rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                                <Image
                                  src={primaryImage}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 max-w-xs truncate">{p.name}</div>
                                <div className="text-xs text-gray-500">ID: {p.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">₹{p.price.toLocaleString("en-IN")}</div>
                            {p.mrp && p.mrp > p.price && (
                              <div className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString("en-IN")}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleToggleStock(p.id, p.inStock)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all border ${
                                p.inStock 
                                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                                  : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              }`}
                            >
                              {p.inStock ? <Check size={12} /> : <X size={12} />}
                              {p.inStock ? "In Stock" : "Out of Stock"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleToggleBestseller(p.id, p.isBestSeller)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all border ${
                                p.isBestSeller 
                                  ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" 
                                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {p.isBestSeller ? "Bestseller" : "Standard"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {p.badge ? (
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                            <Link
                              href={`/admin/edit/${p.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium"
                            >
                              <Edit size={12} />
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            
            /* ORDERS LIST VIEW */
            filteredOrders.length === 0 ? (
              <div className="py-20 text-center text-gray-400 text-sm">
                No customer orders found.
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                      <tr>
                        <th scope="col" className="px-6 py-4">Order Details</th>
                        <th scope="col" className="px-6 py-4">Customer Info</th>
                        <th scope="col" className="px-6 py-4">Shipping Address</th>
                        <th scope="col" className="px-6 py-4">Items Summary</th>
                        <th scope="col" className="px-6 py-4">Total Price</th>
                        <th scope="col" className="px-6 py-4 text-center">Status</th>
                        <th scope="col" className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50 transition-colors align-top">
                          <td className="px-6 py-4 whitespace-nowrap space-y-1">
                            <div className="font-bold text-gray-900">#Order {o.id}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(o.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </td>
                          <td className="px-6 py-4 space-y-1">
                            <div className="font-semibold text-gray-900 flex items-center gap-1"><User size={12} className="text-gray-400" />{o.customer_name}</div>
                            <div className="text-xs text-gray-600 flex items-center gap-1"><Phone size={12} className="text-gray-400" />{o.mobile}</div>
                            {o.email && <div className="text-[10px] text-gray-500 max-w-[150px] truncate">{o.email}</div>}
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-700 max-w-[200px]">
                            <div className="flex gap-1">
                              <MapPin size={12} className="text-gray-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="line-clamp-2">{o.address}</p>
                                <p className="font-semibold text-gray-600 mt-0.5">{o.city}, {o.state} - {o.pincode}</p>
                                {o.notes && <p className="text-[10px] text-amber-700 bg-amber-50 px-1 py-0.5 border border-amber-100 rounded mt-1">Notes: {o.notes}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-600">
                            <ul className="space-y-1">
                              {o.items.map((item, idx) => (
                                <li key={idx} className="list-disc list-inside">
                                  <span className="font-semibold text-gray-800">{item.name}</span>
                                  <span className="text-gray-500"> x {item.quantity}</span>
                                  <span className="text-gray-400"> (₹{item.price.toLocaleString("en-IN")})</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900 flex items-center gap-1"><CreditCard size={12} className="text-gray-400" />₹{o.subtotal.toLocaleString("en-IN")}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <select value={o.status} onChange={(e) => handleOrderStatusChange(o.id, e.target.value as any)} className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${o.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : o.status === "Shipped" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"} focus:outline-none`}>
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button onClick={() => window.open(`/admin/receipt/${o.id}`, "_blank")} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-xs font-semibold shadow shadow-amber-600/10">
                              <Printer size={12} />Print K-Motif
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {filteredOrders.map((o) => (
                    <div key={o.id} className="p-4 space-y-3">
                      {/* Header row: Order ID + Status */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900 text-sm">#Order {o.id}</span>
                          <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                            <Calendar size={11} />
                            {new Date(o.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <select value={o.status} onChange={(e) => handleOrderStatusChange(o.id, e.target.value as any)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${o.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : o.status === "Shipped" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"} focus:outline-none`}>
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Customer details */}
                      <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-xs">
                        <div className="font-semibold text-gray-900 flex items-center gap-1.5"><User size={12} className="text-gray-400" />{o.customer_name}</div>
                        <div className="text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" />{o.mobile}</div>
                        {o.email && <div className="text-gray-500 truncate pl-[18px]">{o.email}</div>}
                        <div className="text-gray-600 flex gap-1.5">
                          <MapPin size={12} className="text-gray-400 shrink-0 mt-0.5" />
                          <span>{o.address}, {o.city}, {o.state} - {o.pincode}</span>
                        </div>
                        {o.notes && <div className="text-[10px] text-amber-700 bg-amber-50 px-2 py-1 border border-amber-100 rounded">Notes: {o.notes}</div>}
                      </div>

                      {/* Items + Total */}
                      <div className="text-xs text-gray-700 space-y-1">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span><span className="font-semibold">{item.name}</span> × {item.quantity}</span>
                            <span className="text-gray-500">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold text-gray-900 text-sm pt-1 border-t border-gray-200">
                          <span>Total</span>
                          <span>₹{o.subtotal.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Print button */}
                      <button onClick={() => window.open(`/admin/receipt/${o.id}`, "_blank")} className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-xs font-semibold shadow">
                        <Printer size={13} />Print K-Motif Receipt
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}
