import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import { Icons } from './components/Icons';
import { CorrectorView } from './views/CorrectorView';
import { ConverterView } from './views/ConverterView';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [apiStatus, setApiStatus] = useState<'active' | 'demo' | 'error'>('active');

  useEffect(() => {
    // Check if API key is configured with safety check for 'process'
    try {
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        setApiStatus('active');
      } else {
        setApiStatus('demo');
      }
    } catch (e) {
      setApiStatus('demo');
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="relative isolate pt-4">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 -z-10 transform-gpu overflow-hidden blur-3xl w-full h-full pointer-events-none opacity-50">
              <div className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-blob" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
              <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-[30rem] h-[30rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-6 py-12 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                <div className="flex">
                  <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/50 backdrop-blur-sm">
                    <span className="font-semibold text-primary">Novidade</span>
                    <span className="h-4 w-px bg-gray-900/10" aria-hidden="true"></span>
                    <span className="flex items-center gap-1">Suporte a OCR via Imagem <Icons.ArrowRightLeft className="w-3 h-3" /></span>
                  </div>
                </div>
                <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
                  Escreva com <span className="text-gradient">Excelência</span> e Inteligência.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Eleve o nível da sua comunicação profissional. Nossa IA corrige, reescreve e traduz seus textos instantaneamente, garantindo clareza e impacto.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <button
                    onClick={() => setActiveTab('corrector')}
                    className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-2"
                  >
                    Começar Agora <Icons.ArrowRightLeft className="w-4 h-4 rotate-180" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Saiba mais <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              
              {/* Floating Mockup */}
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                <div className="relative mx-auto w-[22rem] max-w-full drop-shadow-2xl lg:mr-0 lg:ml-10 animate-float">
                   <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl">
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-700/50 p-3 rounded-lg border-l-4 border-red-400">
                          <p className="text-gray-400 text-xs line-through">Reunião as 14h pra falar do projeto.</p>
                        </div>
                        <div className="flex justify-center">
                          <Icons.ArrowRightLeft className="text-slate-500 w-5 h-5 rotate-90" />
                        </div>
                        <div className="bg-primary/20 p-3 rounded-lg border-l-4 border-primary">
                          <p className="text-white text-sm font-medium">Gostaria de agendar uma reunião às 14h para discutirmos os detalhes do projeto.</p>
                        </div>
                        <div className="pt-2 flex justify-end">
                           <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full">Gemini 3 Pro</span>
                        </div>
                      </div>
                   </div>
                   {/* Decorative circle behind */}
                   <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
              <div className="mx-auto max-w-2xl lg:text-center mb-16">
                <h2 className="text-base font-semibold leading-7 text-primary">Recursos Poderosos</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Tudo o que você precisa para escrever melhor
                </p>
              </div>
              
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  
                  {/* Card 1 */}
                  <div 
                    onClick={() => setActiveTab('corrector')}
                    className="glass-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white group-hover:scale-110 transition-transform">
                      <Icons.SpellCheck className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <dt className="text-xl font-bold leading-7 text-slate-900">
                      Correção Instantânea
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                      <p className="flex-auto">Elimine erros gramaticais e de pontuação em segundos. A IA entende o contexto para correções precisas.</p>
                      <p className="mt-6">
                        <span className="text-sm font-semibold leading-6 text-primary group-hover:text-primary-dark flex items-center gap-1">
                          Testar agora <Icons.ArrowRightLeft className="w-3 h-3" />
                        </span>
                      </p>
                    </dd>
                  </div>

                  {/* Card 2 */}
                  <div 
                    onClick={() => setActiveTab('corrector')}
                    className="glass-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white group-hover:scale-110 transition-transform">
                      <Icons.Wand2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <dt className="text-xl font-bold leading-7 text-slate-900">
                      Reescrita Inteligente
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                      <p className="flex-auto">Transforme textos informais em comunicações profissionais. Ajuste o tom, clareza e coesão com um clique.</p>
                      <p className="mt-6">
                        <span className="text-sm font-semibold leading-6 text-secondary group-hover:text-violet-700 flex items-center gap-1">
                          Melhorar texto <Icons.ArrowRightLeft className="w-3 h-3" />
                        </span>
                      </p>
                    </dd>
                  </div>

                  {/* Card 3 */}
                  <div 
                    onClick={() => setActiveTab('converter')}
                    className="glass-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white group-hover:scale-110 transition-transform">
                      <Icons.FileImage className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <dt className="text-xl font-bold leading-7 text-slate-900">
                      OCR Avançado
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                      <p className="flex-auto">Extraia texto de imagens, PDFs digitalizados e fotos de documentos. Converta o mundo físico para digital.</p>
                      <p className="mt-6">
                        <span className="text-sm font-semibold leading-6 text-orange-600 group-hover:text-orange-700 flex items-center gap-1">
                          Converter arquivo <Icons.ArrowRightLeft className="w-3 h-3" />
                        </span>
                      </p>
                    </dd>
                  </div>

                </dl>
              </div>
            </div>
            
            {/* Trust/Stats Section */}
            <div className="bg-white py-16 sm:py-24 border-t border-gray-100">
               <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-y-8 text-center lg:grid-cols-3">
                     <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">Palavras processadas</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">+1 Milhão</dd>
                     </div>
                     <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">Precisão da IA</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">99.8%</dd>
                     </div>
                     <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">Formatos suportados</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Texto & Imagem</dd>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'corrector':
        return <CorrectorView />;
      case 'converter':
        return <ConverterView />;
      case 'about':
        return (
          <div className="animate-fade-in max-w-4xl mx-auto py-10">
             <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                       <Icons.Info className="w-10 h-10" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-bold text-slate-900">Sobre o Corretor AI</h2>
                     <p className="text-gray-500">Potencializando a comunicação humana.</p>
                   </div>
                </div>
                
                <div className="prose prose-lg text-slate-600 max-w-none">
                   <p className="lead text-xl text-slate-700 font-medium">
                     O Corretor AI não é apenas uma ferramenta de correção; é seu parceiro de escrita inteligente.
                   </p>
                   <p>
                     Nossa missão é democratizar o acesso à escrita impecável. Seja você um estudante redigindo um TCC, um profissional escrevendo e-mails cruciais ou um criador de conteúdo, nossa tecnologia garante que sua mensagem seja entregue com clareza e precisão.
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-6 my-10">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                         <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Icons.Zap className="w-5 h-5 text-yellow-500" /> Tecnologia
                         </h3>
                         <p className="text-sm">Utilizamos os modelos Gemini 3 Flash e Pro do Google para oferecer velocidade incomparável e raciocínio profundo em cada análise.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                         <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Icons.Lock className="w-5 h-5 text-green-500" /> Privacidade
                         </h3>
                         <p className="text-sm">Seus textos são processados em tempo real e não são armazenados para treinamento de modelos sem seu consentimento.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50/50">
      {/* Modern Header */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${activeTab === 'home' ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' : 'bg-white border-b border-gray-200'}`}>
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl flex items-center justify-center shadow-lg">
                <Icons.SpellCheck className="w-6 h-6" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Corretor<span className="text-primary">AI</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
            {(['home', 'corrector', 'converter', 'about'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab === 'home' && 'Início'}
                {tab === 'corrector' && 'Corretor'}
                {tab === 'converter' && 'Conversor'}
                {tab === 'about' && 'Sobre'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             {/* Status Badge */}
             <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                apiStatus === 'active' 
                  ? 'bg-green-500/10 text-green-700 border-green-500/20' 
                  : 'bg-amber-500/10 text-amber-700 border-amber-500/20'
             }`}>
                <div className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${apiStatus === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${apiStatus === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                </div>
                {apiStatus === 'active' ? 'Online' : 'Demo'}
             </div>

             <button className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
               Login
             </button>
             <button 
                onClick={() => setActiveTab('corrector')}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
             >
               Começar Grátis
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {renderContent()}
      </main>

      {/* Dark Modern Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <Icons.SpellCheck className="w-6 h-6 text-primary" />
                <span>CorretorAI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Transformando a maneira como o mundo escreve. Inteligência artificial a serviço da clareza e da comunicação.
              </p>
              <div className="flex gap-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                    <Icons.Info className="w-4 h-4" />
                 </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Produto</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => setActiveTab('corrector')} className="hover:text-primary transition-colors">Corretor Gramatical</button></li>
                <li><button onClick={() => setActiveTab('corrector')} className="hover:text-primary transition-colors">Reescrita de Texto</button></li>
                <li><button onClick={() => setActiveTab('converter')} className="hover:text-primary transition-colors">OCR & Conversão</button></li>
                <li><button onClick={() => setActiveTab('corrector')} className="hover:text-primary transition-colors">Tradutor PT-EN</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Recursos</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guias de Estilo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API para Devs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status do Sistema</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-12 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Corretor AI Ltda. Feito com tecnologia Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;