import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Maximize, Minimize, Volume2, VolumeX, RotateCcw, Monitor, MonitorPlay, 
  HelpCircle, X, Download, Activity, Settings, Gamepad2, Laptop,
  Flame, Droplets, Zap, Leaf, Snowflake, Mountain, Wind, Skull, 
  Ghost, Star, Circle, Bug, ChevronRight, User, Play, Server, Music, 
  ArrowLeft, Smartphone, Cpu, Hash, Mail, Battery, Wifi, MousePointer2, 
  Menu as MenuIcon, PlayCircle, Power
} from 'lucide-react';

// --- Definições de Tipos ---
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

interface Move {
  name: string;
  power: number;
  type: string;
  accuracy: number;
  pp: number;
}

interface Pokemon {
  name: string;
  spriteClassic: string;
  spriteHD: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  moves: Move[];
  id: number;
  types: string[];
}

// --- Constantes de Idioma ---
const LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇧🇷', apiCode: 'pt-br' },
  { code: 'en', name: 'English', flag: '🇺🇸', apiCode: 'en' },
  { code: 'es', name: 'Español', flag: '🇪🇸', apiCode: 'es' },
];

const TRANSLATIONS: any = {
  pt: {
    login_title: 'POKÉ-OS v5.4',
    login_prompt: 'INSIRA IDENTIFICAÇÃO:',
    boot_seq: 'INICIANDO SISTEMA DE BATALHA...',
    enter_name: 'NOME DO TREINADOR:',
    start_btn: 'INICIAR [ENTER]',
    connecting: 'CONECTANDO...',
    validating: 'VALIDANDO DADOS...',
    finding_match: 'BUSCANDO OPONENTE...',
    loading: 'CARREGANDO',
    init: 'Batalha Iniciada!',
    searching: 'Procurando...',
    wild_appeared: 'Um {name} selvagem apareceu!',
    error_api: 'Erro na API.',
    used: 'usou',
    damage: 'levou {damage} dano!',
    super_effective: 'Super efetivo!',
    not_effective: 'Pouco efetivo...',
    fainted: 'desmaiou!',
    won: 'Vitória!',
    lost: 'Derrota...',
    what_will_do: 'O que {name} fará?',
    attack: 'Atacar',
    settings: 'Config',
    fullscreen: 'Tela Cheia',
    restart: 'Reiniciar',
    sound: 'Sons',
    music: 'Música',
    graphics: 'Gráficos',
    fps: 'FPS',
    install: 'Instalar',
    help: 'Ajuda',
    system: 'SISTEMA',
    visual: 'VISUAL',
    language: 'IDIOMA',
    commands: 'COMANDOS',
    sim_beta: 'SIMULADOR',
    close: 'Fechar',
    esc: 'ESC',
    back: 'Voltar',
    about_device: 'Sobre o Dispositivo',
    device_name: 'Nome',
    model: 'Modelo',
    software_info: 'Software',
    serial_number: 'Serial',
    owner: 'Dono',
    kernel: 'Versão Kernel',
    security_patch: 'Patch Segurança',
    battery: 'Bateria',
    network: 'Rede',
    easter_egg_msg: 'TERMINAL DE DEPURAÇÃO ATIVADO',
    menu_title: 'MENU DE PAUSA',
    menu_resume: 'Continuar',
    menu_reset: 'Reiniciar Sistema',
    menu_settings: 'Configurações',
    menu_help: 'Ajuda / Comandos',
    mobile_dpad_help: 'Use o D-Pad para navegar',
    select_action: 'Selecione uma Ação'
  },
  en: {
    login_title: 'POKÉ-OS v5.4',
    login_prompt: 'ENTER ID:',
    boot_seq: 'BOOTING SYSTEM...',
    enter_name: 'TRAINER NAME:',
    start_btn: 'START [ENTER]',
    connecting: 'CONNECTING...',
    validating: 'VALIDATING...',
    finding_match: 'SEARCHING...',
    loading: 'LOADING',
    init: 'Battle Start!',
    searching: 'Searching...',
    wild_appeared: 'Wild {name} appeared!',
    error_api: 'API Error.',
    used: 'used',
    damage: 'took {damage} dmg!',
    super_effective: 'Super effective!',
    not_effective: 'Not effective...',
    fainted: 'fainted!',
    won: 'Victory!',
    lost: 'Defeat...',
    what_will_do: '{name} action?',
    attack: 'Attack',
    settings: 'Config',
    fullscreen: 'Fullscreen',
    restart: 'Restart',
    sound: 'SFX',
    music: 'Music',
    graphics: 'Graphics',
    fps: 'FPS',
    install: 'Install',
    help: 'Help',
    system: 'SYSTEM',
    visual: 'VISUAL',
    language: 'LANGUAGE',
    commands: 'CONTROLS',
    sim_beta: 'SIMULATOR',
    close: 'Close',
    esc: 'ESC',
    back: 'Back',
    about_device: 'About Device',
    device_name: 'Name',
    model: 'Model',
    software_info: 'Software',
    serial_number: 'Serial',
    owner: 'Owner',
    kernel: 'Kernel Ver.',
    security_patch: 'Security Patch',
    battery: 'Battery',
    network: 'Network',
    easter_egg_msg: 'DEBUG TERMINAL ACTIVATED',
    menu_title: 'PAUSE MENU',
    menu_resume: 'Resume',
    menu_reset: 'System Reset',
    menu_settings: 'Settings',
    menu_help: 'Help / Controls',
    mobile_dpad_help: 'Use D-Pad to navigate',
    select_action: 'Select Action'
  },
  es: {
    login_title: 'POKÉ-OS v5.4',
    login_prompt: 'INGRESAR ID:',
    boot_seq: 'INICIANDO SISTEMA...',
    enter_name: 'NOMBRE:',
    start_btn: 'INICIAR [ENTER]',
    connecting: 'CONECTANDO...',
    validating: 'VALIDANDO...',
    finding_match: 'BUSCANDO...',
    loading: 'CARGANDO',
    init: '¡Batalla!',
    searching: 'Buscando...',
    wild_appeared: '¡{name} salvaje!',
    error_api: 'Error API.',
    used: 'usó',
    damage: '¡{damage} daño!',
    super_effective: '¡Súper efectivo!',
    not_effective: 'Poco efectivo...',
    fainted: 'cayó!',
    won: '¡Victoria!',
    lost: 'Derrota...',
    what_will_do: '¿Qué hará {name}?',
    attack: 'Atacar',
    settings: 'Ajustes',
    fullscreen: 'Pantalla',
    restart: 'Reiniciar',
    sound: 'Sonidos',
    music: 'Música',
    graphics: 'Gráficos',
    fps: 'FPS',
    install: 'Instalar',
    help: 'Ayuda',
    system: 'SISTEMA',
    visual: 'VISUAL',
    language: 'IDIOMA',
    commands: 'CONTROLES',
    sim_beta: 'SIMULADOR',
    close: 'Cerrar',
    esc: 'ESC',
    back: 'Volver',
    about_device: 'Acerca del Dispositivo',
    device_name: 'Nombre',
    model: 'Modelo',
    software_info: 'Software',
    serial_number: 'Serial',
    owner: 'Propietario',
    kernel: 'Versión Kernel',
    security_patch: 'Parche Seguridad',
    battery: 'Batería',
    network: 'Red',
    easter_egg_msg: 'TERMINAL DE DEPURACIÓN ACTIVADO',
    menu_title: 'MENÚ DE PAUSA',
    menu_resume: 'Continuar',
    menu_reset: 'Reiniciar Sistema',
    menu_settings: 'Configuración',
    menu_help: 'Ayuda / Controles',
    mobile_dpad_help: 'Usa el D-Pad para navegar',
    select_action: 'Selecciona Acción'
  }
};

