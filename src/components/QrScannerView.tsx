import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Wifi,
  Key,
  Eye,
  EyeOff,
  FileImage,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileCode,
  ShieldCheck,
  Mail,
  Phone,
  UserCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import jsQR from 'jsqr';
import { decodeQrFromImage, analyzeQrPayload, DecodedQrInfo } from '../utils/qrDecoder';

interface QrScannerViewProps {
  onLoadIntoGenerator: (text: string) => void;
  isModal?: boolean;
}

export const QrScannerView: React.FC<QrScannerViewProps> = ({
  onLoadIntoGenerator,
  isModal = false,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [decodedInfo, setDecodedInfo] = useState<DecodedQrInfo | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Camera references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image file selection
  const processImageFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP, GIF, etc.).');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);

      // Multi-pass decode
      const rawPayload = await decodeQrFromImage(file);
      const analyzed = analyzeQrPayload(rawPayload);
      analyzed.imagePreviewUrl = previewUrl;
      setDecodedInfo(analyzed);
    } catch (err: any) {
      console.error('QR Decode Error:', err);
      setErrorMsg(
        err.message || 'Could not find a valid QR code in this image. Try a higher-resolution photo or cropping closer.'
      );
      setDecodedInfo(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Clipboard Paste Support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Stop camera helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  // Start camera helper
  const startCamera = async () => {
    stopCamera();
    setErrorMsg(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.error('Camera stream error:', err);
      setErrorMsg('Camera access is unavailable. Please check browser permissions or upload an image.');
    }
  };

  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });

        if (code && code.data && code.data.trim()) {
          const analyzed = analyzeQrPayload(code.data);
          setDecodedInfo(analyzed);
          stopCamera();
          setActiveMode('upload');
          return;
        }
      }
    }
    animFrameRef.current = requestAnimationFrame(tickScan);
  };

  useEffect(() => {
    if (activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeMode]);

  const copyToClipboard = (text: string, isPass = false) => {
    navigator.clipboard.writeText(text);
    if (isPass) {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } else {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  return (
    <div className={`space-y-6 ${isModal ? '' : 'max-w-4xl mx-auto'}`}>
      {/* Header Banner */}
      {!isModal && (
        <div className="bg-gradient-to-r from-blue-900/40 via-zinc-950 to-indigo-900/40 border border-blue-800/40 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Upload className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-extrabold text-white">QR Code Scanner & Decoder</h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300">
                Upload any QR code image, photo, or screenshot to instantly read what is written inside and load it into the live generator.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Multi-Pass AI Decoder Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Scanner Container */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
        {/* Toggle Mode Buttons */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl">
          <button
            type="button"
            id="tab-upload-mode"
            onClick={() => {
              setActiveMode('upload');
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Image / Screenshot
          </button>
          <button
            type="button"
            id="tab-camera-mode"
            onClick={() => {
              setActiveMode('camera');
            }}
            className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'camera'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            Live Camera / Webcam
          </button>
        </div>

        {/* Upload Drop Zone */}
        {activeMode === 'upload' ? (
          <div
            id="qr-image-dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) {
                processImageFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer select-none relative overflow-hidden ${
              isDragging
                ? 'border-blue-400 bg-blue-950/40 ring-4 ring-blue-500/20 scale-[1.01]'
                : 'border-zinc-700 hover:border-blue-500 bg-zinc-900/60 hover:bg-zinc-900'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="qr-file-input"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  processImageFile(e.target.files[0]);
                }
              }}
            />

            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                {isProcessing ? (
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
                ) : (
                  <FileImage className="w-8 h-8" />
                )}
              </div>

              <div>
                <p className="text-base font-bold text-white mb-1">
                  {isProcessing ? 'Analyzing and decoding QR code...' : 'Click to Upload or Drag & Drop QR Image'}
                </p>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Supports JPG, PNG, WEBP, SVG & screenshots. You can also press{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-[11px]">
                    Ctrl + V
                  </kbd>{' '}
                  to paste an image from clipboard directly.
                </p>
              </div>

              <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Browse Files</span>
              </div>
            </div>
          </div>
        ) : (
          /* Camera Viewport */
          <div className="relative aspect-video max-h-[380px] w-full mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800">
            {errorMsg ? (
              <div className="p-6 text-center text-rose-400 text-xs flex flex-col items-center gap-3">
                <AlertCircle className="w-10 h-10" />
                <p className="font-semibold text-sm">{errorMsg}</p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-xl text-xs font-bold hover:bg-zinc-700 cursor-pointer"
                >
                  Retry Camera
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Animated Scanner Crosshair */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-blue-400/80 rounded-2xl relative shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse top-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 backdrop-blur-xs rounded-full text-[11px] text-white font-medium">
                  Point camera steadily at any QR Code
                </div>
              </>
            )}
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && activeMode === 'upload' && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 flex items-start gap-3 text-rose-200 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-100">Unable to decode QR code</p>
              <p className="text-rose-300/90 text-xs mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* SUCCESSFUL DECODE CARD: "Show me his code at what is written" */}
        {decodedInfo && (
          <div
            id="decoded-result-card"
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-emerald-500/60 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header: Type and Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-md">
                      Decoded Successfully
                    </span>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded-md">
                      {decodedInfo.type.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {decodedInfo.title}
                  </h3>
                </div>
              </div>

              {/* Action: Load into Live Generator */}
              <button
                type="button"
                id="btn-load-into-generator"
                onClick={() => {
                  onLoadIntoGenerator(decodedInfo.rawText);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>Load in Generator & Live Edit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Breakdown of "What is Written Inside" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Specific Decoded Parameters */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Decoded Content Breakdown
                </h4>

                {/* WI-FI SPECIFIC DETAILS */}
                {decodedInfo.type === 'wifi' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 font-medium">Network Name (SSID):</span>
                      <span className="text-white font-bold font-mono text-sm">
                        {decodedInfo.parsedData.ssid}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 font-medium">Security Type:</span>
                      <span className="text-blue-400 font-bold uppercase">
                        {decodedInfo.parsedData.encryption}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          Wi-Fi Password:
                        </span>
                        {decodedInfo.parsedData.password && (
                          <button
                            type="button"
                            onClick={() => copyToClipboard(decodedInfo.parsedData.password, true)}
                            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {copiedPass ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedPass ? 'Copied' : 'Copy Password'}
                          </button>
                        )}
                      </div>

                      {decodedInfo.parsedData.password ? (
                        <div className="flex items-center justify-between gap-2 pt-1 font-mono text-sm font-bold text-amber-300">
                          <span>{showPassword ? decodedInfo.parsedData.password : '••••••••••••'}</span>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      ) : (
                        <p className="text-emerald-400 font-semibold text-xs">
                          Open Network (No password required)
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* URL SPECIFIC DETAILS */}
                {decodedInfo.type === 'url' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 block mb-1">Target Website:</span>
                      <a
                        href={decodedInfo.parsedData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-semibold font-mono text-xs break-all flex items-center gap-1.5"
                      >
                        <span>{decodedInfo.parsedData.url}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  </div>
                )}

                {/* VCARD SPECIFIC DETAILS */}
                {decodedInfo.type === 'vcard' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400">Name:</span>
                      <span className="text-white font-bold">{decodedInfo.parsedData.name}</span>
                    </div>
                    {decodedInfo.parsedData.phone && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-zinc-400">Phone:</span>
                        <span className="text-blue-400 font-mono font-bold">{decodedInfo.parsedData.phone}</span>
                      </div>
                    )}
                    {decodedInfo.parsedData.email && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-zinc-400">Email:</span>
                        <span className="text-blue-400 font-mono">{decodedInfo.parsedData.email}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* PLAIN TEXT / OTHER DETAILS */}
                {['text', 'email', 'phone', 'sms', 'payment'].includes(decodedInfo.type) && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                      <p className="text-zinc-300 whitespace-pre-wrap font-sans text-xs">
                        {decodedInfo.description || decodedInfo.rawText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Box 2: Raw Code Output ("Show me his code at what is written") */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-blue-400" />
                      Exact Raw QR Code Payload
                    </h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(decodedInfo.rawText)}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedRaw ? 'Copied Code' : 'Copy Code'}
                    </button>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-300 break-all select-all max-h-36 overflow-y-auto leading-relaxed">
                    {decodedInfo.rawText}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                  <span>Characters: {decodedInfo.rawText.length}</span>
                  <span className="text-emerald-400 font-medium">Ready to regenerate</span>
                </div>
              </div>
            </div>

            {/* Quick Test Demo Samples */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-400 font-medium">Try another image or:</span>
              <button
                type="button"
                onClick={() => {
                  setDecodedInfo(null);
                  setUploadedImagePreview(null);
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold cursor-pointer transition-colors"
              >
                Scan Another QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
