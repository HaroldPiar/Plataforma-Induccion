import { useState } from "react";
import { TrainingCard } from "./components/TrainingCard";
import { AvatarPlayer } from "./components/AvatarPlayer";
import { SlideViewer } from "./components/SlideViewer";
import { QuizQuestion } from "./components/QuizQuestion";
import { ProgressBar } from "./components/ProgressBar";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { GoogleGenAI } from "@google/genai";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Home,
  Award
} from "lucide-react";
import ChatInput from "./components/ChatInput";

const slides = [
  {
    "title": "Bienvenida al Departamento de TICs",
    "subtitle": "Tu integración a Laproff empieza aquí.",
    "content": "En el Departamento de TICs somos responsables de apoyar y fortalecer todos los sistemas de información de Laboratorios Laproff. Esta capacitación te brindará una visión clara de nuestra cultura tecnológica, nuestros procesos y cómo trabajamos para garantizar que la empresa funcione sin interrupciones.",
    "imageUrl": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
  },
  {
    "title": "Nuestro Objetivo",
    "subtitle": "Tecnología confiable para una empresa en crecimiento.",
    "content": "Nuestra misión es garantizar la continuidad y seguridad de los sistemas corporativos apoyándonos en tres pilares esenciales: Integridad — aseguramos que la información sea precisa; Confidencialidad — protegemos la información sensible; y Disponibilidad — garantizamos acceso a los sistemas 24/7.",
    "imageUrl": "https://images.unsplash.com/photo-1535223289827-42f1e9919769"
  },
  {
    "title": "Áreas de Trabajo en TICs",
    "subtitle": "Dos áreas, un mismo propósito.",
    "content": "El Departamento de TICs está dividido en dos áreas principales: Soporte Técnico, encargado de la infraestructura, mantenimiento y operatividad; y Desarrollo de Software, donde se crean soluciones tecnológicas que impulsan la eficiencia y automatización dentro de la organización.",
    "imageUrl": "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
  },
  {
    "title": "Área de Soporte Técnico",
    "subtitle": "Tu aliado para mantener la operación estable y segura.",
    "content": "El equipo de Soporte Técnico garantiza la disponibilidad de los recursos tecnológicos a través de servicios como copias de seguridad, control de accesos, monitoreo de CCTV, mantenimiento de equipos e instalaciones de sistemas. Su trabajo asegura que toda la compañía funcione sin interrupciones.",
    "imageUrl": "https://images.unsplash.com/photo-1642522029693-20b2ab875b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2MzA0NTQzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  {
    "title": "Área de Desarrollo de Software",
    "subtitle": "Innovación que impulsa la transformación digital.",
    "content": "Desde esta área se desarrollan aplicaciones móviles, plataformas internas, automatizaciones RPA, gestión de bases de datos y software empresarial. Cada proyecto busca transformar procesos internos y ofrecer herramientas que optimicen el trabajo en todas las áreas de Laproff.",
    "imageUrl": "https://images.unsplash.com/photo-1535223289827-42f1e9919769"
  },
  {
    "title": "Transformación Digital en Laproff",
    "subtitle": "Tecnologías que marcan nuestro futuro.",
    "content": "En Laproff avanzamos hacia soluciones que integran Inteligencia Artificial, Machine Learning y el Internet de las Cosas. Estas tecnologías fortalecen la toma de decisiones, permiten monitoreo en tiempo real y mejoran nuestros procesos internos para elevar los estándares de la compañía.",
    "imageUrl" : "https://images.unsplash.com/photo-1642522029693-20b2ab875b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2MzA0NTQzMXww&ixlib=rb-4.1.0&q=80&w=1080",
},
  {
    "title": "Políticas de Seguridad Informática",
    "subtitle": "Uso responsable de los recursos tecnológicos.",
    "content": "Las políticas de seguridad TIC-P005 definen las reglas para el uso adecuado de la red y los sistemas. Su objetivo es proteger la información corporativa mediante buenas prácticas que reduzcan riesgos y aseguren que cada colaborador actúe de forma responsable y segura.",
  },
  {
    "title": "Responsabilidades de los Usuarios",
    "subtitle": "Tu papel en la seguridad de la información.",
    "content": "Todos los colaboradores deben cumplir las políticas, proteger sus credenciales, reportar incidentes sospechosos, usar los recursos únicamente para fines laborales y solicitar autorización antes de instalar software o conectar dispositivos. La seguridad es una responsabilidad compartida.",
    "imageUrl": "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957"
  },
  {
    "title": "SERVERNAS – Carpeta Pública",
    "subtitle": "Uso adecuado del almacenamiento compartido.",
    "content": "El servidor de archivos incluye una carpeta llamada 'Pública', accesible para todos los usuarios. Debe utilizarse únicamente para documentos no confidenciales y de uso general. Evita almacenar allí información sensible o interna. Su uso responsable protege a la compañía.",
    "imageUrl": "https://images.unsplash.com/photo-1535223289827-42f1e9919769"
  },
  {
    "title": "Herramientas a tu Disposición",
    "subtitle": "Plataformas para tu trabajo diario.",
    "content": "Laproff Web te permite gestionar certificados, permisos, comprobantes de pago, noticias corporativas y el directorio interno. Además, contamos con un sistema de identificación biométrica en puntos clave como la portería, restaurante, planta y empaque para garantizar seguridad y control.",
    "imageUrl": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
  },
  {
    "title": "¿Necesitas Ayuda?",
    "subtitle": "Estamos aquí para apoyarte.",
    "content": "El Departamento de TICs te acompaña en cada paso. Puedes contactarnos por correo, extensiones internas o a través de la Mesa de Ayuda para registrar tickets y recibir soporte. Bienvenido al equipo Laproff: juntos impulsamos la innovación y el futuro tecnológico de la compañía.",
  }
]