const BACKGROUNDS: any = {
    normal: 'https://images.unsplash.com/photo-1513569771920-c9e1d3171d63?q=80&w=1000&auto=format&fit=crop', 
    fire: 'https://images.unsplash.com/photo-1462331940185-007e897e0529?q=80&w=1000&auto=format&fit=crop', 
    water: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', 
    electric: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop', 
    grass: 'https://images.unsplash.com/photo-1448375240586-dfd8f3793306?q=80&w=1000&auto=format&fit=crop', 
    ice: 'https://images.unsplash.com/photo-1478719059408-592965723cb3?q=80&w=1000&auto=format&fit=crop', 
    fighting: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop', 
    poison: 'https://images.unsplash.com/photo-1615796707894-5b9285474714?q=80&w=1000&auto=format&fit=crop', 
    ground: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop', 
    flying: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1000&auto=format&fit=crop', 
    psychic: 'https://images.unsplash.com/photo-1534274988754-0d27e091d294?q=80&w=1000&auto=format&fit=crop', 
    bug: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop', 
    rock: 'https://images.unsplash.com/photo-1486649961855-758f95e2004d?q=80&w=1000&auto=format&fit=crop', 
    ghost: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1000&auto=format&fit=crop', 
    dragon: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop', 
    steel: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=1000&auto=format&fit=crop', 
    fairy: 'https://images.unsplash.com/photo-1518098268026-4e1491a43371?q=80&w=1000&auto=format&fit=crop', 
};

// --- MOTOR DE ÁUDIO ---
const AudioEngine = {
  ctx: null as AudioContext | null,
  isPlayingBGM: false,
  timerID: undefined as number | undefined,

  init: () => {
    if (!AudioEngine.ctx) {
      // @ts-ignore
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) AudioEngine.ctx = new AudioContextClass();
    }
  },

  playTone: (freq: number, type: OscillatorType, duration: number, vol = 0.1, when = 0) => {
    if (!AudioEngine.ctx) return;
    try {
      const osc = AudioEngine.ctx.createOscillator();
      const gain = AudioEngine.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, when || AudioEngine.ctx.currentTime);
      gain.gain.setValueAtTime(vol, when || AudioEngine.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, (when || AudioEngine.ctx.currentTime) + duration);
      osc.connect(gain);
      gain.connect(AudioEngine.ctx.destination);
      osc.start(when || AudioEngine.ctx.currentTime);
      osc.stop((when || AudioEngine.ctx.currentTime) + duration);
    } catch (e) {}
  },

  startBGM: () => {
    if (AudioEngine.isPlayingBGM || !AudioEngine.ctx) return;
    AudioEngine.isPlayingBGM = true;
    AudioEngine.init();
    if(AudioEngine.ctx?.state === 'suspended') AudioEngine.ctx.resume();
    
    let noteIndex = 0;
    const melody = [ 
       196, 196, 196, 246.94, 196, 246.94, 293.66, 246.94, 
       196, 196, 196, 246.94, 196, 246.94, 293.66, 246.94
    ];
    
    const scheduleNotes = () => {
       if(!AudioEngine.isPlayingBGM || !AudioEngine.ctx) return;
       const tempo = 0.15; 
       const now = AudioEngine.ctx.currentTime;
       const freq = melody[noteIndex % melody.length];
       AudioEngine.playTone(freq, 'square', 0.05, 0.03, now);
       if(noteIndex % 2 === 0) AudioEngine.playTone(98, 'triangle', 0.1, 0.05, now);
       noteIndex++;
       AudioEngine.timerID = window.setTimeout(scheduleNotes, tempo * 1000);
    };
    scheduleNotes();
  },

  stopBGM: () => {
    AudioEngine.isPlayingBGM = false;
    clearTimeout(AudioEngine.timerID);
  },

  playSound: (effect: string) => {
    try {
        AudioEngine.init();
        if (AudioEngine.ctx?.state === 'suspended') AudioEngine.ctx.resume();
        switch (effect) {
          case 'select': AudioEngine.playTone(600, 'square', 0.1); break;
          case 'menu-move': AudioEngine.playTone(450, 'square', 0.05); break;
          case 'start': AudioEngine.playTone(400, 'square', 0.1); setTimeout(() => AudioEngine.playTone(600, 'square', 0.2), 100); break;
          case 'attack': AudioEngine.playTone(150, 'sawtooth', 0.1); setTimeout(() => AudioEngine.playTone(100, 'sawtooth', 0.2), 50); break;
          case 'damage': AudioEngine.playTone(100, 'square', 0.15); setTimeout(() => AudioEngine.playTone(80, 'square', 0.15), 100); break;
          case 'super-effective': AudioEngine.playTone(800, 'square', 0.1); setTimeout(() => AudioEngine.playTone(1200, 'square', 0.3), 100); break;
          case 'faint': AudioEngine.playTone(300, 'sawtooth', 0.3); setTimeout(() => AudioEngine.playTone(200, 'sawtooth', 0.4), 200); setTimeout(() => AudioEngine.playTone(100, 'sawtooth', 0.5), 400); break;
          case 'fire': AudioEngine.playTone(100, 'sawtooth', 0.3); setTimeout(() => AudioEngine.playTone(80, 'sawtooth', 0.2), 100); break;
          case 'water': AudioEngine.playTone(400, 'sine', 0.2); setTimeout(() => AudioEngine.playTone(300, 'sine', 0.1), 100); break;
          case 'electric': AudioEngine.playTone(800, 'sawtooth', 0.1); setTimeout(() => AudioEngine.playTone(1200, 'square', 0.1), 50); break;
          case 'login': AudioEngine.playTone(880, 'sine', 0.1); setTimeout(() => AudioEngine.playTone(1108, 'sine', 0.2), 150); break;
          case 'glitch': 
             for(let i=0; i<10; i++) {
               setTimeout(() => AudioEngine.playTone(Math.random()*1000+100, 'sawtooth', 0.05, 0.2), i*50);
             }
             break;
          case 'key': AudioEngine.playTone(800, 'square', 0.02, 0.05); break;
          case 'enter': AudioEngine.playTone(600, 'square', 0.05, 0.1); break;
        }
    } catch (e) {}
  }
};

const ToggleSwitch = ({ label, icon: Icon, checked, onChange, colorClass = "bg-blue-500" }: any) => (
  <div onClick={onChange} className="flex justify-between items-center p-2 bg-gray-800/50 hover:bg-gray-800/80 rounded-lg cursor-pointer transition-all border border-gray-700/50 hover:border-gray-600 group mb-2">
    <div className="flex items-center gap-2 text-gray-300 group-hover:text-white">
      {Icon && <Icon size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />}
      <span className="font-hd text-[10px] font-bold tracking-wide uppercase">{label}</span>
    </div>
    <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${checked ? colorClass : 'bg-gray-700'}`}>
      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${checked ? 'left-4.5' : 'left-0.5'}`}></div>
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, label, value, onClick }: any) => (
  <div onClick={onClick} className={`flex items-center justify-between p-3 border-b border-gray-800 last:border-0 ${onClick ? 'cursor-pointer hover:bg-gray-800/50 active:bg-gray-800' : ''}`}>
    <div className="flex items-center gap-3 text-gray-400">
      <Icon size={16} className="text-blue-400" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-gray-300 text-xs font-mono truncate max-w-[150px] text-right">{value}</span>
  </div>
);

