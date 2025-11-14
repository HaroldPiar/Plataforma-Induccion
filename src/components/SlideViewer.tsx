import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SlideViewerProps {
  title: string;
  content: string;
  imageUrl?: string;
}

export function SlideViewer({ title, content, imageUrl }: SlideViewerProps) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {imageUrl && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