const quizQuestions = [

  {
    question: "¿Cuál es el procedimiento que vela por la seguridad informática en Laboratorios Laproff?",
    options: [
      "TIC-P006 SEGURIDAD DE LA RED CORPORATIVA",
      "TIC-P005 POLITICAS DE SEGURIDAD PARA LA RED INFORMATICA",
      "TIC-P003 ELABORACION DE RESPALDO DE DATOS",
      "TIC-P010 PRESTAMO DE EQUIPOS DE COMPUTO"
    ],
    correctAnswer: "TIC-P005 POLITICAS DE SEGURIDAD PARA LA RED INFORMATICA"
  },
  {
    question: "¿Cómo se llama la carpeta a la que cualquier usuario de Laproff puede acceder?",
    options: [
      "General",
      "Publica",
      "Usuarios"
    ],
    correctAnswer: "Publica"
  },
  {
    question: "¿La plataforma donde los colaboradores pueden solicitar los permisos laborales y de estudio es Laproff Web?",
    options: [
      "Verdadero",
      "Falso"
    ],
    correctAnswer: "Verdadero"
  }

]

type Screen = "home" | "training" | "quiz" | "results";

const genAI = new GoogleGenAI({apiKey: "AIzaSyDTYEoSIWbeDuJ-IwqDNKBezeF6Sqa6kqk"});

async function aiChat(context: string) {
  
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: context,
  });
  return response.text;

}

