import React, { useRef, useState } from 'react';
import { Icons } from '../components/Icons';
import { ConverterOption } from '../types';
import { extractTextFromImage } from '../services/geminiService';

const CONVERTER_OPTIONS: ConverterOption[] = [
  { id: 'img-text', title: 'Imagem para Texto', description: 'Extraia texto de fotos e scans (OCR)', icon: 'FileImage' },
  { id: 'pdf-text', title: 'PDF para Texto', description: 'Converta conteúdo de PDF para texto (via Imagem)', icon: 'FileText' },
  { id: 'summary', title: 'Resumir Documento', description: 'Extraia os pontos principais de uma imagem', icon: 'Presentation' },
];

export const ConverterView: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleCardClick = () => {
    // All cards trigger the file input for this demo implementation
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    setResult(null);

    try {
      // Check if image
      if (!file.type.startsWith('image/')) {
        alert('Por favor, envie uma imagem (JPG, PNG) para extração de texto.');
        setIsProcessing(false);
        return;
      }

      const base64 = await fileToBase64(file);
      // Remove data URL prefix for API
      const base64Data = base64.split(',')[1];
      
      const text = await extractTextFromImage(base64Data, file.type);
      setResult(text);
    } catch (error) {
      console.error(error);
      alert('Erro ao processar arquivo. Verifique se é uma imagem válida.');
    } finally {
      setIsProcessing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `convertido-${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const IconComponent = (name: string) => {
    switch(name) {
      case 'FileText': return <Icons.FileText className="w-8 h-8" />;
      case 'Presentation': return <Icons.Presentation className="w-8 h-8" />;
      case 'FileSpreadsheet': return <Icons.FileSpreadsheet className="w-8 h-8" />;
      case 'FileImage': return <Icons.FileImage className="w-8 h-8" />;
      default: return <Icons.FileText className="w-8 h-8" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Icons.ArrowRightLeft className="w-6 h-6 text-secondary" />
          Conversor Inteligente (OCR)
        </h2>
        <p className="text-gray-500">
          Utilize a visão computacional do Gemini para extrair texto de imagens e documentos digitalizados.
        </p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CONVERTER_OPTIONS.map((option) => (
          <div 
            key={option.id}
            onClick={handleCardClick}
            className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              {IconComponent(option.icon)}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{option.title}</h3>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>

      {/* Upload Area / Result Area */}
      {!result && !isProcessing && (
        <div 
          onClick={handleCardClick}
          className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-xl p-12 text-center hover:bg-primary/10 transition-colors cursor-pointer group"
        >
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-6 text-primary group-hover:scale-110 transition-transform">
            <Icons.UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Arraste uma imagem aqui</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Suportamos JPG, PNG e WebP para extração de texto via IA.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
            <Icons.FileInput className="w-5 h-5" />
            Selecionar Imagem
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <Icons.Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Analisando imagem...</h3>
          <p className="text-gray-500">
            A IA está lendo o conteúdo do seu arquivo. Isso pode levar alguns segundos.
          </p>
        </div>
      )}

      {result && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md animate-fade-in-up">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icons.FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold text-gray-700">Texto Extraído de {fileName}</span>
            </div>
            <div className="flex gap-2">
               <button 
                onClick={() => {
                  setResult(null);
                  setFileName('');
                }}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Limpar
              </button>
              <button 
                onClick={downloadResult}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <Icons.Download className="w-4 h-4" />
                Baixar .txt
              </button>
            </div>
          </div>
          <div className="p-6 bg-slate-800">
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-white">
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};