// --- D-PAD COMPONENT ---
const DPad = ({ onDirection, activeBtn }: { onDirection: (dir: string) => void, activeBtn?: string | null }) => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    <div className="w-10 h-10 bg-gray-800 rounded absolute top-0 cursor-pointer active:bg-gray-600 shadow-lg border-2 border-gray-700" onClick={() => onDirection('UP')}><div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div>
    <div className="w-10 h-10 bg-gray-800 rounded absolute bottom-0 cursor-pointer active:bg-gray-600 shadow-lg border-2 border-gray-700" onClick={() => onDirection('DOWN')}><div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div>
    <div className="w-10 h-10 bg-gray-800 rounded absolute left-0 cursor-pointer active:bg-gray-600 shadow-lg border-2 border-gray-700" onClick={() => onDirection('LEFT')}><div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div>
    <div className="w-10 h-10 bg-gray-800 rounded absolute right-0 cursor-pointer active:bg-gray-600 shadow-lg border-2 border-gray-700" onClick={() => onDirection('RIGHT')}><div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div>
    <div className="w-10 h-10 bg-gray-800 absolute z-10 rounded-sm"></div>
    <div className="w-3 h-3 bg-gray-900 rounded-full absolute z-20 shadow-inner"></div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [appState, setAppState] = useState<'LOGIN' | 'LOADING' | 'GAME'>('LOGIN');
  const [trainerName, setTrainerName] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [loadingSprite, setLoadingSprite] = useState<string | null>(null);
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt');
  const [playerPoke, setPlayerPoke] = useState<Pokemon | null>(null);
  const [enemyPoke, setEnemyPoke] = useState<Pokemon | null>(null);
  const [combatLog, setCombatLog] = useState("");
  const [turn, setTurn] = useState<'PLAYER' | 'ENEMY' | 'END'>('PLAYER');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [graphicsMode, setGraphicsMode] = useState<'CLASSIC' | 'HD'>('CLASSIC');
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState<'MAIN' | 'ABOUT'>('MAIN');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showFps, setShowFps] = useState(false);
  const [fps, setFps] = useState(0);
  const [battleEffect, setBattleEffect] = useState<{ type: string, target: 'PLAYER' | 'ENEMY' } | null>(null);
  const [loading, setLoading] = useState(true); 
  
  // Menu & Controller States
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [menuSelection, setMenuSelection] = useState(0); // 0: Resume, 1: Settings, 2: Reset, 3: Help
  const [focusedMoveIndex, setFocusedMoveIndex] = useState(0); // 0-3

  // Easter Egg / Terminal States
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
      "POKÉ-OS KERNEL v5.3.2-generic [tty1]",
      "Copyright (c) 1996-2025 Silph Co.",
      "",
      "Welcome to the debug terminal.",
      "Type 'help' for available commands.",
      ""
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language]; 
  const gameStateRef = useRef({ playerPoke, enemyPoke, turn, appState, animating, isFullScreen, soundOn, musicOn, graphicsMode, showHelp, showFps, showSettings, language, showTerminal, gameMenuOpen, menuSelection, focusedMoveIndex });
  const playerSpriteRef = useRef<HTMLImageElement>(null);
  const enemySpriteRef = useRef<HTMLImageElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  // Keep ref updated
  useEffect(() => {
    gameStateRef.current = { playerPoke, enemyPoke, turn, appState, animating, isFullScreen, soundOn, musicOn, graphicsMode, showHelp, showFps, showSettings, language, showTerminal, gameMenuOpen, menuSelection, focusedMoveIndex };
  }, [playerPoke, enemyPoke, turn, appState, animating, isFullScreen, soundOn, musicOn, graphicsMode, showFps, showSettings, language, showTerminal, gameMenuOpen, menuSelection, focusedMoveIndex]);

  useEffect(() => {
    if (showTerminal && terminalEndRef.current) {
        terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, showTerminal]);

  // FPS
  useEffect(() => {
    if (!showFps) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    const loop = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [showFps]);

  // Audio
  useEffect(() => {
    if (musicOn && appState === 'GAME') AudioEngine.startBGM();
    else AudioEngine.stopBGM();
  }, [musicOn, appState]);

  useEffect(() => {
    isMobile.current = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const handleFsChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // --- CONTROLLER LOGIC ---
  const handleDPad = (direction: string) => {
      const s = gameStateRef.current;
      if (s.soundOn) AudioEngine.playSound('menu-move');
      
      if (s.gameMenuOpen) {
          // Navigate Menu
          setMenuSelection(prev => {
              if (direction === 'UP') return prev > 0 ? prev - 1 : 3;
              if (direction === 'DOWN') return prev < 3 ? prev + 1 : 0;
              return prev;
          });
      } else if (s.appState === 'GAME' && s.turn === 'PLAYER') {
          // Navigate Moves
          setFocusedMoveIndex(prev => {
              if (direction === 'UP' && prev > 1) return prev - 2;
              if (direction === 'DOWN' && prev < 2) return prev + 2;
              if (direction === 'LEFT' && prev % 2 !== 0) return prev - 1;
              if (direction === 'RIGHT' && prev % 2 === 0) return prev + 1;
              return prev;
          });
      }
  };

  const handleActionBtn = (btn: 'A' | 'B' | 'START' | 'SELECT') => {
      const s = gameStateRef.current;
      if (s.soundOn && btn !== 'START') AudioEngine.playSound('select'); // Start has its own sound logic usually, or reuse select

      if (btn === 'START') {
          setGameMenuOpen(prev => !prev);
          if (!s.gameMenuOpen && s.soundOn) AudioEngine.playSound('select');
          return;
      }

      if (s.gameMenuOpen) {
          if (btn === 'A') {
              switch (s.menuSelection) {
                  case 0: setGameMenuOpen(false); break; // Resume
                  case 1: toggleSettings(); break; // Settings
                  case 2: startGame(); setGameMenuOpen(false); break; // Reset
                  case 3: toggleHelp(); break; // Help
              }
          } else if (btn === 'B') {
              setGameMenuOpen(false);
          }
      } else {
          if (btn === 'A' && s.appState === 'GAME' && s.turn === 'PLAYER') {
              attack(s.focusedMoveIndex);
          }
          if (btn === 'SELECT') {
             toggleHelp();
          }
      }
  };

  // --- EASTER EGG / TERMINAL HANDLER ---
  const handleKernelClick = () => {
      setEasterEggClicks(prev => {
          const newCount = prev + 1;
          if (newCount >= 7) {
              setShowTerminal(true);
              setShowSettings(false); 
              if(soundOn) AudioEngine.playSound('glitch');
              return 0;
          }
          return newCount;
      });
  };

  const closeTerminal = () => {
      setShowTerminal(false);
      setEasterEggClicks(0);
      setTerminalHistory([
          "POKÉ-OS KERNEL v5.3.2-generic [tty1]",
          "Copyright (c) 1996-2025 Silph Co.",
          "",
          "Welcome to the debug terminal.",
          "Type 'help' for available commands.",
          ""
      ]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!terminalInput.trim()) return;

      const cmd = terminalInput.trim().toLowerCase();
      const newHistory = [...terminalHistory, `root@poke-os:~# ${terminalInput}`];
      
      if (soundOn) AudioEngine.playSound('enter');

      switch(cmd) {
          case 'help':
              newHistory.push(
                  "Available commands:",
                  "  specs    - Display hardware information",
                  "  cpu      - Show CPU details",
                  "  ram      - Show Memory usage",
                  "  storage  - List storage devices",
                  "  whoami   - Current user info",
                  "  clear    - Clear terminal screen",
                  "  exit     - Close debug terminal"
              );
              break;
          case 'specs':
              newHistory.push(
                  "----------------------------------------",
                  "HARDWARE INFORMATION",
                  "----------------------------------------",
                  "MOBO:     Silph Co. Z-99 Titanium",
                  "CHIPSET:  Unknown Dungeon X570",
                  "BIOS:     OAK-BIOS v1.0.4",
                  "POWER:    Voltorb Core Reactor 850W",
                  "CASE:     Porygon-Z Geometric Chassis"
              );
              break;
          case 'cpu':
              newHistory.push(
                  "PROCESSOR:",
                  "  Model: Rotom Quantum Core i9",
                  "  Cores: 16 Physical / 32 Logic",
                  "  Clock: 5.2 GHz (Overclocked)",
                  "  Temp:  45°C (Cooling: Cloyster Liquid)"
              );
              break;
          case 'ram':
          case 'memory':
              newHistory.push(
                  "MEMORY (RAM):",
                  "  Total: 128 GB Alakazam HyperMemory",
                  "  Type:  DDR5 Psychic-Sync",
                  "  Speed: 6400 MT/s",
                  "  Usage: 14% (System Stable)"
              );
              break;
          case 'storage':
          case 'disk':
              newHistory.push(
                  "STORAGE DEVICES:",
                  "  [sda] 1PB Porygon Infinite Drive (NVMe)",
                  "  [sdb] 10TB Snorlax Archive HDD (Sleeping)",
                  "  [sdc] 512GB Mewtwo Secret Cache"
              );
              break;
          case 'whoami':
              newHistory.push(`User: ${trainerName || 'GUEST_TRAINER'}`, "Groups: admin, trainers, gym_leaders");
              break;
          case 'clear':
          case 'cls':
              setTerminalHistory([]);
              setTerminalInput("");
              return;
          case 'exit':
              closeTerminal();
              return;
          default:
              newHistory.push(`bash: ${cmd}: command not found. Type 'help'.`);
      }

      setTerminalHistory(newHistory);
      setTerminalInput("");
  };

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!trainerName.trim()) return;
      if (soundOn) AudioEngine.playSound('login');
      setAppState('LOADING');
      const steps = [{ text: t.connecting, delay: 1000 }, { text: t.validating, delay: 1000 }, { text: t.finding_match, delay: 1000 }];
      const loadRandomSprite = async () => {
          const id = Math.floor(Math.random() * 151) + 1;
          try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
              const data = await res.json();
              setLoadingSprite(data.sprites.front_default);
          } catch(e) {}
      };
      let totalDelay = 0;
      loadRandomSprite();
      for (const step of steps) {
          setTimeout(() => { setLoadingText(step.text); loadRandomSprite(); }, totalDelay);
          totalDelay += step.delay;
      }
      setTimeout(() => {
          startGame();
          setAppState('GAME');
      }, totalDelay + 1000);
  };

  // --- FETCH DATA ---
  const fetchPokemonData = async (id: number, isPlayer: boolean, langCode: string): Promise<Pokemon | null> => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      const validMoves = (data.moves as any[]).filter(m => m.move.url);
      const selectedMoves: Move[] = [];
      const shuffled = validMoves.sort(() => 0.5 - Math.random()).slice(0, 4);
      const apiLang = LANGUAGES.find(l => l.code === langCode)?.apiCode || 'en';
      for (let m of shuffled) {
        const moveRes = await fetch(m.move.url);
        const moveData = await moveRes.json();
        const translatedName = moveData.names.find((n: any) => n.language.name === apiLang)?.name || moveData.names.find((n: any) => n.language.name === 'en')?.name || moveData.name;
        selectedMoves.push({ name: translatedName, power: moveData.power || 40, type: moveData.type.name, accuracy: moveData.accuracy || 100, pp: moveData.pp });
      }
      const officialArtwork = data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default;
      return { name: data.name.toUpperCase(), spriteClassic: isPlayer ? data.sprites.back_default : data.sprites.front_default, spriteHD: isPlayer ? data.sprites.back_default : officialArtwork, hp: data.stats[0].base_stat * 2, maxHp: data.stats[0].base_stat * 2, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, moves: selectedMoves, id: data.id, types: data.types.map((t: any) => t.type.name) };
    } catch (e) { return null; }
  };

  const startGame = useCallback(async () => {
    setPlayerPoke(null);
    setEnemyPoke(null);
    setLoading(true);
    const currentLang = gameStateRef.current.language;
    setTurn('PLAYER');
    setCombatLog(TRANSLATIONS[currentLang].init);
    
    const p1Id = Math.random() > 0.5 ? 25 : Math.floor(Math.random() * 151) + 1; 
    const p2Id = Math.random() > 0.5 ? 1 : Math.floor(Math.random() * 151) + 1;
    
    const p1 = await fetchPokemonData(p1Id, true, currentLang);
    const p2 = await fetchPokemonData(p2Id, false, currentLang);
    
    setPlayerPoke(p1);
    setEnemyPoke(p2);
    
    if (p2) setCombatLog(TRANSLATIONS[currentLang].wild_appeared.replace('{name}', p2.name));
    setLoading(false);
    if(gameStateRef.current.soundOn) AudioEngine.playSound('start');
  }, []);

  const attack = useCallback((moveIndex: number) => {
    const state = gameStateRef.current;
    if (state.animating || !state.playerPoke || !state.enemyPoke) return;
    if (state.turn !== 'PLAYER') return;
    const move = state.playerPoke.moves[moveIndex];
    executeTurn(state.playerPoke, state.enemyPoke, move, true);
  }, []);

  useEffect(() => {
    if (turn === 'ENEMY' && enemyPoke && playerPoke && !animating && appState === 'GAME') {
      const timer = setTimeout(() => {
        const randomMove = enemyPoke.moves[Math.floor(Math.random() * enemyPoke.moves.length)];
        executeTurn(enemyPoke, playerPoke, randomMove, false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [turn, animating, enemyPoke, playerPoke, appState]);

  const executeTurn = (attacker: Pokemon, defender: Pokemon, move: Move, isPlayerTurn: boolean) => {
    setAnimating(true);
    if(gameStateRef.current.soundOn) AudioEngine.playSound('select');
    const currentT = TRANSLATIONS[gameStateRef.current.language];
    setCombatLog(`${attacker.name} ${currentT.used} ${move.name.toUpperCase()}!`);
    const sprite = isPlayerTurn ? playerSpriteRef.current : enemySpriteRef.current;
    const targetSprite = isPlayerTurn ? enemySpriteRef.current : playerSpriteRef.current;
    if(sprite) sprite.classList.add(isPlayerTurn ? 'animate-lunge-right' : 'animate-lunge-left');
    setTimeout(() => {
      if(sprite) sprite.classList.remove(isPlayerTurn ? 'animate-lunge-right' : 'animate-lunge-left');
      if(gameStateRef.current.soundOn) {
          if (['fire', 'water', 'electric'].includes(move.type)) AudioEngine.playSound(move.type as any);
          else AudioEngine.playSound('attack');
      }
      setBattleEffect({ type: move.type, target: isPlayerTurn ? 'ENEMY' : 'PLAYER' });
      setTimeout(() => setBattleEffect(null), 800);
      if(targetSprite) targetSprite.classList.add('animate-shake', 'brightness-150', 'sepia');
      setTimeout(() => {
        if(targetSprite) targetSprite.classList.remove('animate-shake', 'brightness-150', 'sepia');
        const random = (Math.floor(Math.random() * 15) + 85) / 100;
        let damage = Math.floor(((attacker.attack / defender.defense) * move.power * 0.5) * random);
        if (damage < 1) damage = 1;
        let newHp = defender.hp - damage;
        if (newHp < 0) newHp = 0;
        const updateState = isPlayerTurn ? setEnemyPoke : setPlayerPoke;
        updateState(prev => prev ? ({ ...prev, hp: newHp }) : null);
        if(gameStateRef.current.soundOn) AudioEngine.playSound('damage');
        let effectiveness = "";
        if (move.power > 70) effectiveness = currentT.super_effective;
        else if (move.power < 40) effectiveness = currentT.not_effective;
        setCombatLog(`${defender.name} ${currentT.damage.replace('{damage}', damage.toString())} ${effectiveness}`);
        if (newHp <= 0) {
          setTimeout(() => {
            if(gameStateRef.current.soundOn) AudioEngine.playSound('faint');
            setCombatLog(`${defender.name} ${currentT.fainted} ${isPlayerTurn ? currentT.won : currentT.lost}`);
            setTurn('END');
            setAnimating(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setAnimating(false);
            if (isPlayerTurn) setTurn('ENEMY');
            else {
              setTurn('PLAYER');
              setCombatLog(currentT.what_will_do.replace('{name}', attacker.name === gameStateRef.current.playerPoke?.name ? attacker.name : gameStateRef.current.playerPoke?.name || ''));
            }
          }, 1500);
        }
      }, 500); 
    }, 300); 
  };

  // --- RENDER HELPER ---
  const renderBattleEffect = () => {
    if (!battleEffect) return null;
    const isEnemyTarget = battleEffect.target === 'ENEMY';
    const positionClass = isEnemyTarget ? 'top-[15%] right-[15%]' : 'bottom-[15%] left-[15%]';
    let Icon = Star; let color = 'text-white'; let animation = 'animate-ping';
    switch(battleEffect.type) {
        case 'fire': Icon = Flame; color = 'text-orange-500'; animation = 'animate-bounce'; break;
        case 'water': Icon = Droplets; color = 'text-blue-500'; animation = 'animate-pulse'; break;
        case 'electric': Icon = Zap; color = 'text-yellow-400'; animation = 'animate-shake'; break;
        case 'grass': Icon = Leaf; color = 'text-green-500'; animation = 'animate-spin-slow'; break;
        case 'ice': Icon = Snowflake; color = 'text-cyan-300'; animation = 'animate-pulse'; break;
        case 'rock': case 'ground': Icon = Mountain; color = 'text-yellow-800'; animation = 'animate-bounce'; break;
        case 'flying': Icon = Wind; color = 'text-sky-300'; animation = 'animate-pulse'; break;
        case 'poison': Icon = Skull; color = 'text-purple-600'; animation = 'animate-pulse'; break;
        case 'ghost': Icon = Ghost; color = 'text-indigo-400'; animation = 'animate-bounce'; break;
        case 'bug': Icon = Bug; color = 'text-lime-500'; animation = 'animate-bounce'; break;
        case 'psychic': Icon = Star; color = 'text-pink-400'; animation = 'animate-spin'; break;
        default: Icon = Circle; color = 'text-gray-200'; animation = 'animate-ping'; break;
    }
    return (<div className={`absolute ${positionClass} z-30 pointer-events-none`}><Icon size={isFullScreen ? 120 : 80} className={`${color} ${animation} drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]`} /></div>);
  };

  // --- TOGGLES ---
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement && mainContainerRef.current) mainContainerRef.current.requestFullscreen().catch(err => console.log(err));
    else if (document.fullscreenElement) document.exitFullscreen();
  }, []);
  const toggleGraphics = useCallback(() => { setGraphicsMode(p => p === 'CLASSIC' ? 'HD' : 'CLASSIC'); if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const toggleSound = useCallback(() => { setSoundOn(p => !p); if(!gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const toggleMusic = useCallback(() => { setMusicOn(p => !p); if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const toggleHelp = useCallback(() => { setShowHelp(p => !p); if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const toggleSettings = useCallback(() => { 
      if (showSettings) { setShowSettings(false); setTimeout(() => setSettingsView('MAIN'), 300); } 
      else { setShowSettings(true); }
      if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); 
  }, [showSettings]);
  const toggleFps = useCallback(() => { setShowFps(p => !p); if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const changeLanguage = useCallback((lang: 'pt' | 'en' | 'es') => { setLanguage(lang); if(gameStateRef.current.soundOn) AudioEngine.playSound('select'); }, []);
  const handleInstall = () => { if (installPrompt) { installPrompt.prompt(); setInstallPrompt(null); } };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current.showSettings || gameStateRef.current.showHelp || gameStateRef.current.showTerminal) { 
         if (e.key === 'Escape') { 
            setShowSettings(false); 
            setShowHelp(false); 
            setShowTerminal(false); 
         } 
         return; 
      }
      if (gameStateRef.current.appState !== 'GAME') return;
      
      // Keyboard mapping to controller
      switch(e.key.toLowerCase()) {
        case 'arrowup': handleDPad('UP'); break;
        case 'arrowdown': handleDPad('DOWN'); break;
        case 'arrowleft': handleDPad('LEFT'); break;
        case 'arrowright': handleDPad('RIGHT'); break;
        
        // FIX: Logic error fixed here
        case 'enter': 
            if(e.ctrlKey) handleActionBtn('START'); 
            else handleActionBtn('A'); 
            break;
        case 'z': handleActionBtn('A'); break;

        case 'x': case 'backspace': handleActionBtn('B'); break;
        
        case '1': attack(0); break; case '2': attack(1); break; case '3': attack(2); break; case '4': attack(3); break;
        case 'r': startGame(); break; case 'f': toggleFullScreen(); break; case 'm': toggleSound(); break; case 'g': toggleGraphics(); break;
        case 'p': toggleFps(); break; case 's': toggleSettings(); break; case 'h': toggleHelp(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attack, startGame, toggleFullScreen, toggleGraphics, toggleSound, toggleFps, toggleSettings, toggleHelp]);

  const getBgImage = () => {
    if (enemyPoke && enemyPoke.types.length > 0) {
        return BACKGROUNDS[enemyPoke.types[0]] || BACKGROUNDS.normal;
    }
    return BACKGROUNDS.normal;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans p-2 md:p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .font-hd { font-family: 'Inter', sans-serif; letter-spacing: -0.5px; }
        .font-terminal { font-family: 'VT323', monospace; }
        .pixelated { image-rendering: pixelated; }
        .grid-bg { background-image: linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px); background-size: 20px 20px; background-color: #3b7c3b; box-shadow: inset 0 0 50px rgba(0,0,0,0.5); }
        .hd-bg { background-color: #1f2937; }
        .scanline { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1)); background-size: 100% 4px; }
        .btn-blue { background: #2988bf; border-top: 4px solid #5bafe0; border-left: 4px solid #5bafe0; border-right: 4px solid #145a85; border-bottom: 4px solid #145a85; color: white; text-shadow: 2px 2px #000; }
        .btn-blue:active:not(:disabled) { border-top: 4px solid #145a85; border-left: 4px solid #145a85; border-right: 4px solid #5bafe0; border-bottom: 4px solid #5bafe0; transform: translate(2px, 2px); }
        .btn-hd { background: linear-gradient(145deg, #3b82f6, #2563eb); border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); color: white; font-weight: bold; transition: all 0.2s; }
        .btn-hd:active { transform: translateY(0); }
        @keyframes shake { 0% { transform: translate(0, 0); } 25% { transform: translate(-5px, 0); } 75% { transform: translate(5px, 0); } 100% { transform: translate(0, 0); } }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        @keyframes lunge-right { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(30px, -10px); } }
        .animate-lunge-right { animation: lunge-right 0.3s forwards; }
        @keyframes lunge-left { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-30px, 10px); } }
        .animate-lunge-left { animation: lunge-left 0.3s forwards; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes breathe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-breathe { animation: breathe 3s ease-in-out infinite; }
        @keyframes glitch { 0% { transform: translate(0) } 20% { transform: translate(-2px, 2px) } 40% { transform: translate(-2px, -2px) } 60% { transform: translate(2px, 2px) } 80% { transform: translate(2px, -2px) } 100% { transform: translate(0) } }
        .animate-glitch { animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111827; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .blinking-cursor::after { content: '▋'; animation: blink 1s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .menu-item-selected { border-left: 4px solid #ef4444; background: linear-gradient(90deg, rgba(239,68,68,0.2), transparent); padding-left: 0.5rem; }
      `}</style>

      {/* CONTÊINER PRINCIPAL (CONSOLE) */}
      <div 
        ref={mainContainerRef}
        className={`relative bg-gray-800 rounded-[2.5rem] p-5 shadow-2xl border-4 border-gray-700 transition-all duration-300 flex flex-col overflow-hidden ${isFullScreen ? 'h-screen w-screen max-w-none border-0 rounded-none justify-center bg-gray-900' : 'w-full max-w-3xl h-auto aspect-[3/5] md:aspect-video md:h-[85vh] mx-auto'}`}
      >
        {/* MODAL CONFIGURAÇÕES (DENTRO DO CONSOLE) */}
        {showSettings && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-900/95 border-2 border-gray-700 w-full max-w-xs rounded-2xl shadow-2xl flex flex-col max-h-[90%] overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
                <h2 className="text-white font-hd font-bold text-lg flex items-center gap-2">
                  {settingsView === 'MAIN' ? (
                    <>
                      <Settings className="text-blue-500" size={20}/> {t.settings.toUpperCase()}
                    </>
                  ) : (
                    <>
                      <button onClick={() => setSettingsView('MAIN')}><ArrowLeft size={20} className="text-gray-400 hover:text-white" /></button>
                      <span className="ml-2">{t.about_device}</span>
                    </>
                  )}
                </h2>
                <button onClick={toggleSettings} className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-4 overflow-y-auto custom-scrollbar space-y-4 font-hd">
                {settingsView === 'MAIN' ? (
                  <>
                    <div><h3 className="text-xs font-bold text-gray-500 mb-2 tracking-wider">{t.language}</h3><div className="grid grid-cols-3 gap-2">{LANGUAGES.map((lang) => (<button key={lang.code} onClick={() => changeLanguage(lang.code as any)} className={`flex flex-col items-center p-1 rounded border transition-all ${language === lang.code ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'}`}><span className="text-xl">{lang.flag}</span><span className="text-[10px] font-bold">{lang.name}</span></button>))}</div></div>
                    <div><h3 className="text-xs font-bold text-gray-500 mb-2 tracking-wider">{t.system}</h3><div className="space-y-1"><ToggleSwitch label={t.sound} icon={soundOn ? Volume2 : VolumeX} checked={soundOn} onChange={toggleSound} colorClass="bg-green-500"/><ToggleSwitch label={t.music} icon={Music} checked={musicOn} onChange={toggleMusic} colorClass="bg-pink-500"/><ToggleSwitch label={t.fullscreen} icon={isFullScreen ? Minimize : Maximize} checked={isFullScreen} onChange={toggleFullScreen} colorClass="bg-blue-500"/>{installPrompt && (<button onClick={handleInstall} className="w-full flex items-center justify-between p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors group"><span className="flex items-center gap-2 font-medium text-xs"><Download size={16}/> {t.install}</span><ChevronRight size={14} className="opacity-50 group-hover:opacity-100"/></button>)}</div></div>
                    <div><h3 className="text-xs font-bold text-gray-500 mb-2 tracking-wider">{t.visual}</h3><div className="space-y-1"><ToggleSwitch label={`${t.graphics}: ${graphicsMode}`} icon={graphicsMode === 'HD' ? MonitorPlay : Monitor} checked={graphicsMode === 'HD'} onChange={toggleGraphics} colorClass="bg-purple-500"/><ToggleSwitch label={t.fps} icon={Activity} checked={showFps} onChange={toggleFps} colorClass="bg-yellow-500"/></div></div>
                    <div className="mt-4 pt-4 border-t border-gray-800"><div onClick={() => setSettingsView('ABOUT')} className="flex justify-between items-center p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-all group"><div className="flex items-center gap-3"><Smartphone size={18} className="text-gray-400 group-hover:text-white"/><span className="text-sm font-bold text-gray-300 group-hover:text-white">{t.about_device}</span></div><ChevronRight size={16} className="text-gray-500 group-hover:text-white"/></div></div>
                  </>
                ) : (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-2 border border-gray-600 shadow-lg">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="logo" className="w-10 h-10 opacity-80" />
                        </div>
                        <h3 className="font-bold text-white">PokéDex 9000</h3>
                        <p className="text-xs text-gray-500">Model PK-2025-PRO</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                        <InfoItem icon={User} label={t.owner} value={trainerName || 'Guest'} />
                        <InfoItem icon={Hash} label={t.serial_number} value="8923-XJ9-PKM" />
                        <InfoItem icon={Cpu} label={t.kernel} value="4.19.112-poke" onClick={handleKernelClick}/>
                        <InfoItem icon={Battery} label={t.battery} value="100% (Charged)" />
                        <InfoItem icon={Wifi} label={t.network} value="Silph Co. 5G" />
                    </div>
                    <div className="text-center pt-4"><p className="text-[10px] text-gray-600 cursor-pointer hover:text-blue-400 transition-colors">System Up to Date</p></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL AJUDA (DENTRO DO CONSOLE) */}
        {showHelp && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={toggleHelp}>
                <div className="bg-gray-900 border-2 border-yellow-600 p-6 rounded-xl max-w-xs w-full shadow-2xl relative text-yellow-500 font-pixel" onClick={e => e.stopPropagation()}><button onClick={toggleHelp} className="absolute top-3 right-3 hover:text-white"><X size={20}/></button><h2 className="text-center mb-6 text-lg tracking-wide">{t.commands}</h2><div className="space-y-3 font-hd text-gray-300 text-xs"><div className="flex justify-between py-2 border-b border-gray-800"><span className="flex items-center gap-2"><Gamepad2 size={14} className="text-gray-500"/> {t.attack}</span><span className="text-white font-mono bg-gray-800 px-2 rounded">1-4</span></div><div className="flex justify-between py-2 border-b border-gray-800"><span className="flex items-center gap-2"><Settings size={14} className="text-gray-500"/> {t.settings}</span><span className="text-white font-mono bg-gray-800 px-2 rounded">S</span></div><div className="flex justify-between py-2 border-b border-gray-800"><span className="flex items-center gap-2"><Laptop size={14} className="text-gray-500"/> {t.fullscreen}</span><span className="text-white font-mono bg-gray-800 px-2 rounded">F</span></div><div className="flex justify-between py-2 border-b border-gray-800"><span className="flex items-center gap-2"><RotateCcw size={14} className="text-gray-500"/> {t.restart}</span><span className="text-white font-mono bg-gray-800 px-2 rounded">R</span></div></div><p className="text-center text-gray-600 text-[10px] mt-6 italic">{t.esc}</p></div>
            </div>
        )}

        {/* GAME MENU OVERLAY */}
        {gameMenuOpen && (
           <div className="absolute inset-0 z-[55] bg-black/90 flex flex-col items-center justify-center animate-fade-in font-pixel">
              <div className="border-2 border-white p-1 w-3/4 max-w-xs rounded shadow-xl bg-gray-800">
                 <div className="border-2 border-white p-4 flex flex-col gap-4">
                     <h2 className="text-center text-yellow-400 mb-2 border-b border-gray-600 pb-2">{t.menu_title}</h2>
                     {[t.menu_resume, t.menu_settings, t.menu_reset, t.menu_help].map((item, idx) => (
                         <div key={idx} className={`text-xs md:text-sm uppercase cursor-pointer transition-all ${menuSelection === idx ? 'menu-item-selected text-white' : 'text-gray-500 pl-2'}`}>
                            {menuSelection === idx && <span className="mr-2 blink">▶</span>}{item}
                         </div>
                     ))}
                 </div>
              </div>
              <div className="mt-4 text-gray-500 text-[10px] font-hd flex items-center gap-2"><Gamepad2 size={12} /> {t.mobile_dpad_help}</div>
           </div>
        )}

        {/* EASTER EGG / TERMINAL SCREEN */}
        {showTerminal && (
           <div className="absolute inset-0 z-[60] bg-black font-terminal text-green-500 p-4 flex flex-col text-lg leading-tight animate-fade-in">
             <div className="flex-grow overflow-y-auto custom-scrollbar mb-2" onClick={() => document.getElementById('terminal-input')?.focus()}>
                {terminalHistory.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
                ))}
                <div ref={terminalEndRef} />
             </div>
             <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-green-800/50 pt-2">
                 <span className="text-green-300 font-bold">root@poke-os:~#</span>
                 <input 
                    id="terminal-input"
                    type="text" 
                    value={terminalInput}
                    onChange={(e) => {
                        setTerminalInput(e.target.value);
                        if(soundOn && e.target.value.length > terminalInput.length) AudioEngine.playSound('key');
                    }}
                    className="flex-grow bg-transparent outline-none text-green-400 blinking-cursor"
                    autoFocus
                    autoComplete="off"
                 />
             </form>
             <button onClick={closeTerminal} className="absolute top-4 right-4 text-green-700 hover:text-green-400"><X size={20}/></button>
           </div>
        )}

        {/* FPS */}
        {showFps && (<div className="absolute top-4 left-4 z-40 font-mono text-[10px] font-bold text-green-400 bg-black/80 px-2 py-1 rounded border border-green-900/50 pointer-events-none">{fps} FPS</div>)}

        {!isFullScreen && (
          <>
            <div className="absolute top-3 left-3 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-gray-600 rotate-45"></div></div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-gray-600 rotate-45"></div></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-gray-600 rotate-45"></div></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-gray-600 rotate-45"></div></div>
          </>
        )}

        {/* HEADER CONSOLE */}
        <div className={`bg-gray-900 rounded-t-2xl p-3 mb-3 border-b-4 border-gray-700 flex justify-between items-center shadow-inner relative overflow-hidden shrink-0 ${isFullScreen ? 'hidden' : ''}`}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-blue-600/50"></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div><div className="w-4 h-1 bg-gray-700 rounded-full"></div></div>
           <h1 className={`font-pixel text-gray-200 text-center text-xs md:text-sm tracking-widest truncate px-2`}>{t.sim_beta} <span className="text-yellow-500">v5.4</span></h1>
           <div className="flex items-center gap-2"><div className="w-4 h-1 bg-gray-700 rounded-full"></div><div className="w-2 h-2 bg-blue-500 rounded-full"></div></div>
        </div>

        {/* ÁREA CENTRAL */}
        <div className={`bg-gray-900 p-3 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] mb-3 relative transition-all duration-500 flex flex-col border border-gray-700 ${isFullScreen ? 'bg-transparent shadow-none p-0 h-full justify-center border-0' : 'flex-grow'}`}>
          
          {/* Botões Flutuantes em Tela Cheia */}
          {isFullScreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-3">
               <button onClick={toggleSettings} className="bg-gray-900/80 backdrop-blur text-white p-3 rounded-full hover:bg-blue-600 transition-all shadow-lg border border-white/10 group"><Settings size={24} className="group-hover:rotate-90 transition-transform duration-500"/></button>
               <button onClick={toggleFullScreen} className="bg-gray-900/80 backdrop-blur text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg border border-white/10"><Minimize size={24}/></button>
            </div>
          )}

          {/* TELA DO JOGO */}
          <div className={`${graphicsMode === 'CLASSIC' ? 'grid-bg border-4 border-black' : 'border-4 border-gray-600 rounded-lg shadow-2xl'} w-full h-full relative overflow-hidden select-none transition-all duration-500 flex flex-col`}>
            {/* CENÁRIO HD */}
            {graphicsMode === 'HD' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                  style={{ backgroundImage: `url(${getBgImage()})`, filter: 'brightness(0.7) contrast(1.2)' }}
                />
            )}
            
            {graphicsMode === 'CLASSIC' && <div className="scanline absolute inset-0 pointer-events-none z-10"></div>}
            
            {/* ESTADO: LOGIN */}
            {appState === 'LOGIN' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-green-400 p-8 font-pixel tracking-widest">
                    <div className="w-full max-w-md border-2 border-green-800 p-6 rounded bg-black/90 shadow-[0_0_20px_rgba(34,197,94,0.2)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 animate-pulse"></div>
                        <h1 className="text-xl mb-8 text-center border-b-2 border-green-900 pb-4 text-green-300">{t.login_header}</h1>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-[10px] text-green-600 mb-2">{t.enter_name}</label>
                                <div className="flex items-center border-b-2 border-green-500">
                                    <span className="mr-2 animate-pulse">➜</span>
                                    <input 
                                        type="text" 
                                        value={trainerName} 
                                        onChange={(e) => setTrainerName(e.target.value)} 
                                        className="w-full bg-transparent text-green-400 focus:outline-none font-hd text-lg uppercase"
                                        autoFocus 
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full border-2 border-green-600 hover:bg-green-900/30 text-green-400 py-3 px-4 rounded transition-colors text-xs mt-4 block cursor-pointer">{t.start_btn}</button>
                        </form>
                        <div className="mt-8 flex justify-center gap-4 border-t border-green-900 pt-4">{LANGUAGES.map((lang) => (<button key={lang.code} onClick={() => changeLanguage(lang.code as any)} className={`text-xl hover:scale-110 transition ${language === lang.code ? 'opacity-100' : 'opacity-30 grayscale'}`}>{lang.flag}</button>))}</div>
                        <div className="absolute bottom-1 right-2 text-[8px] text-green-800">SYS.READY</div>
                    </div>
                </div>
            )}

            {/* ESTADO: LOADING */}
            {appState === 'LOADING' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-green-400 p-8 font-pixel">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <h2 className="text-xl mb-2">{t.boot_seq}</h2>
                        <div className="text-xs text-green-600 font-mono mt-2">&gt; {loadingText}</div>
                    </div>
                </div>
            )}

            {/* ESTADO: GAME */}
            {appState === 'GAME' && (
                <div className="relative w-full h-full flex flex-col">
                    {renderBattleEffect()}
                    
                    <div className="flex-grow relative">
                        {loading || !enemyPoke || !playerPoke ? (
                        <div className="flex items-center justify-center h-full"><p className="font-pixel text-green-500 animate-pulse">DATA ERROR</p></div>
                        ) : (
                        <>
                            <div className="absolute top-2 left-2 z-20 bg-black/60 px-2 py-1 rounded text-[8px] text-blue-300 font-hd border border-blue-500/30 tracking-widest shadow-sm">ID: {trainerName.toUpperCase()}</div>
                            <div className={`absolute top-[5%] right-[5%] w-[40%] ${graphicsMode === 'CLASSIC' ? 'bg-black/50 border-green-800 text-white' : 'bg-white/90 border-white text-gray-800 shadow-lg'} p-2 rounded border z-20 transition-all duration-300`}>
                              <div className={`flex justify-between ${graphicsMode === 'CLASSIC' ? 'font-pixel text-[8px]' : 'font-hd font-bold text-[10px]'} mb-1`}><span>{enemyPoke.name}</span><span>Lv.50</span></div>
                              <div className={`w-full h-2 ${graphicsMode === 'CLASSIC' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 rounded-full overflow-hidden'} rounded border relative`}><div className="h-full transition-all duration-500" style={{ width: `${(enemyPoke.hp / enemyPoke.maxHp) * 100}%`, backgroundColor: (enemyPoke.hp/enemyPoke.maxHp) > 0.5 ? '#4ade80' : '#ef4444' }}></div></div>
                            </div>
                            <div className={`absolute bottom-[5%] left-[5%] w-[40%] ${graphicsMode === 'CLASSIC' ? 'bg-black/50 border-green-800 text-white' : 'bg-white/90 border-white text-gray-800 shadow-lg'} p-2 rounded border z-20 transition-all duration-300`}>
                              <div className={`flex justify-between ${graphicsMode === 'CLASSIC' ? 'font-pixel text-[8px]' : 'font-hd font-bold text-[10px]'} mb-1`}><span>{playerPoke.name}</span><span>Lv.50</span></div>
                              <div className={`w-full h-2 ${graphicsMode === 'CLASSIC' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 rounded-full overflow-hidden'} rounded border relative`}><div className="h-full transition-all duration-500" style={{ width: `${(playerPoke.hp / playerPoke.maxHp) * 100}%`, backgroundColor: (playerPoke.hp/playerPoke.maxHp) > 0.5 ? '#4ade80' : '#ef4444' }}></div></div>
                            </div>
                            <img ref={enemySpriteRef} src={graphicsMode === 'CLASSIC' ? enemyPoke.spriteClassic : enemyPoke.spriteHD} alt="Enemy" className={`absolute top-[15%] right-[15%] w-[25%] h-[25%] object-contain z-10 transition-all duration-500 animate-breathe ${graphicsMode === 'CLASSIC' ? 'pixelated' : 'smooth scale-125 drop-shadow-xl'}`} />
                            <img ref={playerSpriteRef} src={graphicsMode === 'CLASSIC' ? playerPoke.spriteClassic : playerPoke.spriteClassic} alt="Player" className={`absolute bottom-0 left-[15%] w-[30%] h-[30%] object-contain z-10 transition-all duration-500 ${graphicsMode === 'CLASSIC' ? 'pixelated' : 'pixelated scale-110 drop-shadow-xl'}`} />
                        </>
                        )}
                    </div>

                    {/* Console de Texto (Integrado na Tela) */}
                    <div className={`mt-auto ${graphicsMode === 'CLASSIC' ? 'bg-black border-t-4 border-green-800 text-green-400' : 'bg-gray-900/95 border-t border-gray-700 text-white backdrop-blur'} p-3 h-20 flex items-center justify-center relative transition-all`}>
                        <p className={`${graphicsMode === 'CLASSIC' ? 'font-pixel text-[10px]' : 'font-hd text-xs font-medium tracking-wide'} leading-relaxed text-center uppercase`}>{combatLog}</p>
                        {turn === 'END' && <button onClick={startGame} className={`absolute bottom-2 right-2 text-[8px] animate-pulse hover:underline cursor-pointer`}>{t.restart} [R]</button>}
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* CONTROLES FÍSICOS (Botões abaixo da tela - Mobile: GameBoy Style, Desktop: Standard) */}
        <div className={`flex-col md:flex-row gap-3 items-stretch shrink-0 ${isFullScreen && !isMobile.current ? 'hidden' : 'flex'}`}>
          
          {/* LAYOUT DESKTOP (Clássico) - Escondido no Mobile */}
          <div className="hidden md:flex flex-row gap-3 w-full">
            <div className="flex flex-col gap-2 justify-center w-14 bg-gray-700 rounded-lg p-2 border-2 border-gray-600 shadow-inner"><div className="h-10 w-3 bg-yellow-600 border border-black mx-auto rounded mb-1 shadow"></div>{[1,2,3,4].map(i => <div key={i} className="h-1.5 w-full bg-gray-800 rounded-full"></div>)}</div>
            <div className="flex-1 grid grid-cols-2 gap-2 bg-gray-700 p-2 rounded-lg border-inner shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-gray-600">
                {appState === 'GAME' && playerPoke && !loading ? playerPoke.moves.map((move, idx) => (
                <button key={idx} disabled={turn !== 'PLAYER' || loading} onClick={() => attack(idx)} className={`
                    ${graphicsMode === 'CLASSIC' ? 'btn-blue font-pixel text-[9px]' : 'btn-hd font-hd text-xs'} h-12 rounded-lg uppercase transition-all relative group
                    ${(turn !== 'PLAYER' || loading) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:brightness-110 shadow-md'}
                    `}><span className="absolute top-1 left-2 text-[8px] opacity-60 bg-black/20 px-1 rounded hidden md:block">{idx + 1}</span>{graphicsMode === 'CLASSIC' && <span className="mr-1">{idx + 1}.</span>}{move.name}</button>
                )) : ([1,2,3,4].map(i => <div key={i} className="bg-gray-600 h-12 rounded opacity-50 animate-pulse"></div>))}
            </div>
            <div className="w-20 bg-gray-700 rounded-lg border-2 border-gray-600 p-2 flex flex-col justify-around items-center relative shadow-inner">
                <div className="grid grid-cols-1 gap-2 w-full"><button onClick={toggleSettings} title={`${t.settings} [S]`} className="w-10 h-10 bg-blue-600 rounded-full border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center text-white group relative mx-auto hover:bg-blue-500 transition-colors"><Settings size={18} /></button></div>
                <button onClick={() => { if(appState==='GAME') startGame(); else setAppState('LOGIN'); }} className="w-10 h-10 bg-yellow-500 rounded-full border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center mt-1 relative group hover:bg-yellow-400 transition-colors" title={`${t.restart} [R]`}><RotateCcw size={18} className="text-yellow-900" /></button>
            </div>
          </div>

          {/* LAYOUT MOBILE (GamePad) - Visível apenas no Mobile */}
          <div className="md:hidden flex flex-col w-full bg-gray-800 rounded-b-3xl p-2 pt-4 pb-6 relative">
              {/* Texto Auxiliar */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-gray-500 tracking-widest font-hd uppercase">{t.select_action}</div>
              
              <div className="flex justify-between items-end px-4">
                  {/* D-Pad Esquerda */}
                  <DPad onDirection={handleDPad} />

                  {/* Start / Select Centro */}
                  <div className="flex gap-4 mb-4">
                      <div className="flex flex-col items-center gap-1 transform rotate-12 translate-y-4">
                          <button onClick={() => handleActionBtn('SELECT')} className="w-12 h-3 bg-gray-600 rounded-full border border-gray-900 shadow-sm active:bg-gray-500"></button>
                          <span className="text-[8px] font-bold text-gray-500 tracking-widest">SELECT</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 transform rotate-12 translate-y-4">
                          <button onClick={() => handleActionBtn('START')} className="w-12 h-3 bg-gray-600 rounded-full border border-gray-900 shadow-sm active:bg-gray-500"></button>
                          <span className="text-[8px] font-bold text-gray-500 tracking-widest">START</span>
                      </div>
                  </div>

                  {/* Botões de Ação Direita */}
                  <div className="relative w-32 h-32">
                      <div className="absolute bottom-2 right-12 flex flex-col items-center">
                          <button 
                            onClick={() => handleActionBtn('A')} 
                            className={`w-14 h-14 rounded-full border-b-4 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center text-white font-bold text-xl transition-all ${gameMenuOpen || (turn==='PLAYER' && !loading) ? 'bg-red-600 border-red-800 hover:bg-red-500' : 'bg-gray-600 border-gray-700 opacity-50'}`}
                          >A</button>
                          {(!gameMenuOpen && appState==='GAME') && <span className="text-[8px] mt-1 text-gray-400 font-pixel truncate max-w-[60px]">{playerPoke?.moves[focusedMoveIndex]?.name || 'ATTACK'}</span>}
                      </div>
                      <div className="absolute bottom-10 right-0 flex flex-col items-center">
                          <button onClick={() => handleActionBtn('B')} className="w-10 h-10 bg-yellow-500 rounded-full border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center text-yellow-900 font-bold text-sm hover:bg-yellow-400 transition-all">B</button>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
      
      {/* BEZEL SCREWS (Apenas Visual) */}
      {!isFullScreen && (
          <>
            <div className="fixed top-1/2 left-4 w-3 h-3 bg-gray-600/50 rounded-full hidden md:block pointer-events-none"></div>
            <div className="fixed top-1/2 right-4 w-3 h-3 bg-gray-600/50 rounded-full hidden md:block pointer-events-none"></div>
          </>
      )}
    </div>
  );
}