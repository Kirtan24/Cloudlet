import React, { useState, useRef } from "react";
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Copy,
  Download,
  Trash2,
  Share,
  Edit,
  Image,
  Video,
  FileText,
  Eye,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";

interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  size: string;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
  dimensions?: string;
}

interface AssetsViewProps {
  filterType?: "image" | "video" | "document" | "all";
}

const AssetsView: React.FC<AssetsViewProps> = ({ filterType = "all" }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allAssets: Asset[] = [
    {
      id: "1",
      name: "product-hero.jpg",
      type: "image",
      size: "2.4 MB",
      url: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
      thumbnail:
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      uploadedAt: "2 hours ago",
      dimensions: "1920x1080",
    },
    {
      id: "2",
      name: "demo-video.mp4",
      type: "video",
      size: "15.2 MB",
      url: "https://example.com/video.mp4",
      thumbnail:
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      uploadedAt: "5 hours ago",
      dimensions: "1920x1080",
    },
    {
      id: "3",
      name: "user-guide.pdf",
      type: "document",
      size: "1.8 MB",
      url: "https://example.com/document.pdf",
      uploadedAt: "1 day ago",
    },
    {
      id: "4",
      name: "banner-design.png",
      type: "image",
      size: "3.1 MB",
      url: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
      thumbnail:
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      uploadedAt: "2 days ago",
      dimensions: "1920x1080",
    },
    {
      id: "5",
      name: "team-photo.jpg",
      type: "image",
      size: "4.2 MB",
      url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      thumbnail:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      uploadedAt: "3 days ago",
      dimensions: "1920x1080",
    },
    {
      id: "6",
      name: "presentation.pptx",
      type: "document",
      size: "5.7 MB",
      url: "https://example.com/presentation.pptx",
      uploadedAt: "1 week ago",
    },
    {
      id: "7",
      name: "tutorial-video.mp4",
      type: "video",
      size: "25.1 MB",
      url: "https://example.com/tutorial.mp4",
      thumbnail:
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      uploadedAt: "3 days ago",
      dimensions: "1920x1080",
    },
  ];

  // Filter assets based on type
  const assets =
    filterType === "all"
      ? allAssets
      : allAssets.filter((asset) => asset.type === filterType);

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return Image;
      case "video":
        return Video;
      case "document":
        return FileText;
      default:
        return FileText;
    }
  };

  const getPageTitle = () => {
    switch (filterType) {
      case "image":
        return "Images";
      case "video":
        return "Videos";
      case "document":
        return "Documents";
      default:
        return "Assets";
    }
  };

  const handleAssetSelect = (assetId: string) => {
    setSelectedAssets((prev) =>
      prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleDeleteSelected = () => {
    setSelectedAssets([]);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log("Files selected:", files);
      // Handle file upload logic here
      setUploadDialogOpen(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files) {
      console.log("Files dropped:", files);
      // Handle file upload logic here
      setUploadDialogOpen(false);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{getPageTitle()}</h1>
          <p className="text-gray-400 mt-1">
            Manage and organize your{" "}
            {filterType === "all" ? "media files" : filterType + "s"}
          </p>
        </div>
        <Button
          onClick={() => setUploadDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${
                filterType === "all" ? "assets" : filterType + "s"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {selectedAssets.length > 0 && (
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-gray-400">
                {selectedAssets.length} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`border-gray-700 ${
              viewMode === "grid" ? "bg-gray-800 text-white" : "text-gray-400"
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`border-gray-700 ${
              viewMode === "list" ? "bg-gray-800 text-white" : "text-gray-400"
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Assets Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => {
            const IconComponent = getAssetIcon(asset.type);
            const isSelected = selectedAssets.includes(asset.id);

            return (
              <div
                key={asset.id}
                className={`group relative bg-gray-900 rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/20"
                    : "border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => handleAssetSelect(asset.id)}
              >
                {/* Thumbnail */}
                <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-800 relative">
                  {asset.thumbnail ? (
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <IconComponent className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(asset.url);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300 opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* More Actions */}
                  <div className="absolute top-2 right-2">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content className="w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1 z-50">
                          <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy URL
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Replace
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                          <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-red-400 hover:bg-red-900/20 rounded cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>
                </div>

                {/* Asset Info */}
                <div className="p-3">
                  <p className="font-medium text-white text-sm truncate">
                    {asset.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs capitalize border-gray-700 text-gray-300"
                    >
                      {asset.type}
                    </Badge>
                    <span className="text-xs text-gray-400">{asset.size}</span>
                  </div>
                  {asset.dimensions && (
                    <p className="text-xs text-gray-400 mt-1">
                      {asset.dimensions}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {asset.uploadedAt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="text-left p-4 font-medium text-white">Name</th>
                  <th className="text-left p-4 font-medium text-white">Type</th>
                  <th className="text-left p-4 font-medium text-white">Size</th>
                  <th className="text-left p-4 font-medium text-white">
                    Uploaded
                  </th>
                  <th className="text-left p-4 font-medium text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => {
                  const IconComponent = getAssetIcon(asset.type);
                  const isSelected = selectedAssets.includes(asset.id);

                  return (
                    <tr
                      key={asset.id}
                      className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                        isSelected ? "bg-blue-900/20" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "bg-transparent border-gray-600"
                            }`}
                            onClick={() => handleAssetSelect(asset.id)}
                          >
                            {isSelected && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                            {asset.thumbnail ? (
                              <img
                                src={asset.thumbnail}
                                alt={asset.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <IconComponent className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium text-white">
                            {asset.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className="capitalize border-gray-700 text-gray-300"
                        >
                          {asset.type}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-400">{asset.size}</td>
                      <td className="p-4 text-gray-400">{asset.uploadedAt}</td>
                      <td className="p-4">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content className="w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1 z-50">
                              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                                <Copy className="h-4 w-4 mr-2" />
                                Copy URL
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Replace
                              </DropdownMenu.Item>
                              <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                              <DropdownMenu.Item className="flex items-center px-2 py-1.5 text-sm text-red-400 hover:bg-red-900/20 rounded cursor-pointer">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog.Root open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg p-6 w-full max-w-md z-50 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold text-white">
                Upload {getPageTitle()}
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports{" "}
                {filterType === "all"
                  ? "images, videos, and documents"
                  : filterType + "s"}{" "}
                up to 50MB
              </p>
              <Button
                onClick={handleFileSelect}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={
                  filterType === "image"
                    ? "image/*"
                    : filterType === "video"
                    ? "video/*"
                    : filterType === "document"
                    ? ".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                    : "image/*,video/*,.pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                }
                onChange={handleFileChange}
                className="hidden"
              />
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
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default AssetsView;
