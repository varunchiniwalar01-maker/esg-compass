import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FolderOpen, 
  FileText, 
  Image, 
  File,
  Download,
  Trash2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  category: "environmental" | "social" | "governance" | "other";
  type: "policy" | "certificate" | "bill" | "other";
  uploadedAt: string;
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "POSH_Policy_2024.pdf",
    category: "social",
    type: "policy",
    uploadedAt: "2025-01-15",
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Electricity_Bill_Dec2024.pdf",
    category: "environmental",
    type: "bill",
    uploadedAt: "2025-01-10",
    size: "245 KB",
  },
  {
    id: "3",
    name: "Code_of_Conduct.pdf",
    category: "governance",
    type: "policy",
    uploadedAt: "2025-01-05",
    size: "890 KB",
  },
  {
    id: "4",
    name: "ISO_14001_Certificate.pdf",
    category: "environmental",
    type: "certificate",
    uploadedAt: "2024-12-20",
    size: "156 KB",
  },
  {
    id: "5",
    name: "Data_Privacy_Policy.pdf",
    category: "governance",
    type: "policy",
    uploadedAt: "2024-12-15",
    size: "456 KB",
  },
];

const categoryLabels = {
  environmental: "Environmental",
  social: "Social",
  governance: "Governance",
  other: "Other",
};

const typeLabels = {
  policy: "Policy",
  certificate: "Certificate",
  bill: "Utility Bill",
  other: "Other",
};

const typeIcons = {
  policy: FileText,
  certificate: File,
  bill: FileText,
  other: File,
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const documentsByCategory = {
    environmental: documents.filter(d => d.category === "environmental").length,
    social: documents.filter(d => d.category === "social").length,
    governance: documents.filter(d => d.category === "governance").length,
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Storage</h1>
          <p className="text-muted-foreground">
            Store and organize your ESG evidence
          </p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your file here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  PDF, DOC, DOCX, PNG, JPG up to 10MB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="bill">Utility Bill</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{documents.length}</div>
                <div className="text-sm text-muted-foreground">Total Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/20">
                <FileText className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{documentsByCategory.environmental}</div>
                <div className="text-sm text-muted-foreground">Environmental</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
                <FileText className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{documentsByCategory.social}</div>
                <div className="text-sm text-muted-foreground">Social</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                <FileText className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{documentsByCategory.governance}</div>
                <div className="text-sm text-muted-foreground">Governance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <Card className="border-border">
        <CardContent className="p-0">
          {filteredDocuments.length === 0 ? (
            <div className="py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents found</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredDocuments.map((doc) => {
                const Icon = typeIcons[doc.type];
                return (
                  <div 
                    key={doc.id}
                    className="flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{categoryLabels[doc.category]}</span>
                        <span>•</span>
                        <span>{typeLabels[doc.type]}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground hidden sm:block">
                      {new Date(doc.uploadedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
