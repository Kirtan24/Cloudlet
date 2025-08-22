import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardHome from "./DashboardHome";
import AssetsView from "./AssetsView";
import ApiKeysView from "./ApiKeysView";

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome onSectionChange={setActiveSection} />;
      case "assets":
        return <AssetsView filterType="all" />;
      case "images":
        return <AssetsView filterType="image" />;
      case "videos":
        return <AssetsView filterType="video" />;
      case "documents":
        return <AssetsView filterType="document" />;
      case "api-keys":
        return <ApiKeysView />;
      default:
        return <DashboardHome onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex h-screen">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onSearch={handleSearch} />
          <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
