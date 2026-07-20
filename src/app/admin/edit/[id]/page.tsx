"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mapDbProductToProduct, MOCK_PRODUCTS, Product } from "@/lib/products";
import { ArrowLeft, Save, AlertCircle, Key, RefreshCw } from "lucide-react";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditProductPage({ params }: EditPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  // Auth states
  const [authLoading, setAuthLoading] = useState(true);

  // Form states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Product field states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [badge, setBadge] = useState<string>("");
  const [fabric, setFabric] = useState("");
  const [lengthWidth, setLengthWidth] = useState("");
  const [blouseDetail, setBlouseDetail] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [gallery, setGallery] = useState<any[]>([]);

  // Password reset states
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  // Categories list (extracted from other products or fixed)
  const [categories, setCategories] = useState<string[]>(["New Arrivals", "Party Wear", "Silk Sarees", "Bestsellers"]);

  // Verify auth
  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }

        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalData?.nextLevel === "aal2" && aalData?.currentLevel !== "aal2") {
          router.push("/admin/login");
          return;
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Load product
  useEffect(() => {
    if (authLoading) return;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured) {
        const p = MOCK_PRODUCTS.find((item) => item.id === id);
        if (p) {
          setName(p.name);
          setCategory(p.category);
          setPrice(p.price);
          setMrp(p.mrp !== undefined ? p.mrp : "");
          setDescription(p.description);
          setInStock(p.inStock);
          setIsBestSeller(p.isBestSeller);
          setBadge(p.badge || "");
          setFabric(p.fabric || "");
          setLengthWidth(p.lengthWidth || "");
          setBlouseDetail(p.blouseDetail || "");
          setTagsInput(p.tags?.join(", ") || "");
          setGallery(p.gallery || []);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const product = mapDbProductToProduct(data);
          setName(product.name);
          setCategory(product.category);
          setPrice(product.price);
          setMrp(product.mrp !== undefined ? product.mrp : "");
          setDescription(product.description);
          setInStock(product.inStock);
          setIsBestSeller(product.isBestSeller);
          setBadge(product.badge || "");
          setFabric(product.fabric || "");
          setLengthWidth(product.lengthWidth || "");
          setBlouseDetail(product.blouseDetail || "");
          setTagsInput(product.tags?.join(", ") || "");
          setGallery(product.gallery || []);

          // Query unique categories in database
          const { data: catData } = await supabase.from("products").select("category");
          if (catData) {
            const uniqueCats = Array.from(new Set(catData.map((d: any) => d.category)));
            setCategories(uniqueCats.filter(Boolean));
          }
        } else {
          setError("Product not found in Supabase.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, authLoading]);

  // Handle Form Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);

    if (price <= 0) {
      setError("Price must be a positive number.");
      setSaving(false);
      return;
    }

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const mrpValue = mrp === "" ? null : Number(mrp);

    // Save mock state
    if (!isSupabaseConfigured) {
      const idx = MOCK_PRODUCTS.findIndex((item) => item.id === id);
      if (idx !== -1) {
        MOCK_PRODUCTS[idx] = {
          ...MOCK_PRODUCTS[idx],
          name,
          category,
          price,
          mrp: mrpValue !== null ? mrpValue : undefined,
          description,
          inStock,
          isBestSeller,
          badge: (badge as any) || null,
          fabric,
          lengthWidth,
          blouseDetail,
          tags: tagsArray,
        };
        setSuccess(true);
        setTimeout(() => router.push("/admin"), 1000);
      } else {
        setError("Unable to save mock product.");
      }
      setSaving(false);
      return;
    }

    try {
      const updateData = {
        name,
        category,
        price,
        mrp: mrpValue,
        description,
        in_stock: inStock,
        is_bestseller: isBestSeller,
        badge: badge || null,
        fabric: fabric || null,
        length_width: lengthWidth || null,
        blouse_detail: blouseDetail || null,
        tags: tagsArray,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 1000);
    } catch (err: any) {
      setError(err.message || "Failed to save product changes.");
    } finally {
      setSaving(false);
    }
  };

  // Password reset handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPassword(true);
    setPwError(null);
    setPwSuccess(false);

    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters long.");
      setChangingPassword(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setPwSuccess(true);
      setNewPassword("");
      setChangingPassword(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      setPwSuccess(true);
      setNewPassword("");
    } catch (err: any) {
      setPwError(err.message || "Failed to update password.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Checking authorization...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium mr-4 transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
              <h1 className="text-lg font-serif font-bold text-gray-800">
                Edit Product
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Container */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        
        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
            Fetching product configurations...
          </div>
        ) : error && !name ? (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
            <h3 className="font-semibold text-lg">Error loading product</h3>
            <p className="mt-1 text-sm">{error}</p>
            <Link href="/admin" className="mt-4 inline-block text-xs font-semibold underline">
              Return to dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSave} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
                
                <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                  Product Core Details
                </h2>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 text-sm font-semibold">
                    Product updated successfully! Redirecting...
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 text-sm flex gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Price and MRP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={price || ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="e.g. 4500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Original MRP (₹) <span className="text-gray-400 font-normal">(Optional strike-through)</span>
                    </label>
                    <input
                      type="number"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="e.g. 5500"
                    />
                  </div>
                </div>

                {/* Category & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Product Status Badge
                    </label>
                    <select
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm bg-white"
                    >
                      <option value="">None</option>
                      <option value="new">NEW</option>
                      <option value="bestseller">BESTSELLER</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Product Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                    placeholder="Enter detailed description..."
                  />
                </div>

                <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 pt-4">
                  Saree Technical Specifications
                </h2>

                {/* Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Fabric
                    </label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="e.g. Silk Blend"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Length / Width
                    </label>
                    <input
                      type="text"
                      value={lengthWidth}
                      onChange={(e) => setLengthWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="e.g. 5.5m x 1.1m"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Blouse Detail
                    </label>
                    <input
                      type="text"
                      value={blouseDetail}
                      onChange={(e) => setBlouseDetail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="e.g. Unstitched piece"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="flex items-center">
                    <input
                      id="in-stock"
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="in-stock" className="ml-2 block text-sm font-medium text-gray-900">
                      In Stock (Available on Storefront)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="is-bestseller"
                      type="checkbox"
                      checked={isBestSeller}
                      onChange={(e) => setIsBestSeller(e.target.checked)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is-bestseller" className="ml-2 block text-sm font-medium text-gray-900">
                      Show in Bestsellers Homepage Rail
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Search Tags / Filters <span className="text-gray-400 font-normal">(Comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-sm"
                    placeholder="e.g. new, bestselling, banarasi"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-amber-600 border border-transparent text-sm font-semibold rounded-md text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors shadow shadow-amber-600/10 disabled:bg-amber-400"
                  >
                    <Save size={16} />
                    {saving ? "Saving Changes..." : "Save Product"}
                  </button>
                </div>

              </form>
            </div>

            {/* Sidebar Security Controls */}
            <div className="space-y-6">
              
              {/* Image Preview Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
                  Product Gallery
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((g, idx) => (
                    <div 
                      key={idx} 
                      className={`relative aspect-[3/4] border rounded overflow-hidden bg-gray-50 ${
                        g.type === "video" ? "border-amber-400" : "border-gray-200"
                      }`}
                    >
                      {g.type === "image" ? (
                        <img src={g.src} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-amber-400 p-1 text-[8px] text-center font-bold">
                          VIDEO CLIPS
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                  Note: Uploading new assets or re-ordering gallery files is currently code-managed to ensure media optimization pipelines are run.
                </p>
              </div>

              {/* Reset Password Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Key size={16} className="text-amber-600" />
                  <h3 className="text-sm font-bold text-gray-800">
                    Change Password
                  </h3>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {pwSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded p-3 text-xs font-semibold">
                      Admin password updated successfully!
                    </div>
                  )}

                  {pwError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded p-3 text-xs">
                      {pwError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-xs"
                      placeholder="Min 6 characters"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-950 text-white rounded text-xs font-semibold transition-colors disabled:bg-gray-400 shadow-sm"
                  >
                    {changingPassword ? (
                      <RefreshCw size={12} className="animate-spin" />
                    ) : null}
                    Update Password
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
