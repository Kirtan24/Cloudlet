import React, { useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, title: "New API key created", time: "2 minutes ago", read: false },
    {
      id: 2,
      title: "Asset uploaded successfully",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, title: "Project limit reached", time: "2 hours ago", read: true },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assets, projects, or API keys..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="flex items-center space-x-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-80 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-0 z-50"
              align="end"
              sideOffset={8}
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Notifications</h3>
                <p className="text-sm text-gray-400">
                  {unreadCount} unread notifications
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 cursor-pointer",
                      !notification.read && "bg-blue-900/10"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full text-blue-400 hover:text-blue-300"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* User Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block">{user?.name}</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-56 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1 z-50"
              align="end"
              sideOffset={8}
            >
              <div className="px-2 py-1.5 text-sm text-gray-400">
                Signed in as <span className="text-white">{user?.email}</span>
              </div>
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
    </header>
  );
};

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default Header;
