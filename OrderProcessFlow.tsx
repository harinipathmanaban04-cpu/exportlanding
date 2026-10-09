import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  FileQuestion, 
  FileText, 
  ShoppingCart, 
  Truck, 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export interface WorkflowStage {
  id: number;
  number: string;
  name: string;
  description: string;
  phase: 'Acquisition' | 'Commercial' | 'Fulfillment' | 'Settlement';
  handoffData: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    number: '01',
    name: 'Customer',
    description: 'Add the buyer once to the customer directory.',
    phase: 'Acquisition',
    handoffData: 'Buyer ID & KYC Profile',
    duration: '< 1 min',
    icon: UserCheck,
    accentColor: '#3B82F6',
  },
  {
    id: 2,
    number: '02',
    name: 'Enquiry',
    description: 'Log what they asked for, in what quantity and at what target price.',
    phase: 'Acquisition',
    handoffData: 'RFQ Specifications & Target Price',
    duration: '2 min',
    icon: FileQuestion,
    accentColor: '#6366F1',
  },
  {
    id: 3,
    number: '03',
    name: 'Quotation',
    description: 'Prepare a quote from the enquiry with one click.',
    phase: 'Commercial',
    handoffData: 'Margin-Locked Price & Terms',
    duration: 'Instant (1-click)',
    icon: FileText,
    accentColor: '#8B5CF6',
  },
  {
    id: 4,
    number: '04',
    name: 'Sales order',
    description: 'Convert the accepted quote and follow it through six stages.',
    phase: 'Commercial',
    handoffData: 'Signed Contract & SO Number',
    duration: 'Automated',
    icon: ShoppingCart,
    accentColor: '#EC4899',
  },
  {
    id: 5,
    number: '05',
    name: 'Shipment',
    description: 'Create the linked consignment and track it to arrival.',
    phase: 'Fulfillment',
    handoffData: 'Bill of Lading & GPS Tracking',
    duration: 'Live Transit',
    icon: Truck,
    accentColor: '#F59E0B',
  },
  {
    id: 6,
    number: '06',
    name: 'Invoice',
    description: 'Issue the commercial invoice from the same order.',
    phase: 'Fulfillment',
    handoffData: 'Tax Compliant Commercial Invoice',
    duration: 'Zero-entry sync',
    icon: Receipt,
    accentColor: '#10B981',
  },
  {
    id: 7,
    number: '07',
    name: 'Payment',
    description: 'Record what the buyer has paid and see the balance.',
    phase: 'Settlement',
    handoffData: 'Reconciled Bank Transfer Receipt',
    duration: 'Real-time',
    icon: CreditCard,
    accentColor: '#06B6D4',
  },
  {
    id: 8,
    number: '08',
    name: 'Completed',
    description: 'The order closes with its full history intact.',
    phase: 'Settlement',
    handoffData: 'Archived Audit Trail & Ledger',
    duration: 'Complete',
    icon: CheckCircle2,
    accentColor: '#14B8A6',
  },
];

export interface OrderProcessFlowProps {
  theme?: 'warm' | 'dark' | 'clean';
  initialActiveStep?: number;
  autoPlayIntervalMs?: number;
}

