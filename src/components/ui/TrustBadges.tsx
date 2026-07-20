import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: Truck, title: "COD Available", desc: "Pay on delivery" },
    { icon: RotateCcw, title: "Easy Returns", desc: "No questions asked" }, // Note: client to verify policy
    { icon: ShieldCheck, title: "Quality Assured", desc: "Handpicked fabrics" },
  ];

  return (
    <div className="py-8 bg-cream-alt border-y border-cream-base/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex flex-col items-center justify-center text-center space-y-2 p-4 bg-cream-base/50 rounded-lg">
                <div className="bg-cream-base p-3 rounded-full text-rose-accent shadow-sm">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-charcoal-text">{badge.title}</h4>
                  <p className="text-xs text-muted-text mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
