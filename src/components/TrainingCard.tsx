import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookOpen } from "lucide-react";

interface TrainingCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onStart: () => void;
}

export function TrainingCard({ title, description, imageUrl, onStart }: TrainingCardProps) {
  return (
    <Card className="overflow-hidden border-2 hover:border-blue-500 transition-colors">
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
          <BookOpen className="size-6 text-blue-600" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onStart} className="w-full" size="lg">
          Iniciar Capacitación
        </Button>
      </CardContent>
    </Card>
  );
}
