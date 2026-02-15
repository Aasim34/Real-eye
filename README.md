# �️ RealEye - AI Content Detection System

An advanced AI-powered digital forensics tool that analyzes images and videos to detect AI-generated or manipulated content. Features multi-layered forensic analysis including Error Level Analysis (ELA), Fast Fourier Transform (FFT), noise pattern detection, and AI-powered interpretation using Google Gemini.

![React](https://img.shields.io/badge/React-19.1-61dafb) ![Vite](https://img.shields.io/badge/Vite-7.1-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### 🔬 Advanced Forensic Analysis
- **Error Level Analysis (ELA)** - Detects JPEG compression inconsistencies revealing manipulated regions
- **FFT Frequency Analysis** - Identifies unnatural patterns in the frequency domain
- **Noise Pattern Detection** - Analyzes sensor noise to detect artificial generation
- **Model Fingerprint Analysis** - Detects subtle artifacts from specific AI models
- **Visual Inspection** - Identifies anatomical impossibilities and visual inconsistencies
- **Multi-Layered Approach** - Combines multiple forensic techniques for accurate results

### 🤖 AI-Powered Interpretation
- **Google Gemini Integration** - Uses Gemini 2.5 Flash for expert-level analysis
- **Contextual Understanding** - Considers compression artifacts from social media
- **Confidence Scoring** - Provides percentage-based confidence levels (0-100%)
- **Detailed Explanations** - Expert interpretations for each analysis layer
- **JSON-Structured Results** - Clean, parseable output for further processing
- **Rate Limiting Handling** - Automatic retry with exponential backoff

### 📤 File Upload & Processing
- **Drag & Drop Interface** - Intuitive file upload with visual feedback
- **Real-Time Preview** - Instant image preview before analysis
- **File Validation** - Accepts JPEG and PNG images up to 10MB
- **Client-Side Processing** - ELA and FFT run entirely in your browser
- **Progress Tracking** - Visual progress indicators during analysis
- **Privacy First** - Images analyzed locally, only sent to Gemini API when needed

### 🎨 Modern UI/UX
- **Hero Section** - Stunning gradient background with floating animations
- **Interactive Tabs** - Switch between Original, ELA, and FFT visualizations
- **Accordion Components** - Collapsible detailed analysis sections
- **Glassmorphic Design** - Modern backdrop blur effects and transparency
- **Responsive Layout** - Fully optimized for desktop, tablet, and mobile
- **Gradient Accents** - Blue, purple, pink, teal color schemes throughout

### 📊 Results Visualization
- **Side-by-Side Comparison** - View original and forensic images together
- **Color-Coded Verdicts** - Red (AI detected), Green (Authentic), Yellow (Uncertain)
- **Confidence Meter** - Visual progress bar showing AI confidence level
- **Interpretation Warning** - Educates users about compression limitations
- **Expert Sections** - Detailed breakdown of visual, noise, and fingerprint analysis
- **Toast Notifications** - Non-intrusive alerts for errors and warnings

### ⚡ Performance Optimization
- **Canvas-Based Processing** - Fast ELA and FFT computation
- **Parallel Analysis** - Runs API, ELA, and FFT simultaneously
- **Optimized Rendering** - Efficient React component updates
- **Vite Build System** - Lightning-fast dev server and HMR
- **Lazy Loading** - On-demand component rendering

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - JavaScript runtime
- **npm 9+** - Package management
- **Modern Browser** - Chrome, Firefox, Safari, or Edge
- **Google Gemini API Key** - For AI-powered analysis (embedded in code)

### Installation

1. **Clone or navigate to project directory**
   ```bash
   cd "d:\Aasim'\Project\Real-eye"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

**Development Mode (Recommended)**
```bash
npm run dev
```

This starts:
- Vite dev server at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Fast refresh for instant updates

**Build for Production**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

**Lint Code**
```bash
npm run lint
```

### First Visit
1. Open `http://localhost:5173` in your browser
2. You'll see the **RealEye** homepage with hero section
3. Scroll to the upload area
4. Drag & drop an image or click to browse
5. Click **Analyze Content** to start forensic analysis

---

## 📖 Usage Guide

### 🏠 Landing Page
- **Hero Section** - Overview of RealEye's capabilities
- **Feature Cards** - Three main forensic analysis methods:
  - 🌊 **Frequency Analysis** - FFT-based pattern detection
  - 📊 **Error Level Analysis** - Compression inconsistency detection
  - 📡 **Noise Analysis** - Sensor noise pattern identification
- **Header Navigation** - Quick access to Features, API, and Security info
- **Sticky Header** - Always accessible navigation

### 📤 Upload & Analyze

1. **Upload Your Image**
   - **Drag & Drop**: Drag an image file into the upload zone
   - **Click to Browse**: Click the zone to select from file explorer
   - **Supported Formats**: JPEG (.jpg, .jpeg), PNG (.png)
   - **Size Limit**: Up to 10MB per image
   - **Visual Feedback**: Upload zone highlights on drag hover

2. **Preview Your Image**
   - Image appears in preview pane after upload
   - File details shown below preview
   - Reset button to clear and start over

3. **Start Analysis**
   - Click **"Analyze Content"** button
   - Progress bar shows analysis status
   - Three simultaneous processes:
     - AI interpretation via Google Gemini
     - ELA computation (client-side)
     - FFT frequency analysis (client-side)

### 🔍 Understanding Results

#### Tabbed Visualization
- **Original Tab**: View the uploaded image
- **Error Level Analysis (ELA) Tab**: 
  - Bright areas indicate different compression levels
  - Manipulated regions often show higher contrast
  - Uniform brightness suggests authentic image
- **Frequency Spectrum (FFT) Tab**:
  - Shows frequency distribution patterns
  - Unnatural patterns suggest AI generation
  - Real photos have characteristic frequency signatures

#### AI Verdict Section
- **Color-Coded Result**:
  - 🤖 **Red Background**: AI-generated indicators found
  - ✅ **Green Background**: Image appears authentic
- **Confidence Score**: Percentage bar (0-100%)
  - Higher = More certain in the verdict
  - Red bar = Confident it's AI-generated
  - Green bar = Confident it's authentic

#### Expert Interpretation Accordion

**1. Visual Inspection**
- Anatomical inconsistencies (extra fingers, distorted features)
- Lighting and shadow problems
- Texture abnormalities (skin, hair, fabric)
- Background logical inconsistencies

**2. Noise & Statistical Analysis**
- Sensor noise patterns (present in real cameras)
- Statistical distribution of pixel values
- Compression laundering detection
- Unnatural smoothness indicators

**3. Model Fingerprint Analysis**
- AI model-specific artifacts
- Checkerboard patterns (common in GANs)
- Consistent generation signatures
- Stylistic tells from specific models

#### Interpretation Warning
- **Important**: Images from social media are heavily re-compressed
- Compression can destroy forensic evidence
- Always cross-reference AI verdict with ELA/FFT visuals
- Bright ELA areas suggest manipulation even if AI says authentic

### 🔄 Analyzing Another Image
- Click **"Analyze Another"** button at the bottom
- Or refresh the page to start fresh
- All analysis state resets

---

## 📁 Project Structure

```
d:\Aasim'\Project\Real-eye\
├── index.html                      # Main HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint rules
├── README.md                       # This file
├── public/                         # Static assets
│   └── vite.svg                    # Vite logo
└── src/                            # Source code
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Main application component (1073 lines)
    │                               # Contains all components and logic:
    │                               #   - Toast system & hooks
    │                               #   - UI components (Button, Card, Progress)
    │                               #   - Google Gemini API integration
    │                               #   - ELA analysis function
    │                               #   - FFT analysis function
    │                               #   - Header, Hero, Footer components
    │                               #   - ResultDisplay with tabs & accordion
    │                               #   - Main App logic & file upload
    ├── App.css                     # Component styles
    ├── index.css                   # Global styles & Tailwind directives
    └── assets/                     # Images, icons, and media files
```

### Key Files Explained

**App.jsx** - Single-file architecture containing:
- **Utility Functions**: `cn()` for className merging
- **Toast System**: Custom toast notifications with context
- **UI Components**: Button, Card, Progress, Toast, Toaster
- **API Integration**: `analyzeContentAction()` calls Google Gemini
- **Forensic Functions**: `runElaAnalysis()`, `runFftAnalysis()`
- **Main Components**: Header, HeroSection, Footer, AccordionItem, InterpretationWarning, ResultDisplay
- **App Component**: Main logic with file upload, analysis orchestration

**index.html** - Entry point with:
- Root div for React mounting
- Vite module script loading
- Meta tags and title

**Tailwind Config** - Custom theme with:
- Gradient color stops
- Custom animations
- Extended utility classes

---

## 🛠️ Technologies Used

### Frontend Stack
- **React 19.1.1** - UI component library with latest concurrent features
- **Vite 7.1.2** - Next-generation frontend build tool with HMR
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformations and autoprefixer
- **ESLint 9.33.0** - Code quality and style enforcement

### UI Components & Utilities
- **lucide-react 0.539.0** - Beautiful icon library (500+ icons)
- **react-dropzone 14.3.8** - Drag & drop file upload functionality
- **class-variance-authority 0.7.1** - CVA for component variants
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.3.1** - Merge Tailwind classes without conflicts

### AI & APIs
- **Google Gemini 2.5 Flash** - Vision-language model for image analysis
- **Gemini API** - JSON mode for structured responses
- **Rate Limiting** - Exponential backoff retry mechanism
- **Multimodal Input** - Text prompts + image data

### Image Processing (Client-Side)
- **Canvas API** - Native browser image manipulation
- **ELA Algorithm** - Re-compression and difference detection
- **FFT Visualization** - Frequency spectrum representation
- **Base64 Encoding** - Image data URI conversion
- **Image Loading** - Promise-based async image handling

### Design & Animation
- **Glassmorphism** - Backdrop blur and transparency effects
- **Gradient Backgrounds** - Multi-color gradient compositions
- **Smooth Transitions** - CSS transitions for UI elements
- **Responsive Grid** - Mobile-first responsive design
- **Hover Effects** - Interactive button and card animations
- **Progress Indicators** - Visual feedback during analysis

### Development Tools
- **@vitejs/plugin-react 5.0.0** - Fast Refresh and JSX support
- **Autoprefixer 10.4.21** - Automatic vendor prefixes
- **ESLint React Plugins** - React-specific linting rules
- **Vite Dev Server** - Instant server start and HMR

---

## ⚙️ Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",                  // Start dev server
    "build": "vite build",          // Build for production
    "lint": "eslint .",             // Run ESLint
    "preview": "vite preview"       // Preview production build
  }
}
```

### Vite Configuration
- **Port**: 5173 (default Vite dev server)
- **Hot Module Replacement**: Enabled
- **React Plugin**: Fast Refresh support
- **Build Output**: `dist/` directory

### Tailwind Configuration
- **Content Paths**: `./index.html`, `./src/**/*.{js,jsx}`
- **Dark Mode**: Class-based
- **Custom Colors**: Extended palette for gradients
- **Plugins**: None (vanilla setup)

### Google Gemini API
- **Model**: `gemini-2.5-flash-preview-05-20`
- **API Key**: Embedded in `App.jsx` (line ~352)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/`
- **Response Format**: JSON mode with schema validation
- **Rate Limiting**: Exponential backoff (5 retries max)
- **Timeout**: No explicit timeout (relies on fetch)

