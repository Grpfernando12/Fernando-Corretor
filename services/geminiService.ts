import { GoogleGenAI, Modality } from "@google/genai";
import { ProcessingType } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTIONS = {
  [ProcessingType.CORRECTION]: `
    Atue como um especialista em gramática e ortografia da língua portuguesa.
    Sua tarefa é corrigir erros ortográficos, gramaticais e de pontuação do texto fornecido.
    Mantenha o tom e o estilo original do texto.
    NÃO adicione introduções, explicações ou notas de rodapé.
    Retorne APENAS o texto corrigido.
  `,
  [ProcessingType.IMPROVEMENT]: `
    Atue como um editor de texto profissional sênior.
    Sua tarefa é melhorar a clareza, coesão, fluidez e vocabulário do texto fornecido.
    Torne o texto mais profissional e direto, eliminando redundâncias.
    NÃO altere o significado original da mensagem.
    Retorne APENAS o texto melhorado.
  `,
  [ProcessingType.TRANSLATION]: `
    Atue como um tradutor profissional.
    Traduza o texto fornecido para o Inglês.
    Retorne APENAS o texto traduzido.
  `,
  [ProcessingType.EXPLANATION]: `
    Atue como um professor de língua portuguesa paciente e detalhista.
    Analise o texto fornecido e identifique erros gramaticais, ortográficos ou pontos de melhoria de estilo.
    Para cada erro ou sugestão, explique O PORQUÊ da correção de forma educativa.
    Se o texto estiver perfeito, elogie e explique por que a estrutura está boa.
    Use uma lista ou tópicos para organizar a resposta. Mantenha um tom encorajador.
  `
};

export const processText = async (
  text: string, 
  type: ProcessingType
): Promise<{ text: string; model: string }> => {
  try {
    // Use flash for correction/translation speed, pro for improvement/explanation reasoning
    const modelId = (type === ProcessingType.IMPROVEMENT || type === ProcessingType.EXPLANATION)
      ? 'gemini-3-pro-preview' 
      : 'gemini-3-flash-preview';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS[type],
        temperature: 0.3, 
      }
    });

    const resultText = response.text;
    
    if (!resultText) {
      throw new Error("No content generated");
    }

    return {
      text: resultText.trim(),
      model: modelId
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateSpeech = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio generated");
    }
    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw error;
  }
};

export const extractTextFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Extraia todo o texto visível nesta imagem. Mantenha a formatação original tanto quanto possível. Se for uma tabela, tente representar como texto ou CSV. Se não houver texto, descreva a imagem."
          }
        ]
      }
    });

    return response.text || "Não foi possível extrair texto da imagem.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
};

// Singleton AudioContext to manage browser resources
let audioContext: AudioContext | null = null;

export const playAudio = async (base64String: string) => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }

  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  // Decode Base64 to Binary
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Convert PCM 16-bit int to Float32
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};