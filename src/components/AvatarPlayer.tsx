import { Play, Volume2 } from "lucide-react";
import { Card } from "./ui/card";

interface AvatarPlayerProps {
  isPlaying?: boolean;
  subtitle?: string;
}

export function AvatarPlayer({ isPlaying = true, subtitle }: AvatarPlayerProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="relative aspect-video flex items-center justify-center bg-black/20">
        {/* Simulación de video de avatar */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Avatar placeholder - en producción sería un video real */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-white/20 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                {isPlaying ? (
                  <Volume2 className="size-8 text-white animate-pulse" />
                ) : (
                  <Play className="size-8 text-white" />
                )}
              </div>
            </div>
            <div className="text-white/90 text-center px-4">
              <p className="text-sm">Avatar de IA Presentando</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Subtítulos */}
      {subtitle && (
        <div className="bg-black/80 text-white text-center py-3 px-4">
          <p className="text-sm">{subtitle}</p>
        </div>
      )}
      
      <div className="p-3 bg-white border-t">
        <p className="text-xs text-gray-600 text-center">
          Avatar presentando esta diapositiva
        </p>
      </div>
    </Card>
  );
}