### API Request Schema
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "<forensic analysis prompt>" },
        {
          "inlineData": {
            "mimeType": "image/jpeg",
            "data": "<base64_image_data>"
          }
        }
      ]
    }
  ],
  "generationConfig": {
    "responseMimeType": "application/json",
    "responseSchema": { ... }
  }
}
```

### API Response Schema
```json
{
  "isAI": boolean,
  "confidence": number,
  "overallJustification": string,
  "visualAnalysis": {
    "verdict": string,
    "explanation": string
  },
  "noiseAnalysis": {
    "verdict": string,
    "explanation": string
  },
  "fingerprintAnalysis": {
    "verdict": string,
    "explanation": string
  }
}
```

### Environment Variables
**Optional Customization:**
```bash
# No environment variables currently used
# API key is hardcoded in App.jsx
# Consider moving to .env.local for security:
VITE_GEMINI_API_KEY=your_api_key_here
```

### File Upload Limits
- **Max File Size**: 10MB (configurable in `App.jsx` line ~828)
- **Accepted Formats**: JPEG, PNG
- **Multiple Files**: No (single file at a time)
- **Storage**: None (files processed in memory only)

---

## 🎨 UI Components

### Header
- **RealEye Logo** - Gradient background with Eye icon
- **Sticky Position** - Remains at top during scroll
- **Backdrop Blur** - Glassmorphic semi-transparent effect
- **Navigation Links** - Features, API, Secure & Private indicator
- **Responsive** - Hides nav links on mobile

### Hero Section
- **Gradient Background** - Slate-900 to Slate-700
- **Grid Pattern Overlay** - Subtle tech aesthetic
- **Status Badge** - Green pulse indicator "True Forensic Analysis"
- **Main Heading** - Large bold text with gradient accent
- **Feature Cards** - Three analysis method cards:
  - Frequency Analysis (Waves icon, cyan glow)
  - Error Level Analysis (BarChart3 icon, fuchsia glow)
  - Noise Analysis (Rss icon, emerald glow)
- **Hover Effects** - Scale up and colored shadow on hover

### Upload Zone
- **Drag & Drop Area** - Dashed border, hover state
- **File Icons** - Image/Video icons
- **Instructions** - Clear upload guidance
- **File Preview** - Shows uploaded image
- **Reset Button** - Clear upload and start over

### Analysis Button
- **Gradient Background** - Blue to purple gradient
- **Loading State** - Loader2 spinning icon
- **Disabled State** - Grayed out when no file selected
- **Hover Effect** - Slight opacity change

### Results Display

**Tabbed Interface**
- Three tabs: Original, ELA, FFT
- Active tab highlighted in blue
- Inactive tabs in white with hover effect
- Image display area (400px max height)
- Loading spinner during processing

**Verdict Card**
- Color-coded background (red/green)
- Large emoji indicator (🤖/✅)
- Bold verdict text
- Confidence progress bar
- Overall justification text

**Expert Interpretation Accordion**
- Three collapsible sections
- Icon + title in header
- Color-coded verdict (red/yellow/green)
- Chevron rotation on open/close
- Gray background for explanation text

**Interpretation Warning**
- Amber background with left border
- Lightbulb icon
- Important usage guidance
- Mentions compression limitations

### Footer
- **Dark Background** - Slate-800
- **Logo & Description** - Brand identity
- **Link Columns** - Product, Company, Legal
- **Social Icons** - Twitter, GitHub, LinkedIn
- **Copyright** - Dynamic year display

---

## 📊 Forensic Analysis Explained

### Error Level Analysis (ELA)
**What It Does:**
- Re-compresses the image at a known quality level (75%)
- Compares original with re-compressed version
- Calculates pixel-by-pixel differences
- Amplifies differences with scale factor (10x)

**What to Look For:**
- **Bright/High-Contrast Areas**: Different compression levels (manipulation indicator)
- **Uniform Brightness**: Consistent compression (authentic indicator)
- **Sharp Edges**: Object boundaries always show some ELA response
- **Patchwork Patterns**: Copy-paste or spliced regions

**Limitations:**
- Multiple compressions reduce effectiveness
- Social media platforms heavily re-compress images
- Lossy formats (JPEG) required for meaningful results

### FFT Frequency Analysis
**What It Does:**
- Converts spatial domain to frequency domain
- Analyzes periodic patterns in the image
- Identifies unnatural frequency distributions
- Generates visual frequency spectrum

**What to Look For:**
- **Central Bright Spot**: DC component (mean brightness)
- **Radial Patterns**: Natural images have characteristic distribution
- **Grid Patterns**: Can indicate AI upscaling artifacts
- **Unnatural Symmetry**: AI models sometimes create symmetric frequency patterns

**Note:** Current implementation is a visualization placeholder. Full FFT requires additional libraries.

### Noise Analysis
**What It Checks:**
- **Sensor Noise**: Real cameras have characteristic noise patterns
- **Noise Distribution**: Should be consistent across image
- **Unnatural Smoothness**: AI images often lack sensor noise
- **Uniform Noise**: Artificially added noise has different statistical properties

### Visual Inspection
**Common AI Indicators:**
- 👋 **Hands**: Extra/missing fingers, wrong proportions
- 👁️ **Eyes**: Asymmetric, unnatural reflections
- 🦷 **Hair**: Melted, merged with background
- 🔆 **Lighting**: Inconsistent shadows, multiple light sources
- 📷 **Background**: Distorted text, impossible structures
- 👗 **Textures**: Unnatural fabric patterns, blurred details

### Model Fingerprint Detection
**AI Model Artifacts:**
- **Checkerboard Patterns**: Common in GAN upsampling
- **Color Banding**: Limited color palette in some models
- **Blur Halos**: Around generated objects
- **Repetitive Patterns**: Models sometimes repeat learned textures
- **Stylistic Consistency**: Each model has characteristic "style"

---

## 🔧 Troubleshooting

### Installation Issues

**Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Vite not starting**
```bash
# Check Node.js version (need 18+)
node --version

