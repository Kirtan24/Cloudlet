import React, { useState } from "react";
import {
  Plus,
  Key,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  projectId: string;
  projectName: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string;
  isVisible: boolean;
}

const ApiKeysView: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key_123",
      name: "Production Key",
      key: "ck_live_1234567890abcdef1234567890abcdef",
      projectId: "proj_abc123",
      projectName: "My First Project",
      permissions: ["read", "write", "delete"],
      createdAt: "2024-01-15",
      lastUsed: "2 hours ago",
      isVisible: false,
    },
    {
      id: "key_456",
      name: "Development Key",
      key: "ck_test_abcdef1234567890abcdef1234567890",
      projectId: "proj_def456",
      projectName: "E-commerce Site",
      permissions: ["read", "write"],
      createdAt: "2024-01-10",
      lastUsed: "1 day ago",
      isVisible: false,
    },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "read",
  ]);
  const [keyDescription, setKeyDescription] = useState("");

  const projects = [
    { id: "proj_abc123", name: "My First Project" },
    { id: "proj_def456", name: "E-commerce Site" },
    { id: "proj_ghi789", name: "Blog Platform" },
  ];

  const permissions = [
    { id: "read", label: "Read", description: "View assets and metadata" },
    { id: "write", label: "Write", description: "Upload and modify assets" },
    { id: "delete", label: "Delete", description: "Delete assets and folders" },
    { id: "admin", label: "Admin", description: "Full project access" },
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setApiKeys((prev) =>
      prev.map((key) =>
        key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
      )
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCreateKey = () => {
    if (!newKeyName || !selectedProject) return;

    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `ck_${
        selectedProject.includes("test") ? "test" : "live"
      }_${Math.random().toString(36).substring(2, 34)}`,
      projectId: selectedProject,
      projectName: projects.find((p) => p.id === selectedProject)?.name || "",
      permissions: selectedPermissions,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      isVisible: false,
    };

    setApiKeys((prev) => [...prev, newKey]);
    setCreateDialogOpen(false);
    setNewKeyName("");
    setSelectedProject("");
    setSelectedPermissions(["read"]);
    setKeyDescription("");
  };

  const deleteKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId));
  };

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission) {
      case "read":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "write":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "delete":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "admin":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400 mt-1">
            Manage your API keys and access tokens
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{apiKey.name}</CardTitle>
                    <p className="text-sm text-gray-400">
                      {apiKey.projectName} • Created {apiKey.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteKey(apiKey.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* API Key */}
                <div>
                  <Label className="text-sm font-medium text-gray-300">
                    API Key
                  </Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-800 rounded-lg p-3 font-mono text-sm">
                      <span className="text-gray-300">
                        {apiKey.isVisible ? apiKey.key : "•".repeat(40)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      {apiKey.isVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <Label className="text-sm font-medium text-gray-300">
                    Permissions
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {apiKey.permissions.map((permission) => (
                      <Badge
                        key={permission}
                        variant="outline"
                        className={`capitalize ${getPermissionBadgeColor(
                          permission
                        )}`}
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Usage Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">
                      Last used:{" "}
                      <span className="text-gray-300">{apiKey.lastUsed}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Shield className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {apiKeys.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-12 text-center">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No API Keys
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first API key to start using the CloudBox API
            </p>
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create API Key Dialog */}
      <Dialog.Root open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg p-6 w-full max-w-md z-50 border border-gray-800">
            <Dialog.Title className="text-lg font-semibold text-white mb-6">
              Create New API Key
            </Dialog.Title>

            <div className="space-y-4">
              {/* Key Name */}
              <div>
                <Label
                  htmlFor="keyName"
                  className="text-sm font-medium text-gray-300"
                >
                  Key Name *
                </Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production Key"
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Project Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-300">
                  Project *
                </Label>
                <Select.Root
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <Select.Trigger className="w-full mt-1 flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                    <Select.Value placeholder="Select a project" />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                      <Select.Viewport className="p-1">
                        {projects.map((project) => (
                          <Select.Item
                            key={project.id}
                            value={project.id}
                            className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                          >
                            <Select.ItemText>{project.name}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Permissions */}
              <div>
                <Label className="text-sm font-medium text-gray-300">
                  Permissions
                </Label>
                <div className="mt-2 space-y-2">
                  {permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-start space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPermissions((prev) => [
                              ...prev,
                              permission.id,
                            ]);
                          } else {
                            setSelectedPermissions((prev) =>
                              prev.filter((p) => p !== permission.id)
                            );
                          }
                        }}
                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-300">
                          {permission.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-300"
                >
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  value={keyDescription}
                  onChange={(e) => setKeyDescription(e.target.value)}
                  placeholder="Describe what this API key will be used for..."
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              {/* Warning */}
              <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-yellow-400 font-medium">Important</p>
                  <p className="text-yellow-300 mt-1">
                    Make sure to copy your API key now. You won't be able to see
                    it again!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Dialog.Close asChild>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleCreateKey}
                disabled={!newKeyName || !selectedProject}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Create API Key
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ApiKeysView;
