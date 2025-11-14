import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface QuizQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (value: string) => void;
}

export function QuizQuestion({
  questionNumber,
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  return (
    <Card className="border-2 border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-lg">
          Pregunta {questionNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-gray-800">{question}</p>
        <RadioGroup value={selectedAnswer || ""} onValueChange={onSelectAnswer}>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                <RadioGroupItem value={option} id={`q${questionNumber}-${index}`} />
                <Label
                  htmlFor={`q${questionNumber}-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
