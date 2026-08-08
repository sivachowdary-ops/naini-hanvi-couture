import { Product } from "@/lib/products";

export type WhatsAppOrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export type WhatsAppShippingData = {
  fullName: string;
  mobile: string;
  addressLine: string;
  state: string;
  city: string;
  pinCode: string;
  email?: string;
  orderNotes?: string;
};

const WHATSAPP_PHONE = "918008122236";

export function buildWhatsAppOrderMessage(
  items: WhatsAppOrderItem[],
  shipping: WhatsAppShippingData
): string {
  const orderLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    )
    .join("\n");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let message = `Hi Naini Hanvi Couture! I'd like to place an order.

Order Summary:
${orderLines}
Subtotal: ₹${subtotal.toLocaleString("en-IN")}

Shipping Details:
Name: ${shipping.fullName}
Mobile: ${shipping.mobile}
Address: ${shipping.addressLine}, ${shipping.city}, ${shipping.state} - ${shipping.pinCode}`;

  if (shipping.email) {
    message += `\nEmail: ${shipping.email}`;
  }

  if (shipping.orderNotes && shipping.orderNotes.trim()) {
    message += `\n\nOrder Notes: ${shipping.orderNotes.trim()}`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

/**
 * Resolve cart line items to WhatsAppOrderItems using the product catalog.
 */
export function resolveCartItems(
  cartItems: { productId: string; quantity: number }[],
  products: Product[]
): WhatsAppOrderItem[] {
  return cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    })
    .filter((item): item is WhatsAppOrderItem => item !== null);
}
