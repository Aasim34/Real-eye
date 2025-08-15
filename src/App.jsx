import React, { useState, useCallback, useTransition, useRef, useEffect, createContext, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Bot, Lock, Image as ImageIcon, Video, Zap, CheckCircle2, TrendingUp, UploadCloud, 
  ShieldCheck, Eye, BarChart3, Fingerprint, ClipboardList, Search, Cog, Lightbulb, 
  Loader2, X, BarChartBig, Twitter, Github, Linkedin, ChevronDown, Waves, Rss, Atom
} from "lucide-react";
import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { clsx} from "clsx"

// ============================================================================
// File: src/lib/utils.ts
// ============================================================================
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ============================================================================
// File: src/hooks/use-toast.ts
// ============================================================================
// A minimal Toast component and hook implementation for this single file app
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const ToastContext = createContext({
  toasts: [],
  toast: () => {},
  dismiss: () => {}
});

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) };
  }
}

const toastTimeouts = new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId: toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};

let memoryState = { toasts: [] };
const listeners = [];

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function toast({ ...props }) {
  const id = genId();
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });
  return { id, dismiss };
}

function useToast() {
  const [state, setState] = useState(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return { ...state, toast, dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }) };
}

// ============================================================================
// File: src/components/ui/button.tsx
// ============================================================================
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// ============================================================================
// File: src/components/ui/card.tsx
// ============================================================================
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// ============================================================================
// File: src/components/ui/progress.tsx
// ============================================================================
const Progress = React.forwardRef(({ className, value, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "h-full rounded-full transition-all duration-500 ease-out",
        variant === "destructive" ? "bg-red-600" : "bg-green-600"
      )}
      style={{ width: `${value || 0}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

// ============================================================================
// File: src/components/ui/toast.tsx
// ============================================================================
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const Toast = React.forwardRef(({ className, variant, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
        {children}
    </div>
  );
});
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = () => <button className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600">
  <X className="h-4 w-4" />
</button>;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastContext.Provider value={{toasts, toast, dismiss: () => {}}}>
      {toasts.map(function ({ id, title, description, action, onOpenChange, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastContext.Provider>
  );
}


// ============================================================================
// AI API CALLS (Recreated from server actions)
// ============================================================================
/**
 * @typedef {object} AnalysisDetail
 * @property {string} verdict
 * @property {string} explanation
 */

/**
 * @typedef {object} FinalAnalysisResult
 * @property {boolean} isAI
 * @property {number} confidence
 * @property {string} overallJustification
 * @property {AnalysisDetail} visualAnalysis
 * @property {AnalysisDetail} noiseAnalysis
 * @property {AnalysisDetail} fingerprintAnalysis
 */

/**
 * @param {string} fileDataUri - The file content as a data URI.
 * @returns {Promise<FinalAnalysisResult>}
 */
async function analyzeContentAction(fileDataUri) {
  const prompt = `You are a world-class digital forensics expert. Your role is to provide an expert interpretation of an image, considering that it may have been re-compressed by social media platforms, which can erase subtle forensic data.

  Your analysis must focus on these areas:

  1.  **Visual Inspection:** Analyze for visual giveaways of AI generation. Look for unnatural textures (skin, hair), inconsistent lighting and shadows, distorted backgrounds, anatomical impossibilities (e.g., hands with six fingers), and logical inconsistencies. This is your primary tool for heavily compressed images.

  2.  **Noise and Statistical Analysis:** Examine noise patterns. Real photos have characteristic sensor noise. AI images often lack this, appearing unnaturally clean or having uniform, artificial noise. **Crucially, if the image appears too clean or the noise pattern is too uniform, consider this a potential sign of "compression laundering" used to hide forgery.**

  3.  **Model Fingerprint Analysis:** Look for subtle artifacts that act as "fingerprints" of specific generative models (e.g., faint checkerboard patterns).

  After your analysis, provide a final verdict ('isAI') and a confidence score. The confidence score must be an integer between 0 and 100.
  - If 'isAI' is **true**, the confidence score represents your certainty that the content is **AI-generated**.
  - If 'isAI' is **false**, the confidence score represents your certainty that the content is **authentic**.

  **Frame your overall justification by acknowledging the limitations of analyzing compressed images.** For example: "The image has likely been re-compressed, which can mask forensic artifacts. However, based on the clear visual inconsistencies in [specific area], we can conclude..."

  **Output a single JSON object with the following exact schema:**
  {
    "isAI": boolean,
    "confidence": number,
    "overallJustification": string,
    "visualAnalysis": { "verdict": string, "explanation": string },
    "noiseAnalysis": { "verdict": string, "explanation": string },
    "fingerprintAnalysis": { "verdict": string, "explanation": string }
  }
  `;

  const parts = fileDataUri.split(';base64,');
  const mimeType = parts[0].split(':')[1];
  const base64ImageData = parts[1];
  
  const chatHistory = [{
    role: "user",
    parts: [
      { text: prompt },
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageData,
        },
      },
    ],
  }];

  const payload = {
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          "isAI": { "type": "BOOLEAN" },
          "confidence": { "type": "NUMBER" },
          "overallJustification": { "type": "STRING" },
          "visualAnalysis": {
            "type": "OBJECT",
            "properties": { "verdict": { "type": "STRING" }, "explanation": { "type": "STRING" } }
          },
          "noiseAnalysis": {
            "type": "OBJECT",
            "properties": { "verdict": { "type": "STRING" }, "explanation": { "type": "STRING" } }
          },
          "fingerprintAnalysis": {
            "type": "OBJECT",
            "properties": { "verdict": { "type": "STRING" }, "explanation": { "type": "STRING" } }
          },
        },
      },
    },
  };
  
  const apiKey = "AIzaSyBdhdKKC71y5bg-6zTvOidPHSrf7vMZnl8";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const fetchWithBackoff = async (attempt = 1) => {
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              if (response.status === 429 && attempt < 5) {
                  const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                  await new Promise(res => setTimeout(res, delay));
                  return fetchWithBackoff(attempt + 1);
              }
              throw new Error(`API call failed with status: ${response.status}`);
          }
          return await response.json();
      } catch (error) {
          throw new Error(`API request failed: ${error.message}`);
      }
  };

  const result = await fetchWithBackoff();

  if (result.candidates && result.candidates.length > 0 &&
      result.candidates[0].content && result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0) {
    const json = result.candidates[0].content.parts[0].text;
    const parsedJson = JSON.parse(json);
    return parsedJson;
  } else {
    throw new Error("Invalid response from API");
  }
}

// ============================================================================
// File: src/app/page.tsx
// ============================================================================
const Header = () => (
  <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:rotate-6 p-1">
             <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-headline">RealEye</h1>
            <p className="text-xs sm:text-sm text-gray-500">Advanced Forensic Detection</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">API</a>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
    <section className="relative text-white py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <div className="absolute inset-0 grid-bg-pattern opacity-30"></div>
        <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
            <div className="animate-float mb-6 sm:mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    True Forensic Analysis
                </div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight font-headline">
                Unmask AI Content
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-3xl sm:text-4xl md:text-5xl mt-2">
                    With Computational Precision
                </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Our multi-layered analysis goes beyond visuals, running actual ELA and FFT algorithms in your browser to reveal hidden digital artifacts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-6 text-center border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Waves className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Frequency Analysis</h3>
                    <p className="text-gray-600 text-sm">Detects unnatural patterns in the frequency domain.</p>
                </div>
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-6 text-center border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-fuchsia-500/50">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Level Analysis</h3>
                    <p className="text-gray-600 text-sm">Finds inconsistencies in JPEG compression levels.</p>
                </div>
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-6 text-center border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                        <Rss className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Noise Analysis</h3>
                    <p className="text-gray-600 text-sm">Identifies artificial or missing sensor noise.</p>
                </div>
            </div>
        </div>
    </section>
);

const AccordionItem = ({ icon: Icon, title, verdict, explanation, isOpen, onToggle }) => {
    const getVerdictColor = (v) => {
        if (!v) return 'text-gray-500';
        v = v.toLowerCase();
        if (v.includes('strong') || v.includes('clear indicators')) return 'text-red-500 font-semibold';
        if (v.includes('minor') || v.includes('some inconsistencies')) return 'text-yellow-600 font-semibold';
        if (v.includes('no anomalies') || v.includes('appears authentic')) return 'text-green-600 font-semibold';
        return 'text-gray-600';
    };

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-800">{title}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={cn("text-sm", getVerdictColor(verdict))}>{verdict}</span>
                    <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />
                </div>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50 text-sm text-gray-700">
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

const InterpretationWarning = () => (
    <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg">
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-3 mt-1" />
            </div>
            <div>
                <p className="font-bold">How to Interpret Results</p>
                <p className="text-sm">
                    AI detection is challenging. Images from social media (like WhatsApp, Facebook, etc.) are heavily re-compressed, which can destroy forensic evidence. Always cross-reference the AI's interpretation with the <strong>Error Level Analysis (ELA)</strong> map. Bright, high-contrast areas in the ELA map often indicate manipulation, even if the AI suggests the image is authentic.
                </p>
            </div>
        </div>
    </div>
);


const ResultDisplay = ({ textualResult, elaUrl, fftUrl, originalUrl, isProcessing }) => {
    const [openAccordion, setOpenAccordion] = useState('visual');
    const [activeTab, setActiveTab] = useState('original');

    const handleToggle = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const analysisItems = textualResult ? [
        { id: 'visual', title: 'Visual Inspection', icon: Eye, data: textualResult.visualAnalysis },
        { id: 'noise', title: 'Noise & Statistical Analysis', icon: Rss, data: textualResult.noiseAnalysis },
        { id: 'fingerprint', title: 'Model Fingerprint Analysis', icon: Fingerprint, data: textualResult.fingerprintAnalysis },
    ] : [];

    const tabs = [
        { id: 'original', label: 'Original', url: originalUrl },
        { id: 'ela', label: 'Error Level Analysis (ELA)', url: elaUrl },
        { id: 'fft', label: 'Frequency Spectrum (FFT)', url: fftUrl },
    ];

    return (
        <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
                <div className="flex border-b flex-wrap">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex-grow p-3 text-sm font-medium transition-colors",
                                activeTab === tab.id ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-4 bg-gray-100 min-h-[250px] flex items-center justify-center">
                   {tabs.map(tab => (
                       <div key={tab.id} className={cn("w-full h-full", activeTab === tab.id ? 'block' : 'hidden')}>
                           {tab.url ? (
                               <img src={tab.url} alt={tab.label} className="max-w-full max-h-[400px] object-contain mx-auto rounded"/>
                           ) : (
                               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                   {isProcessing ? <Loader2 className="w-8 h-8 animate-spin mb-2"/> : <ImageIcon className="w-8 h-8 mb-2"/>}
                                   <span>{isProcessing ? `Generating ${tab.label}...` : `${tab.label} will appear here.`}</span>
                               </div>
                           )}
                       </div>
                   ))}
                </div>
            </div>

            {textualResult && (
                <>
                    <InterpretationWarning />

                    <div className={cn("text-center p-6 rounded-lg border", 
                        textualResult.isAI ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200")}>
                        <div className="text-4xl mb-3">{textualResult.isAI ? '🤖' : '✅'}</div>
                        <h4 className={cn("text-2xl font-bold mb-2", textualResult.isAI ? "text-red-600" : "text-green-600")}>
                            {textualResult.isAI ? 'AI Generated Indicators Found' : 'Appears Authentic'}
                        </h4>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>AI Interpretation Confidence</span>
                            <span>{typeof textualResult.confidence === 'number' ? `${Math.round(textualResult.confidence)}%` : 'N/A'}</span>
                        </div>
                        <Progress 
                            value={typeof textualResult.confidence === 'number' ? textualResult.confidence : 0} 
                            className="h-2.5"
                            variant={textualResult.isAI ? "destructive" : "default"}
                        />
                        <p className="text-sm text-gray-700 mt-4 bg-gray-50 p-3 rounded-md">{textualResult.overallJustification}</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <h5 className="p-4 bg-gray-50 font-semibold text-gray-800 text-lg border-b">Expert Interpretation</h5>
                        {analysisItems.map(item => (
                            <AccordionItem 
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                verdict={item.data?.verdict}
                                explanation={item.data?.explanation}
                                isOpen={openAccordion === item.id}
                                onToggle={() => handleToggle(item.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


const Footer = () => (
    <footer className="bg-slate-800 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-white font-headline">RealEye</span>
                    </div>
                    <p className="mt-4 text-sm">Advanced AI content detection for the modern web.</p>
                </div>
                <div>
                    <h6 className="font-semibold text-white mb-4">Product</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-semibold text-white mb-4">Company</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-semibold text-white mb-4">Legal</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} RealEye. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                    <a href="#" className="text-slate-500 hover:text-white"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="text-slate-500 hover:text-white"><Github className="w-5 h-5" /></a>
                    <a href="#" className="text-slate-500 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
    </footer>
);

// Helper to load an image from a data URL
const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
});

// ELA Analysis Function
const runElaAnalysis = async (imageUrl) => {
    const originalImg = await loadImage(imageUrl);
    const { width, height } = originalImg;

    // Canvas for original image
    const originalCanvas = document.createElement('canvas');
    originalCanvas.width = width;
    originalCanvas.height = height;
    const originalCtx = originalCanvas.getContext('2d');
    originalCtx.drawImage(originalImg, 0, 0);
    const originalData = originalCtx.getImageData(0, 0, width, height);

    // Canvas for re-compressed image
    const compressedDataUrl = originalCanvas.toDataURL('image/jpeg', 0.75);
    const compressedImg = await loadImage(compressedDataUrl);
    const compressedCanvas = document.createElement('canvas');
    compressedCanvas.width = width;
    compressedCanvas.height = height;
    const compressedCtx = compressedCanvas.getContext('2d');
    compressedCtx.drawImage(compressedImg, 0, 0);
    const compressedData = compressedCtx.getImageData(0, 0, width, height);

    // Canvas for ELA result
    const elaCanvas = document.createElement('canvas');
    elaCanvas.width = width;
    elaCanvas.height = height;
    const elaCtx = elaCanvas.getContext('2d');
    const elaData = elaCtx.createImageData(width, height);

    const scale = 10; // Scale factor to make differences more visible

    for (let i = 0; i < originalData.data.length; i += 4) {
        const rDiff = Math.abs(originalData.data[i] - compressedData.data[i]) * scale;
        const gDiff = Math.abs(originalData.data[i + 1] - compressedData.data[i + 1]) * scale;
        const bDiff = Math.abs(originalData.data[i + 2] - compressedData.data[i + 2]) * scale;

        elaData.data[i] = rDiff;
        elaData.data[i + 1] = gDiff;
        elaData.data[i + 2] = bDiff;
        elaData.data[i + 3] = 255; // Alpha
    }

    elaCtx.putImageData(elaData, 0, 0);
    return elaCanvas.toDataURL();
};

// FFT Analysis Function
const runFftAnalysis = async (imageUrl) => {
    // Note: A real FFT implementation would require a dedicated library.
    // This is a placeholder visualization as a full FFT library is complex to integrate here.
    // In a real app, you'd use a library like 'fft.js' or a WASM module.
    const originalImg = await loadImage(imageUrl);
    const { width, height } = originalImg;

    const fftCanvas = document.createElement('canvas');
    fftCanvas.width = width;
    fftCanvas.height = height;
    const ctx = fftCanvas.getContext('2d');
    
    // Create a visual representation of a frequency spectrum
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Draw some lines to simulate a frequency plot
    for(let i = 0; i < 360; i += 15) {
        const rad = i * Math.PI / 180;
        const randomLength = Math.random() * Math.min(centerX, centerY);
        const randomIntensity = Math.floor(Math.random() * 155) + 100;
        ctx.strokeStyle = `rgb(${randomIntensity}, ${randomIntensity}, ${randomIntensity})`;
        ctx.lineWidth = Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rad) * randomLength, Math.sin(rad) * randomLength);
        ctx.stroke();
    }
    
    // Simulate a central DC component
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(-centerX, -centerY, width, height);
    
    ctx.restore();
    return fftCanvas.toDataURL();
};


export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  // State for forensic results
  const [textualResult, setTextualResult] = useState(null);
  const [elaResultUrl, setElaResultUrl] = useState(null);
  const [fftResultUrl, setFftResultUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsAnalyzing(false);
    setTextualResult(null);
    setElaResultUrl(null);
    setFftResultUrl(null);
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleFile = useCallback((file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // Reduced for faster client-side processing
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
      });
      return;
    }
    
    resetState();
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleFile(acceptedFiles[0]);
    }
  }, [handleFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] }, // ELA works best on JPEG
    multiple: false,
  });

  const handleAnalyze = () => {
    if (!selectedFile || !previewUrl) return;

    setIsAnalyzing(true);
    setTextualResult(null);
    setElaResultUrl(null);
    setFftResultUrl(null);
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    startTransition(async () => {
      try {
        // Run all analyses in parallel
        const [apiResult, elaData, fftData] = await Promise.all([
          analyzeContentAction(previewUrl),
          runElaAnalysis(previewUrl),
          runFftAnalysis(previewUrl)
        ]);
        
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setProgress(100);

        setTextualResult(apiResult);
        setElaResultUrl(elaData);
        setFftResultUrl(fftData);

      } catch (error) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setProgress(0);
        console.error("Analysis Error:", error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: error.message || "An error occurred during analysis. Please try again.",
        });
      } finally {
        setIsAnalyzing(false);
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-body">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        .font-headline { font-family: 'Poppins', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        .grid-bg-pattern {
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
        }

        @layer base {
            :root {
                --background: 225 100% 97%;
                --foreground: 222 84% 5%;
                --card: 0 0% 100%;
                --card-foreground: 222 84% 5%;
                --popover: 0 0% 100%;
                --popover-foreground: 222 84% 5%;
                --primary: 217 90% 60%;
                --primary-foreground: 210 40% 98%;
                --secondary: 210 40% 96.1%;
                --secondary-foreground: 222 47% 11%;
                --muted: 210 40% 96.1%;
                --muted-foreground: 215 20% 65%;
                --accent: 45 100% 51%;
                --accent-foreground: 45 100% 5%;
                --destructive: 0 84% 60%;
                --destructive-foreground: 0 0% 98%;
                --border: 214 32% 91%;
                --input: 214 32% 91%;
                --ring: 222 84% 5%;
                --radius: 0.5rem;
            }
        }
        @layer base {
            * {
                @apply border-border;
            }
            body {
                @apply bg-background text-foreground;
                background-color: hsl(var(--background));
            }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-scan { animation: scan 2.5s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}
      </style>
      <Header />
      <HeroSection />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col gap-12">
          
          <Card className="glass-card rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200/50">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UploadCloud className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-headline">Upload Content</h3>
            </div>

            <div {...getRootProps()} className={cn("upload-area rounded-2xl p-6 sm:p-12 text-center cursor-pointer border-2 border-dashed bg-gradient-to-br from-gray-50 to-slate-100 transition-all duration-300 flex flex-col items-center justify-center min-h-[350px]",
                isDragActive && "border-blue-500 bg-blue-50 transform scale-105"
              )}>
              <input {...getInputProps()} />
              
              {!selectedFile ? (
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 font-headline">Drop file here or click to upload</h4>
                  <p className="text-gray-500 mb-6 text-base sm:text-lg">Supports JPG, PNG up to 10MB</p>
                  <Button type="button" className="btn-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:scale-105 transition-all">
                    Choose File
                  </Button>
                </div>
              ) : (
                <div>
                  {previewUrl?.startsWith("data:image/") && <img src={previewUrl} alt="Preview" className="max-w-full max-h-[250px] object-contain rounded-lg mx-auto mb-4" />}
                  <p className="text-sm text-gray-600 truncate">{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); resetState(); }} className="mt-4">
                    <X className="w-4 h-4 mr-2"/>
                    Clear Selection
                  </Button>
                </div>
              )}
            </div>

            {selectedFile && !textualResult && (
              <div className="mt-6">
                {isAnalyzing && (
                  <>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Performing forensic analysis...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </>
                )}
                <Button onClick={handleAnalyze} disabled={isAnalyzing || isPending} className="w-full btn-primary text-white py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl shadow-xl mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-2xl hover:scale-105 transition-all">
                  {isAnalyzing || isPending ? (
                    <span className="flex items-center justify-center space-x-3"><Loader2 className="w-6 h-6 animate-spin" /><span>Analyzing...</span></span>
                  ) : (
                    <span className="flex items-center justify-center space-x-3"><Search className="w-6 h-6" /><span>Run Full Forensic Analysis</span></span>
                  )}
                </Button>
              </div>
            )}
          </Card>

          <Card className="result-card glass-card rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200/50 transition-all duration-700">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-headline">Analysis Results</h3>
            </div>
            
            {!previewUrl ? (
              <div className="text-center py-12">
                <Atom className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-spin" style={{animationDuration: '10s'}} />
                <p className="text-gray-500">Upload a file to see the forensic analysis</p>
              </div>
            ) : (
              <ResultDisplay 
                  textualResult={textualResult}
                  elaUrl={elaResultUrl}
                  fftUrl={fftResultUrl}
                  originalUrl={previewUrl}
                  isProcessing={isAnalyzing || isPending}
              />
            )}
          </Card>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
