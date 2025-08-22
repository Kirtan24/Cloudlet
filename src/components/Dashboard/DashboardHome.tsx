import React from "react";
import {
  Upload,
  Image,
  Video,
  FileText,
  TrendingUp,
  Zap,
  Globe,
  Database,
  ArrowUpRight,
  Star,
  Key,
  Plus,
  Copy,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface DashboardHomeProps {
  onSectionChange: (section: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onSectionChange }) => {
  const stats = [
    {
      title: "Total Assets",
      value: "1,247",
      change: "+12%",
      icon: Database,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Storage Used",
      value: "166.32 MB",
      change: "+5.2%",
      icon: Globe,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Bandwidth",
      value: "2.66 MB",
      change: "+8.1%",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Transformations",
      value: "8",
      change: "+2",
      icon: Zap,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentAssets = [
    {
      id: 1,
      name: "product-hero.jpg",
      type: "image",
      size: "2.4 MB",
      uploaded: "2 hours ago",
      thumbnail:
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    },
    {
      id: 2,
      name: "demo-video.mp4",
      type: "video",
      size: "15.2 MB",
      uploaded: "5 hours ago",
      thumbnail:
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    },
    {
      id: 3,
      name: "user-guide.pdf",
      type: "document",
      size: "1.8 MB",
      uploaded: "1 day ago",
      thumbnail: null,
    },
    {
      id: 4,
      name: "banner-design.png",
      type: "image",
      size: "3.1 MB",
      uploaded: "2 days ago",
      thumbnail:
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    },
  ];

  const projects = [
    {
      id: "proj_abc123",
      name: "My First Project",
      assets: 45,
      created: "2 days ago",
    },
    {
      id: "proj_def456",
      name: "E-commerce Site",
      assets: 128,
      created: "1 week ago",
    },
    {
      id: "proj_ghi789",
      name: "Blog Platform",
      assets: 67,
      created: "2 weeks ago",
    },
  ];

  const apiKeys = [
    {
      id: "key_123",
      name: "Production Key",
      project: "My First Project",
      lastUsed: "2 hours ago",
    },
    {
      id: "key_456",
      name: "Development Key",
      project: "E-commerce Site",
      lastUsed: "1 day ago",
    },
  ];

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

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Here's what's happening with your media assets today.
          </p>
        </div>
        <Button
          onClick={() => onSectionChange("assets")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Assets
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400 font-medium">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span>Projects</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Project
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                      {project.id.slice(-3).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{project.name}</p>
                      <p className="text-sm text-gray-400">
                        {project.assets} assets • {project.created}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span>API Keys</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange("api-keys")}
                className="text-blue-400 hover:text-blue-300"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Key
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Key className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{apiKey.name}</p>
                      <p className="text-sm text-gray-400">
                        {apiKey.project} • {apiKey.lastUsed}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span>Usage Overview</span>
            <Badge
              variant="secondary"
              className="bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              <Star className="h-3 w-3 mr-1" />
              Free Plan
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Credits used this month
              </span>
              <span className="text-2xl font-bold text-white">0.17 / 25</span>
            </div>
            <Progress value={0.68} className="h-2" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">0.68% used</p>
              <Button
                variant="outline"
                className="border-2 border-blue-500/40 text-blue-400 font-semibold rounded-lg px-6 py-2 bg-white/5 hover:bg-blue-500/10 shadow-sm transition"
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Assets */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span>Recent Uploads</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange("assets")}
              className="text-blue-400 hover:text-blue-300"
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssets.map((asset) => {
              const IconComponent = getAssetIcon(asset.type);
              return (
                <div
                  key={asset.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    {asset.thumbnail ? (
                      <img
                        src={asset.thumbnail}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <IconComponent className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{asset.name}</p>
                    <p className="text-sm text-gray-400">
                      {asset.size} • {asset.uploaded}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="capitalize border-gray-700 text-gray-300"
                  >
                    {asset.type}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