export const OrderProcessFlow: React.FC<OrderProcessFlowProps> = ({
  theme = 'warm',
  initialActiveStep = 1,
  autoPlayIntervalMs = 2400
}) => {
  const [activeStageId, setActiveStageId] = useState<number>(initialActiveStep);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<'connected-cards' | 'timeline' | 'pipeline'>('connected-cards');
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);

  // Auto-simulation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStageId((prev) => (prev >= 8 ? 1 : prev + 1));
      }, autoPlayIntervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, autoPlayIntervalMs]);

  const activeStage = WORKFLOW_STAGES.find((s) => s.id === activeStageId) || WORKFLOW_STAGES[0];

  // Theme palettes
  const themeStyles = {
    warm: {
      bg: 'bg-[#F4EFEA]',
      cardBg: 'bg-[#FAF7F2]',
      cardBorder: 'border-[#E6DFD5]',
      cardActiveBorder: 'border-stone-900',
      textPrimary: 'text-stone-900',
      textMuted: 'text-stone-600',
      pillBg: 'bg-stone-200/70',
      connector: 'bg-stone-300',
      activeConnector: 'bg-stone-900',
      badge: 'bg-stone-900 text-stone-100',
    },
    dark: {
      bg: 'bg-slate-950',
      cardBg: 'bg-slate-900/80 backdrop-blur-md',
      cardBorder: 'border-slate-800',
      cardActiveBorder: 'border-amber-400',
      textPrimary: 'text-slate-100',
      textMuted: 'text-slate-400',
      pillBg: 'bg-slate-800',
      connector: 'bg-slate-800',
      activeConnector: 'bg-amber-400',
      badge: 'bg-amber-400 text-slate-950',
    },
    clean: {
      bg: 'bg-slate-50',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      cardActiveBorder: 'border-blue-600',
      textPrimary: 'text-slate-900',
      textMuted: 'text-slate-500',
      pillBg: 'bg-slate-100',
      connector: 'bg-slate-200',
      activeConnector: 'bg-blue-600',
      badge: 'bg-blue-600 text-white',
    }
  }[theme];

  return (
    <div className={`w-full max-w-7xl mx-auto p-6 md:p-10 rounded-3xl transition-colors duration-500 ${themeStyles.bg}`}>
      {/* Header section with subtitle & simulation controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-black/5 dark:bg-white/10 text-stone-700 dark:text-stone-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Seamless Data Continuity
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight ${themeStyles.textPrimary}`}>
            Each stage hands its details to the next, so the order never has to be re-entered.
          </h2>
          <p className={`mt-2 text-sm md:text-base ${themeStyles.textMuted}`}>
            Zero manual duplication. An immutable digital thread carries customer requirements through shipment and settlement.
          </p>
        </div>

        {/* Action toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Layout switcher */}
          <div className="inline-flex p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
            <button
              onClick={() => setLayoutMode('connected-cards')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'connected-cards'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-stone-900 dark:text-white'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Connected Grid
            </button>
            <button
              onClick={() => setLayoutMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'pipeline'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-stone-900 dark:text-white'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Pipeline Ribbon
            </button>
            <button
              onClick={() => setLayoutMode('timeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'timeline'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-stone-900 dark:text-white'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Interactive Focus
            </button>
          </div>

          {/* Simulation button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 shadow-sm transition-all"
          >
            {isPlaying ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Simulate Order Flow
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Line Indicator */}
      <div className="relative mb-10 px-2">
        <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-stone-900 dark:bg-amber-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(activeStageId / 8) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs font-mono text-stone-400 dark:text-slate-500">
          <span>Stage 01: Initiation</span>
          <span>Handoff Progress: {Math.round((activeStageId / 8) * 100)}%</span>
          <span>Stage 08: Settlement</span>
        </div>
      </div>

      {/* VIEW 1: CONNECTED CARDS GRID (Modern 2x4 with directional flow) */}
      {layoutMode === 'connected-cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStageId === stage.id;
            const isCompleted = activeStageId > stage.id;
            const isHovered = hoveredStageId === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                onMouseEnter={() => setHoveredStageId(stage.id)}
                onMouseLeave={() => setHoveredStageId(null)}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${themeStyles.cardBg} ${
                  isActive
                    ? `shadow-xl ring-2 ring-stone-900/10 dark:ring-amber-400/20 ${themeStyles.cardActiveBorder} -translate-y-1`
                    : `${themeStyles.cardBorder} hover:shadow-md hover:-translate-y-0.5`
                }`}
              >
                {/* Active pulse glow */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}

                {/* Top header of card: Number Badge & Phase */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-semibold text-sm transition-all duration-300 ${
                          isActive
                            ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-slate-950 scale-110 shadow-sm'
                            : isCompleted
                            ? 'bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-slate-300'
                            : 'bg-stone-100 text-stone-500 dark:bg-slate-800/50 dark:text-slate-500'
                        }`}
                      >
                        {stage.number}
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-stone-400 dark:text-slate-500">
                        {stage.phase}
                      </span>
                    </div>

                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-black/5 dark:bg-white/10 text-stone-900 dark:text-white'
                          : 'text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className={`text-lg font-bold tracking-tight mb-2 ${themeStyles.textPrimary}`}>
                    {stage.name}
                  </h3>

                  {/* Stage Description */}
                  <p className={`text-xs md:text-sm leading-relaxed mb-4 ${themeStyles.textMuted}`}>
                    {stage.description}
                  </p>
                </div>

                {/* Bottom: Handoff data badge */}
                <div className="pt-3 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 dark:text-slate-500 flex items-center gap-1">
                      Hands over:
                    </span>
                    <span className="font-mono text-stone-400 dark:text-slate-500">
                      {stage.duration}
                    </span>
                  </div>
                  <div className={`mt-1.5 px-2.5 py-1 rounded-md text-xs font-medium flex items-center justify-between ${
                    isActive 
                      ? 'bg-stone-900/5 text-stone-900 dark:bg-amber-400/10 dark:text-amber-300 font-semibold' 
                      : 'bg-black/[0.03] text-stone-600 dark:bg-white/5 dark:text-slate-400'
                  }`}>
                    <span className="truncate">{stage.handoffData}</span>
                    <ArrowRight className={`w-3 h-3 ml-1 shrink-0 transition-transform ${isHovered || isActive ? 'translate-x-1' : ''}`} />
                  </div>
                </div>

                {/* Direction indicator between cards (for desktop) */}
                {idx !== 3 && idx !== 7 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] ${
                      isCompleted ? 'bg-stone-900 text-white border-stone-900 dark:bg-amber-400 dark:text-slate-950 dark:border-amber-400' : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-400'
                    }`}>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: PIPELINE RIBBON (Horizontal scrollable conveyor) */}
      {layoutMode === 'pipeline' && (
        <div className="relative overflow-x-auto pb-4">
          <div className="min-w-[980px] flex items-stretch gap-3">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStageId === stage.id;
              const isCompleted = activeStageId > stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex-1 min-w-[210px] p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${themeStyles.cardBg} ${
                    isActive
                      ? `ring-2 ring-stone-900 ${themeStyles.cardActiveBorder} shadow-lg scale-102`
                      : `${themeStyles.cardBorder} hover:border-stone-400`
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                      isActive ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-slate-950' : 'bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {stage.number}
                    </span>
                    <Icon className="w-4 h-4 text-stone-400" />
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${themeStyles.textPrimary}`}>{stage.name}</h4>
                  <p className={`text-xs line-clamp-3 mb-3 ${themeStyles.textMuted}`}>{stage.description}</p>
                  
                  <div className="text-[11px] font-mono text-stone-500 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <div className="text-[9px] uppercase tracking-wider text-stone-400">Transfers</div>
                    <div className="truncate font-medium">{stage.handoffData}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: INTERACTIVE FOCUS (Spotlight on the selected stage) */}
      {layoutMode === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Stage selector pills */}
          <div className="lg:col-span-5 space-y-2">
            {WORKFLOW_STAGES.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-slate-950 border-transparent shadow-md'
                      : `${themeStyles.cardBg} ${themeStyles.cardBorder} text-stone-700 dark:text-stone-300 hover:border-stone-400`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold opacity-75">{stage.number}</span>
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{stage.name}</span>
                  </div>
                  <span className="text-xs opacity-60 font-mono">{stage.phase}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Highlight Card */}
          <div className="lg:col-span-7">
            <div className={`p-8 md:p-10 rounded-3xl border shadow-xl ${themeStyles.cardBg} ${themeStyles.cardActiveBorder} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                {React.createElement(activeStage.icon, { className: 'w-48 h-48' })}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-stone-900/5 dark:bg-white/10 text-stone-700 dark:text-stone-300 mb-6">
                STAGE {activeStage.number} • {activeStage.phase.toUpperCase()}
              </div>

              <h3 className={`text-3xl font-bold tracking-tight mb-4 ${themeStyles.textPrimary}`}>
                {activeStage.name}
              </h3>

              <p className={`text-lg leading-relaxed mb-8 ${themeStyles.textMuted}`}>
                {activeStage.description}
              </p>

              {/* Data pipeline transfer simulation */}
              <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                  Zero-Re-entry Data Transfer
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-white">
                      Payload Sent to Next Stage:
                    </div>
                    <div className="text-xs text-stone-500 font-mono mt-0.5">
                      {activeStage.handoffData}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-slate-300">
                      {activeStage.duration}
                    </span>
                    <button
                      onClick={() => setActiveStageId(activeStageId >= 8 ? 1 : activeStageId + 1)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-white dark:text-stone-900 hover:opacity-90 transition-opacity"
                    >
                      Next Stage
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom context caption */}
      <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>Auto-synchronizing fields across 8 operational stages</span>
        </div>
        <div className="font-mono">
          Master Export Pro • Unified Order Lifecycle
        </div>
      </div>
    </div>
  );
};

export default OrderProcessFlow;
