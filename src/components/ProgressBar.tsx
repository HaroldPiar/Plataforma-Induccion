import { Progress } from "./ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{label || "Progreso"}</span>
        <span className="font-medium">
          {current} de {total}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
