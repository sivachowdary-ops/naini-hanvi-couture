"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Order } from "@/app/admin/page";
import { Printer, ArrowLeft } from "lucide-react";

interface ReceiptPageProps {
  params: Promise<{ id: string }>;
}

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
    created_at: new Date().toISOString(),
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
    created_at: new Date().toISOString(),
  }
];

export default function ReceiptPrintPage({ params }: ReceiptPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Authenticate session and load order
  useEffect(() => {
    async function checkAuthAndLoadOrder() {
      setLoading(true);
      setError(null);

      if (isSupabaseConfigured) {
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

          // Fetch order
          const { data: dbOrder, error: dbErr } = await supabase
            .from("orders")
            .select("*")
            .eq("id", id)
            .maybeSingle();

          if (dbErr) throw dbErr;

          if (dbOrder) {
            setOrder({
              id: dbOrder.id,
              customer_name: dbOrder.customer_name,
              mobile: dbOrder.mobile,
              address: dbOrder.address,
              state: dbOrder.state,
              city: dbOrder.city,
              pincode: dbOrder.pincode,
              email: dbOrder.email || "",
              notes: dbOrder.notes || "",
              items: Array.isArray(dbOrder.items) ? dbOrder.items : [],
              subtotal: Number(dbOrder.subtotal),
              status: dbOrder.status,
              created_at: dbOrder.created_at,
            });
          } else {
            setError("Order not found.");
          }
        } catch (err: any) {
          console.error("Failed to load order:", err);
          setError(err.message || "Failed to load order from database.");
        } finally {
          setLoading(false);
        }
      } else {
        // Mock mode
        const mockOrder = MOCK_ORDERS.find((o) => String(o.id) === String(id));
        if (mockOrder) {
          setOrder(mockOrder);
        } else {
          setError("Mock order not found.");
        }
        setLoading(false);
      }
    }

    checkAuthAndLoadOrder();
  }, [id, router]);

  // Trigger print dialog once order is loaded and rendered
  useEffect(() => {
    if (order && !loading && !error) {
      const timer = setTimeout(() => {
        window.print();
      }, 500); // Small timeout to ensure DOM is fully painted
      return () => clearTimeout(timer);
    }
  }, [order, loading, error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-gray-500 font-extrabold uppercase tracking-wide text-xs">Generating print format...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white p-6 text-center space-y-4">
        <p className="text-red-600 font-extrabold uppercase text-sm">Error: {error || "Order not found"}</p>
        <button
          onClick={() => window.close()}
          className="px-4 py-2 border-2 border-black font-extrabold text-xs uppercase"
        >
          Close Window
        </button>
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col items-center py-4">
      
      {/* Styles Injection for Thermal Print Customizations */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            width: 79mm !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 11px !important;
            line-height: 1.2 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            width: 79mm !important;
            margin: 0 !important;
            padding: 2mm !important;
          }
        }
        /* Custom styling for receipt design */
        .receipt-container {
          width: 79mm;
          padding: 10px;
          border: 1px solid #ddd;
          background: #fff;
          box-sizing: border-box;
        }
        @media print {
          .receipt-container {
            border: none !important;
            width: 79mm !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* Control Panel (Hidden during Printing) */}
      <div className="no-print w-[79mm] mb-4 bg-gray-100 p-2 border border-gray-300 rounded flex justify-between items-center text-xs">
        <button
          onClick={() => router.push("/admin")}
          className="inline-flex items-center gap-1 font-extrabold text-gray-700 hover:text-black uppercase"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1 px-2 py-1 bg-black text-white rounded font-extrabold uppercase"
        >
          <Printer size={12} />
          Print
        </button>
      </div>

      {/* Thermal Receipt Print Area (79mm Wide, Forced Bold/Black Text) */}
      <div className="receipt-container print-area font-extrabold text-black">
        
        {/* Brand Header */}
        <div className="text-center space-y-1 mb-3">
          <h1 className="text-sm font-extrabold uppercase tracking-wider">NAINI HANVI COUTURE</h1>
          <p className="text-[10px] font-extrabold uppercase">A Saree House</p>
          <p className="text-[9px] font-extrabold">Mob: +91 91000 50610</p>
          <p className="text-[8px] font-extrabold tracking-tight">broulspfcjdajpdbcnnv.supabase.co</p>
        </div>

        {/* Divider */}
        <div className="text-center text-[10px] mb-2 select-none tracking-tighter">
          ------------------------------------------
        </div>

        {/* Order Details block */}
        <div className="text-[10px] space-y-1 mb-2 leading-snug">
          <div><span className="uppercase">ORDER ID :</span> #{order.id}</div>
          <div><span className="uppercase">DATE     :</span> {orderDate}</div>
          <div><span className="uppercase">STATUS   :</span> {order.status.toUpperCase()}</div>
        </div>

        {/* Divider */}
        <div className="text-center text-[10px] mb-2 select-none tracking-tighter">
          ------------------------------------------
        </div>

        {/* Customer Shipping Address block */}
        <div className="text-[10px] space-y-1 mb-3 leading-snug">
          <div className="uppercase underline">SHIPPING DETAILS</div>
          <div>NAME   : {order.customer_name.toUpperCase()}</div>
          <div>MOB    : {order.mobile}</div>
          {order.email && <div>EMAIL  : {order.email}</div>}
          <div className="break-words">
            ADDR   : {order.address.toUpperCase()}, {order.city.toUpperCase()}, {order.state.toUpperCase()} - {order.pincode}
          </div>
          {order.notes && (
            <div className="p-1 border border-black rounded text-[9px] break-words uppercase mt-1">
              NOTE: {order.notes}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="text-center text-[10px] mb-2 select-none tracking-tighter">
          ------------------------------------------
        </div>

        {/* Items Table */}
        <div className="text-[10px] mb-3">
          <div className="grid grid-cols-[3fr_1fr_1fr] border-b border-black pb-1 mb-1.5 uppercase font-extrabold">
            <div>Item Name</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Price</div>
          </div>
          
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[3fr_1fr_1fr] items-start text-[9.5px] font-extrabold">
                <div className="break-words uppercase leading-tight">{item.name}</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right">₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="text-center text-[10px] mb-2 select-none tracking-tighter">
          ------------------------------------------
        </div>

        {/* Grand Total */}
        <div className="text-[11px] font-extrabold leading-normal">
          <div className="flex justify-between">
            <span className="uppercase">SUBTOTAL:</span>
            <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-xs font-black border-t border-dashed border-black pt-1 mt-1">
            <span className="uppercase">GRAND TOTAL:</span>
            <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="text-center text-[10px] mt-2 mb-2 select-none tracking-tighter">
          ------------------------------------------
        </div>

        {/* Footer info */}
        <div className="text-center space-y-1 mt-3">
          <p className="text-[9px] font-extrabold uppercase">THANK YOU FOR YOUR ORDER!</p>
          <p className="text-[8px] font-extrabold">For exchanges or queries, WhatsApp us.</p>
        </div>

      </div>
    </div>
  );
}
