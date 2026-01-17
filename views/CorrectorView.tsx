import React, { useState } from 'react';
import { processText, generateSpeech, playAudio } from '../services/geminiService';
import { ProcessingStats, ProcessingType } from '../types';
import { Icons } from '../components/Icons';

const EXAMPLE_TEXT = `Ola, como vc está? Espero que esteja bem. Gostaria de compartilhar algumas ideias para o proximo projeto. Acho que podemos melhorar a comunicação entre os departamentos e implementar novas soluções tecnologicas. Vamos marcar uma reunião para discutir esses pontos importantes?`;

export const CorrectorView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [stats, setStats] = useState<ProcessingStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastAction, setLastAction] = useState<ProcessingType | null>(null);

  const handleProcess = async (type: ProcessingType) => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStats(null);
    setLastAction(type);
    const startTime = Date.now();

    try {
      const { text, model } = await processText(inputText, type);
      
      const endTime = Date.now();
      setOutputText(text);
      setStats({
        charCount: text.length,
        wordCount: text.split(/\s+/).length,
        processingTime: (endTime - startTime) / 1000,
        modelUsed: model
      });
    } catch (error) {
      alert('Ocorreu um erro ao processar o texto. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!outputText || isSpeaking) return;
    
    setIsSpeaking(true);
    try {
      const audioData = await generateSpeech(outputText);
      await playAudio(audioData);
    } catch (error) {
      console.error("Error playing audio", error);
      alert("Não foi possível gerar o áudio.");
    } finally {
      setIsSpeaking(false);
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultado_ai.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Icons.SpellCheck className="w-6 h-6 text-secondary" />
          Corretor e Melhoria de Texto
        </h2>
        <p className="text-gray-500">
          Utilize a inteligência artificial para corrigir gramática, melhorar o estilo, traduzir ou explicar erros.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <textarea
              className="w-full h-[400px] p-5 border border-gray-600 bg-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none shadow-sm text-white leading-relaxed text-base placeholder-gray-400"
              placeholder="Cole ou digite seu texto aqui..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-300 bg-slate-900/50 px-2 py-1 rounded">
              {inputText.length} caracteres
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleProcess(ProcessingType.CORRECTION)}
              disabled={isLoading || !inputText}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {isLoading && lastAction === ProcessingType.CORRECTION ? <Icons.Loader2 className="animate-spin w-4 h-4" /> : <Icons.SpellCheck className="w-4 h-4" />}
              Corretor
            </button>
            <button
              onClick={() => handleProcess(ProcessingType.IMPROVEMENT)}
              disabled={isLoading || !inputText}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {isLoading && lastAction === ProcessingType.IMPROVEMENT ? <Icons.Loader2 className="animate-spin w-4 h-4" /> : <Icons.Wand2 className="w-4 h-4" />}
              Melhorar
            </button>
            <button
              onClick={() => handleProcess(ProcessingType.EXPLANATION)}
              disabled={isLoading || !inputText}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {isLoading && lastAction === ProcessingType.EXPLANATION ? <Icons.Loader2 className="animate-spin w-4 h-4" /> : <Icons.BookOpen className="w-4 h-4" />}
              Explicar
            </button>
            <button
              onClick={() => handleProcess(ProcessingType.TRANSLATION)}
              disabled={isLoading || !inputText}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {isLoading && lastAction === ProcessingType.TRANSLATION ? <Icons.Loader2 className="animate-spin w-4 h-4" /> : <Icons.ArrowRightLeft className="w-4 h-4" />}
              Traduzir
            </button>
            <button
              onClick={() => setInputText('')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 border border-gray-300 rounded-lg transition-colors ml-auto text-sm"
            >
              <Icons.Eraser className="w-4 h-4" />
              Limpar
            </button>
            <button
              onClick={() => setInputText(EXAMPLE_TEXT)}
              className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 border border-primary/30 rounded-lg transition-colors text-sm"
            >
              <Icons.Lightbulb className="w-4 h-4" />
              Exemplo
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative h-[400px] bg-gray-50 border border-gray-200 rounded-lg shadow-inner overflow-hidden flex flex-col">
            {outputText ? (
              <div className="p-5 h-full overflow-y-auto whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
                {outputText}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                {isLoading ? (
                  <>
                    <Icons.Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                    <p>Processando seu texto com IA...</p>
                  </>
                ) : (
                  <>
                    <Icons.Bot className="w-12 h-12 mb-4 opacity-20" />
                    <p className="italic">O resultado aparecerá aqui.</p>
                  </>
                )}
              </div>
            )}
            
            {outputText && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className={`p-2 rounded-full shadow-md transition-all ${isSpeaking ? 'bg-primary text-white animate-pulse' : 'bg-white text-gray-600 hover:text-primary'}`}
                  title="Ouvir (TTS)"
                >
                  {isSpeaking ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <Icons.Volume2 className="w-5 h-5" />}
                </button>
                <div className="w-px h-8 bg-gray-300 mx-1"></div>
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-full shadow-md transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:text-primary'}`}
                  title="Copiar"
                >
                  {copied ? <Icons.Check className="w-5 h-5" /> : <Icons.Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadText}
                  className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-primary transition-colors"
                  title="Baixar .txt"
                >
                  <Icons.Download className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Stats Panel */}
          {stats && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-sm animate-fade-in-up">
              <div className="flex items-center gap-2 text-green-800 font-medium">
                <Icons.CheckCircle className="w-5 h-5" />
                <span>Processamento concluído</span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center gap-1.5" title="Palavras">
                  <Icons.Type className="w-4 h-4" />
                  <strong>{stats.wordCount}</strong> palavras
                </span>
                <span className="flex items-center gap-1.5" title="Tempo">
                  <Icons.Clock className="w-4 h-4" />
                  <strong>{stats.processingTime.toFixed(2)}s</strong>
                </span>
                <span className="flex items-center gap-1.5" title="Modelo IA">
                  <Icons.Bot className="w-4 h-4" />
                  <span className="text-xs uppercase bg-green-200 px-1.5 py-0.5 rounded text-green-800 font-bold">{stats.modelUsed.replace('gemini-', '')}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};