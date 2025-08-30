import React, { useState } from "react";
import {
  Home,
  Image,
  Video,
  FileText,
  Settings,
  Key,
  Database,
  Cloud,
  User,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedProject, setSelectedProject] = useState("proj_abc123");

  const projects = [
    { id: "proj_abc123", name: "My First Project" },
    { id: "proj_def456", name: "E-commerce Site" },
    { id: "proj_ghi789", name: "Blog Platform" },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "assets", label: "Assets", icon: Database },
    { id: "images", label: "Images", icon: Image },
    { id: "videos", label: "Videos", icon: Video },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "api-keys", label: "API Keys", icon: Key },
  ];

  return (
    <div
      className={cn(
        "bg-gray-900 border-r border-gray-800 flex flex-col h-full transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and Collapse Button */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Cloud className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Cloudlet
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Project Selector */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-800">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {selectedProject.slice(-3).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white truncate max-w-32">
                      {projects.find((p) => p.id === selectedProject)?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {selectedProject}
                    </div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-56 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1 z-50"
                align="start"
                sideOffset={5}
              >
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Projects
                </div>
                {projects.map((project) => (
                  <DropdownMenu.Item
                    key={project.id}
                    className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white font-semibold text-xs mr-3">
                      {project.id.slice(-3).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-gray-400">{project.id}</div>
                    </div>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                <DropdownMenu.Item className="flex items-center px-2 py-2 text-sm text-blue-400 hover:bg-gray-700 rounded cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group outline-none",
                isCollapsed ? "justify-center" : "",
                activeSection === item.id && !isCollapsed
                  ? "bg-blue-500/10 border border-blue-500/30 shadow text-blue-400 font-semibold"
                  : ""
              )}
              title={item.label}
              aria-current={activeSection === item.id ? "page" : undefined}
              tabIndex={0}
            >
              <span
                className={cn(
                  "flex items-center justify-center transition-all duration-200",
                  isCollapsed
                    ? activeSection === item.id
                      ? "bg-blue-500 text-white rounded-full p-2 shadow-lg scale-110"
                      : "text-gray-300 group-hover:bg-gray-800 group-hover:text-white rounded-full p-2"
                    : activeSection === item.id
                    ? "text-blue-400"
                    : "group-hover:text-white"
                )}
              >
                CloudBox
              </span>
              {!isCollapsed && (
                <span
                  className={cn(
                    "ml-3",
                    activeSection === item.id
                      ? "text-blue-400 font-semibold"
                      : ""
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                "w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors",
                isCollapsed && "justify-center"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-56 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1 z-50"
              align={isCollapsed ? "center" : "start"}
              side={isCollapsed ? "right" : "top"}
              sideOffset={8}
            >
              <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold text-gray-100">
                My Account
              </DropdownMenu.Label>
              <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
              <DropdownMenu.Item 
                className="flex items-center px-2 py-1.5 text-sm text-red-400 hover:bg-red-900/20 rounded cursor-pointer"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Sidebar;