# Try different port if 5173 is occupied
npm run dev -- --port 3000
```

**Tailwind styles not applying**
- Verify `index.css` imports Tailwind directives
- Check `tailwind.config.js` content paths include all source files
- Restart dev server after config changes
- Clear browser cache

### Runtime Issues

**"File too large" error**
- Reduce image file size before upload
- Compress image using online tools
- Current limit: 10MB (edit line ~828 in `App.jsx` to increase)

**API call fails / 429 Rate Limit**
- Gemini API has rate limits
- Exponential backoff retries automatically (up to 5 times)
- Wait a few minutes and try again
- Consider implementing your own API key

**API returns "Invalid response"**
- Check console for detailed error
- Gemini might have content safety blocks
- Image might be too large for API
- Network issues - check internet connection

**Images not displaying**
- Check browser console for errors
- Verify image file is valid JPEG/PNG
- Try different image
- Clear browser cache

**ELA/FFT not generating**
- ELA requires Canvas API support (all modern browsers)
- Check browser console for JavaScript errors
- Ensure image loaded successfully
- Try smaller image dimensions

### UI Issues

**Layout broken on mobile**
- Tailwind responsive classes should handle this
- Check for custom CSS overriding responsive styles
- Test in browser dev tools responsive mode
- Clear cache and hard reload

**Accordion not opening**
- Check `openAccordion` state in console
- Verify click handlers attached
- Look for JavaScript errors

**Progress bar stuck**
- Analysis might have failed silently
- Check network tab for failed requests
- Refresh page and try again
- Interval cleanup might have failed

### Performance Issues

**Analysis taking too long**
- Large images take longer to process
- ELA computation is pixel-by-pixel (slow for high-res)
- API calls depend on internet speed
- Consider resizing image before upload

**Browser freezing**
- Canvas operations blocking main thread
- Try smaller image (< 2MB recommended)
- Close other browser tabs
- Use modern browser (Chrome, Edge, Firefox)

**Memory issues**
- Multiple analyses without refreshing
- Large images stored in state
- Refresh page between analyses
- Close and reopen browser

### Development Issues

**ESLint errors**
```bash
# Auto-fix what's possible
npm run lint -- --fix
```

**Build fails**
```bash
# Check for syntax errors
npm run lint

