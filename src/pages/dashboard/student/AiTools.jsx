import React, { useState } from "react";
import ProductResearch from "./tools/ProductResearch";
import CopywritingTool from "./tools/CopywritingTool";
import AdGeneratorTool from "./tools/AdGeneratorTool"; // New Tool
import StoreNameGenerator from "./tools/StoreNameGenerator";

// Define a common style object for gradient text
const gradientTextStyle = {
    background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};

const AITools = () => {
    const [activeTab, setActiveTab] = useState("product");

    const baseTabClass =
        "px-4 py-2 font-semibold text-gray-400 transition-colors duration-200 hover:text-white relative";

    const activeTabClass = `
    font-semibold
    relative
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
    after:bg-gradient-to-r after:from-[#6A67FE] after:to-[#FE67F6]
    after:transition-all after:duration-300 after:ease-out
  `;

    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-6" style={gradientTextStyle}>
                AI Tools
            </h2>

            {/* Tab Headers */}
            <div className="flex border-b border-gray-700 mb-6 space-x-4">
                <button
                    className={`${baseTabClass} ${activeTab === "product" ? activeTabClass : ""}`}
                    onClick={() => setActiveTab("product")}
                    style={activeTab === "product" ? gradientTextStyle : null}
                >
                    🧪 Product Research
                </button>

                <button
                    className={`${baseTabClass} ${activeTab === "copywriting" ? activeTabClass : ""}`}
                    onClick={() => setActiveTab("copywriting")}
                    style={activeTab === "copywriting" ? gradientTextStyle : null}
                >
                    ✍️ Copywriting Tool
                </button>

                <button
                    className={`${baseTabClass} ${activeTab === "adgen" ? activeTabClass : ""}`}
                    onClick={() => setActiveTab("adgen")}
                    style={activeTab === "adgen" ? gradientTextStyle : null}
                >
                    📢 Ad Generator
                </button>
                <button
                    className={`${baseTabClass} ${activeTab === "store" ? activeTabClass : ""}`}
                    onClick={() => setActiveTab("store")}
                    style={activeTab === "store" ? gradientTextStyle : null}
                >
                    🛍️ Store Name Generator
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === "product" && <ProductResearch />}
                {activeTab === "copywriting" && <CopywritingTool />}
                {activeTab === "adgen" && <AdGeneratorTool />}
                {activeTab === "store" && <StoreNameGenerator />}
            </div>
        </div>
    );
};

export default AITools;
