import { useState } from "react";
import WashIcon, {
  NoSoftenerIcon,
  LowDryIcon,
  AirDryIcon,
  NoBleachIcon,
  IronIcon,
  SpotCleanIcon,
  NoWashIcon,
  ShadeIcon,
  CoverIcon,
} from "./CareIcon";
import type { FC } from "react";

type CareItemProps = {
  icon: FC<React.SVGProps<SVGSVGElement>>;
  text: string;
};

function CareItem({ icon: Icon, text }: CareItemProps) {
  return (
    <div className="group text-center p-4">
      <div className="mx-auto mb-3 w-8 h-8 transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <Icon />
      </div>
      <p className="text-sm text-charcoal-900 leading-snug">{text}</p>
    </div>
  );
}

function TowelCare() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <CareItem icon={WashIcon} text="Wash separately in cool water" />
      <CareItem icon={NoSoftenerIcon} text="Avoid fabric softeners" />
      <CareItem icon={LowDryIcon} text="Tumble dry on low to maintain fluff" />
      <CareItem icon={AirDryIcon} text="Air dry occasionally for longevity" />
    </div>
  );
}

function CottonBeddingCare() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <CareItem icon={WashIcon} text="Wash in cool to lukewarm water" />
      <CareItem icon={NoBleachIcon} text="Avoid bleach & harsh detergents" />
      <CareItem icon={AirDryIcon} text="Air dry or tumble dry on low" />
      <CareItem icon={IronIcon} text="Steam or iron on medium, if desired" />
    </div>
  );
}

function LatexCare() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <CareItem icon={SpotCleanIcon} text="Spot clean only when needed" />
      <CareItem icon={NoWashIcon} text="Do not machine wash or soak" />
      <CareItem icon={ShadeIcon} text="Air dry away from direct sunlight" />
      <CareItem icon={CoverIcon} text="Use a breathable pillow protector" />
    </div>
  );
}

export default function MaterialCare() {
  const [activeTab, setActiveTab] = useState("bedding");

  const tabs = [
    { id: "bedding", label: "Cotton Bedding" },
    { id: "towels", label: "Towels" },
    { id: "latex", label: "Latex Pillows" },
  ];

  return (
    <section className="space-y-10 fade-in-up">
      <div className="space-y-2">
        <h3 className="text-display-md font-display font-light text-charcoal-950">
          Pure Materials Ask for Gentle Care
        </h3>
        <p className="text-charcoal-600 max-w-xl">
          Thoughtfully chosen natural materials respond best to mindful care—
          and reward it with long-lasting comfort and performance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-charcoal-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm tracking-wide transition-colors ${
              activeTab === tab.id
                ? "text-charcoal-950 border-b-2 border-charcoal-950"
                : "text-charcoal-500 hover:text-charcoal-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "bedding" && <CottonBeddingCare />}
      {activeTab === "towels" && <TowelCare />}
      {activeTab === "latex" && <LatexCare />}

      <p className="text-charcoal-500 text-xs italic max-w-xl">
        Specific care may vary by product. Always refer to the individual care
        label.
      </p>
    </section>
  );
}