const trainingContext = slides.map(s => 
  `Título: ${s.title}\nContenido: ${s.content}`
).join("\n\n");

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  // Calcular resultados del quiz
  const calculateResults = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quizQuestions.length,
      passed: correct >= 3
    };
  };

  // Esta función se ejecutará cuando el usuario haga clic en "Enviar" dentro del ChatInput
  const handleUserQuestion = async (message: string) => {
    try {
      
      const prompt = `
      Eres un asistente experto de capacitación de Laboratorios Laproff. 
      Tu objetivo es responder dudas sobre la inducción al departamento de TICs basándote EXCLUSIVAMENTE en la siguiente información:

      --- INICIO DE INFORMACIÓN DE CAPACITACIÓN ---
      ${trainingContext}
      --- FIN DE INFORMACIÓN DE CAPACITACIÓN ---

      Instrucciones adicionales:
      - Responde de forma amable y profesional.
      - Si el usuario te pregunta algo que NO está en la información anterior, responde educadamente que esa información no está disponible en esta capacitación y sugiérele contactar a la Mesa de Ayuda.
      - Tus respuestas deben ser breves y directas.

      Pregunta del usuario: ${message}
    `;

      // 1. Llamamos a la API de Gemini
      const text = await aiChat(prompt);

      // 2. Mostramos el resultado en un alert como pediste para el ensayo
      alert(`IA dice: ${text}`);

    } catch (error) {
      console.error("Error con la IA:", error);
      alert("Hubo un error al conectar con el chatbot.");
    }
  };

  // Pantalla de Inicio
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Award className="size-7 text-white" />
              </div>
              <h1 className="text-blue-900">Inducción Corporativa</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selecciona una inducción para comenzar tu proceso de aprendizaje
            </p>
          </div>

          {/* Training Card */}
          <div className="max-w-2xl mx-auto">
            <TrainingCard
              title="Inducción Corporativa Departamento de TICs"
              description="Programa completo de Inducción Corporativa Departamento de TICs. Aprende sobre nuestros objetivos, valores, cultura organizacional, políticas y procedimientos. Duración aproximada: 30 minutos."
              imageUrl="https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MzE0MDg5OHww&ixlib=rb-4.1.0&q=80&w=1080"
              onStart={() => {
                setCurrentScreen("training");
                setCurrentSlide(0);
              }}
            />
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle2 className="size-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Contenido Interactivo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Aprende con avatares de IA que presentan cada módulo de forma dinámica
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-indigo-100">
              <CardHeader>
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                  <Award className="size-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Evaluación Final</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Demuestra lo aprendido con una evaluación al final del curso
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle2 className="size-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Certificado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Obtén tu certificado de finalización al completar exitosamente
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de Capacitación (Player)
  if (currentScreen === "training") {
    const slide = slides[currentSlide];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header con progreso */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentScreen("home")}
                >
                  <Home className="size-4 mr-2" />
                  Inicio
                </Button>
                <Badge variant="secondary" className="text-sm">
                  Inducción TICs
                </Badge>
              </div>

            </div>
            <ProgressBar current={currentSlide + 1} total={slides.length} />
          </div>

          {/* Main Player Layout */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Avatar Player  + Chatbot*/}
            <div className="flex flex-col gap-4">
              <AvatarPlayer 
                isPlaying={true} 
                subtitle={slide.subtitle}
              />              
              <ChatInput onSendMessage={handleUserQuestion} />
            </div>

            {/* Slide Viewer */}
            <div>
              <SlideViewer
                title={slide.title}
                content={slide.content}
                imageUrl={slide.imageUrl}
              />

            </div>
          </div>

          {/* Controles de navegación */}
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                size="lg"
              >
                <ChevronLeft className="size-5 mr-2" />
                Anterior
              </Button>

              <div className="flex-1 text-center">
                <p className="text-sm text-gray-600">
                  {currentSlide === slides.length - 1 
                    ? "Última diapositiva - Continúa a la evaluación" 
                    : "Navega entre las diapositivas"}
                </p>
              </div>

              {currentSlide < slides.length - 1 ? (
                <Button
                  onClick={() => setCurrentSlide(currentSlide + 1)}
                  size="lg"
                >
                  Siguiente
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentScreen("quiz")}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Ir a Evaluación
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Evaluación
  if (currentScreen === "quiz") {
    const allAnswered = Object.keys(quizAnswers).length === quizQuestions.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <CheckCircle2 className="size-8 text-white" />
            </div>
            <h1 className="mb-2 text-blue-900">Evaluación de la Capacitación</h1>
            <p className="text-gray-600">
              Responde las siguientes preguntas para completar tu capacitación
            </p>
          </div>

          {/* Preguntas */}
          <div className="space-y-6 mb-8">
            {quizQuestions.map((q, index) => (
              <QuizQuestion
                key={index}
                questionNumber={index + 1}
                question={q.question}
                options={q.options}
                selectedAnswer={quizAnswers[index] || null}
                onSelectAnswer={(value) => {
                  setQuizAnswers({ ...quizAnswers, [index]: value });
                }}
              />
            ))}
          </div>

          {/* Botón de enviar */}
          <Card className="p-6 bg-white border-2 border-blue-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  {allAnswered 
                    ? "Has respondido todas las preguntas. Puedes enviar tu evaluación." 
                    : `Faltan ${quizQuestions.length - Object.keys(quizAnswers).length} pregunta(s) por responder`}
                </p>
              </div>
              <Button
                onClick={() => setCurrentScreen("results")}
                disabled={!allAnswered}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                Enviar Respuestas
                <CheckCircle2 className="size-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Resultados
  if (currentScreen === "results") {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="border-4 border-blue-200 shadow-2xl overflow-hidden">
            {/* Header con color según resultado */}
            <div className={`p-8 text-center ${
              results.passed 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-orange-500 to-red-600'
            }`}>
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                {results.passed ? (
                  <CheckCircle2 className="size-12 text-white" />
                ) : (
                  <XCircle className="size-12 text-white" />
                )}
              </div>
              <h1 className="text-white mb-2">
                {results.passed ? "¡Felicitaciones!" : "Resultado de Evaluación"}
              </h1>
              <p className="text-white/90 text-xl">
                {results.passed 
                  ? "Has aprobado la capacitación" 
                  : "Necesitas volver a intentarlo"}
              </p>
            </div>

            {/* Contenido */}
            <CardContent className="p-8 space-y-6">
              {/* Puntaje */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Tu Puntaje</p>
                <p className="text-5xl text-blue-900 mb-2">
                  {results.correct}/{results.total}
                </p>
                <p className="text-gray-600">
                  {Math.round((results.correct / results.total) * 100)}% de respuestas correctas
                </p>
              </div>

              {/* Mensaje motivacional */}
              <div className="text-center space-y-3">
                {results.passed ? (
                  <>
                    <p className="text-gray-700">
                      Has demostrado un excelente conocimiento de los contenidos de la capacitación.
                      Estás listo para aplicar lo aprendido en tu día a día.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                      <Award className="size-5" />
                      <span>Capacitación Completada</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700">
                      Te recomendamos revisar el material nuevamente y volver a realizar la evaluación.
                      Necesitas al menos 3 respuestas correctas para aprobar.
                    </p>
                  </>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                {results.passed ? (
                  <>
                    <Button
                      onClick={() => {
                        setCurrentScreen("home");
                        setCurrentSlide(0);
                        setQuizAnswers({});
                      }}
                      className="flex-1"
                      size="lg"
                    >
                      <Home className="size-5 mr-2" />
                      Finalizar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setCurrentScreen("training");
                        setCurrentSlide(0);
                        setQuizAnswers({});
                      }}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Revisar Material
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentScreen("quiz");
                        setQuizAnswers({});
                      }}
                      className="flex-1"
                      size="lg"
                    >
                      Reintentar Evaluación
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