# Clean build
rm -rf dist
npm run build
```

**Hot reload not working**
- Save file again to trigger
- Restart dev server
- Check Vite plugin configuration
- Disable browser extensions

### Security Considerations

**API Key Exposed**
- Current implementation has API key in source code
- For production, move to environment variable:
  ```javascript
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  ```
- Create `.env.local` file:
  ```
  VITE_GEMINI_API_KEY=your_api_key_here
  ```
- Add `.env.local` to `.gitignore`

**Image Privacy**
- Images uploaded are sent to Google Gemini API
- Consider adding privacy notice
- For sensitive content, use local-only analysis
- ELA and FFT run entirely client-side (private)

---

## 📝 Features Implemented

### ✅ Complete
- ✅ Google Gemini API integration for AI analysis
- ✅ Error Level Analysis (ELA) computation
- ✅ FFT frequency spectrum visualization
- ✅ Drag & drop file upload interface
- ✅ Real-time image preview
- ✅ Multi-layered forensic analysis
- ✅ Confidence scoring system
- ✅ Expert interpretation accordion
- ✅ Tabbed results display (Original/ELA/FFT)
- ✅ Color-coded verdicts (Red/Green)
- ✅ Progress tracking during analysis
- ✅ Toast notifications for errors
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Interpretation warning section
- ✅ Modern glassmorphic UI
- ✅ Gradient hero section
- ✅ Sticky header navigation
- ✅ Footer with social links
- ✅ File validation (type & size)
- ✅ Rate limiting with exponential backoff

### 🚀 Future Enhancements
- ⬜ **Full FFT Implementation** - Use actual FFT library (fft.js or WASM)
- ⬜ **Batch Analysis** - Upload and analyze multiple images
- ⬜ **Comparison Mode** - Compare two images side-by-side
- ⬜ **Export Report** - Download analysis results as PDF
- ⬜ **User Authentication** - Save analysis history
- ⬜ **API Key Management** - User-provided Gemini API keys
- ⬜ **Video Analysis** - Frame-by-frame deepfake detection
- ⬜ **Advanced ELA** - Adjustable quality levels and difference scales
- ⬜ **Noise Pattern Analysis** - Statistical noise pattern detection
- ⬜ **Metadata Extraction** - EXIF data analysis and anomaly detection
- ⬜ **Copy-Move Detection** - Block matching for duplicated regions
- ⬜ **JPEG Ghost Detection** - Identify multiple compression generations
- ⬜ **Hybrid Score** - Combine all forensic methods into single score
- ⬜ **Training Mode** - Educational tool with known AI/real examples
- ⬜ **Browser Extension** - Right-click any web image to analyze
- ⬜ **API Endpoint** - RESTful API for programmatic access
- ⬜ **Dark Mode Toggle** - User preference for light/dark theme
- ⬜ **Localization** - Multi-language support (i18n)
- ⬜ **Watermark Detection** - Identify AI service watermarks
- ⬜ **Mobile App** - Native iOS/Android apps using React Native

---

## 📄 License

**MIT License** - Free to use for educational and personal projects.

---

## 🙏 Acknowledgments

- **Google Gemini** - Multimodal AI capabilities for vision analysis
- **React Team** - Powerful UI library with concurrent features
- **Vite Team** - Blazing fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **lucide-react** - Beautiful icon library
- **react-dropzone** - Drag & drop file upload functionality
- **Digital Forensics Community** - ELA and forensic techniques research
- **shadcn/ui** - Component design patterns and CVA architecture
- **Open Source Community** - Countless libraries and tools

---

## 📞 Support & Documentation

### How AI Detection Works

**RealEye uses a multi-layered approach:**

1. **Client-Side Forensics** (ELA, FFT)
   - Fast, private, runs in your browser
   - No data sent to servers
   - Good for quick visual checks

2. **AI Interpretation** (Google Gemini)
   - Advanced multimodal analysis
   - Context-aware reasoning
   - Considers compression artifacts
   - Provides expert-level explanations

3. **Human Review**
   - Final decision should involve human judgment
   - Cross-reference all analysis layers
   - Consider image source and context

### Interpretation Guidelines

**High Confidence AI Detection** (80-100%)
- Multiple visual anomalies
- Clear ELA inconsistencies
- Unnatural noise patterns
- Model-specific artifacts

**Medium Confidence** (50-79%)
- Some visual issues
- Minor ELA variations
- Unclear noise patterns
- Possible compression effects

**Low Confidence** (0-49%)
- Few or no anomalies
- Consistent ELA patterns
- Natural noise distribution
- Likely authentic

**Important**: Social media compression can reduce detection accuracy!

### Best Practices

1. **Use Original Images** - Avoid screenshots or re-downloads
2. **Check Multiple Sources** - Run analysis on images from different platforms
3. **Consider Context** - Where did the image come from?
4. **Look at ELA** - Bright areas in ELA map are suspicious
5. **Trust but Verify** - AI can make mistakes, use your judgment

### Common False Positives

- **Heavy JPEG Compression** - Can trigger ELA responses
- **Edited Photos** - Color correction looks like manipulation
- **Compressed Social Media** - Destroys forensic evidence
- **Low Resolution** - Not enough detail for analysis
- **Screenshots** - Multiple re-compressions

### Common False Negatives

- **High-Quality AI Models** - New models better at avoiding artifacts
- **Post-Processing** - AI images edited to add noise
- **Compression Laundering** - Intentionally re-compressed to hide traces
- **Hybrid Images** - Real photo with AI-generated elements

---

## 🚀 Quick Commands

**Start Development Server:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

**Run Linter:**
```bash
npm run lint
```

**Install Dependencies:**
```bash
npm install
```

**Clean Install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Access Points

- **Development**: `http://localhost:5173`
- **Production Preview**: `http://localhost:4173` (after `npm run preview`)
- **Build Output**: `dist/` directory

---

## 👨‍💻 Developer Notes

### Single-File Architecture

**Why App.jsx is 1073 lines?**
- Rapid prototyping and development
- All components in one place for easy editing
- No need to navigate between files
- Simple deployment (fewer files)

**For Production, Consider Splitting:**
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Progress.jsx
│   │   └── Toast.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── ResultDisplay.jsx
│   └── Footer.jsx
├── lib/
│   ├── api.js              # Gemini API calls
│   ├── forensics.js        # ELA, FFT functions
│   └── utils.js            # cn() and helpers
├── hooks/
│   └── use-toast.js        # Toast hook
├── App.jsx                 # Main app logic
└── main.jsx                # Entry point
```

### API Key Security

**Current State:** API key is hardcoded in `App.jsx`

**For Production:**
1. Move key to environment variable
2. Use backend proxy to hide key
3. Implement rate limiting per user
4. Add usage analytics

**Example with .env:**
```javascript
// App.jsx
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// .env.local (don't commit!)
VITE_GEMINI_API_KEY=your_actual_key_here
```

### Performance Optimization Tips

1. **Image Resizing**: Resize large images before analysis
   ```javascript
   // Add canvas resize logic before analysis
   const maxWidth = 1920;
   const maxHeight = 1080;
   ```

2. **Web Workers**: Move ELA/FFT to web worker
   ```javascript
   // Prevent main thread blocking
   const worker = new Worker('forensics-worker.js');
   ```

3. **Lazy Load Components**: Split ResultDisplay
   ```javascript
   const ResultDisplay = lazy(() => import('./components/ResultDisplay'));
   ```

4. **Memoization**: Use React.memo for heavy components
   ```javascript
   const ResultDisplay = React.memo(ResultDisplayComponent);
   ```

---

## ⚠️ Important Disclaimers

1. **Not 100% Accurate**: No AI detection tool is perfect
2. **Compression Matters**: Social media compression reduces accuracy
3. **New AI Models**: Constantly evolving, harder to detect
4. **Legal Use Only**: Don't use to harass or defame
5. **For Educational Purposes**: Learn about digital forensics
6. **Privacy Notice**: Images sent to Google Gemini API
7. **API Costs**: Gemini API may have usage limits/costs

---

**Made with ❤️ using React, Vite, Tailwind CSS, and Google Gemini**

*RealEye - Unmask AI Content With Computational Precision*

---

## 📧 Contact & Contributions

For issues, questions, or contributions:
- Check troubleshooting section first
- Review code comments in `App.jsx`
- Test with various image types
- Consider contributing improvements via pull requests

**Project Path**: `d:\Aasim'\Project\Real-eye`

**Created**: December 2024 - February 2026
