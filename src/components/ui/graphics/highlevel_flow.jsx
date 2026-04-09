import React, { memo, useState, useEffect } from 'react';
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

//const dragable_nodes_config = true;

const baseCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 22,
  color: '#fff',
  boxShadow: '0 12px 30px rgba(0,0,0,0.26)',
  backdropFilter: 'blur(10px)',
};

const zoneStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 30,
  color: '#fff',
};

const BlockNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...baseCard,
        minWidth: data.width || 250,
        maxWidth: data.maxWidth || 320,
        padding: data.padding || 18,
        border: data.border || baseCard.border,
        boxShadow: data.glow || baseCard.boxShadow,
      }}
    >
      {/* LEFT */}
      <Handle type="target" id="left-in" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" id="left-out" position={Position.Left} style={{ opacity: 0 }} />

      {/* RIGHT */}
      <Handle type="target" id="right-in" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" id="right-out" position={Position.Right} style={{ opacity: 0 }} />

      {/* TOP */}
      <Handle type="target" id="top-in" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" id="top-out" position={Position.Top} style={{ opacity: 0 }} />

      {/* BOTTOM */}
      <Handle type="target" id="bottom-in" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom-out" position={Position.Bottom} style={{ opacity: 0 }} />

      <div style={{ fontSize: 12, opacity: 0.62, marginBottom: 6 }}>{data.kicker}</div>
      <div style={{ fontSize: data.titleSize || 18, fontWeight: 700, marginBottom: 8 }}>
        {data.label}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.82 }}>
        {data.description}
      </div>

      {data.badge && (
        <div
          style={{
            marginTop: 14,
            display: 'inline-flex',
            padding: '6px 11px',
            borderRadius: 999,
            fontSize: 12,
            background: data.badgeBg || 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {data.badge}
        </div>
      )}
    </div>
  );
});

const ZoneNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...zoneStyle,
        width: data.width,
        height: data.height,
        padding: 24,
        pointerEvents: 'none',
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.56, marginBottom: 6 }}>{data.kicker}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{data.label}</div>
      <div style={{ fontSize: 13, opacity: 0.72, marginTop: 6, maxWidth: 420 }}>
        {data.description}
      </div>
    </div>
  );
});

const nodeTypes = {
  blockNode: BlockNode,
  zoneNode: ZoneNode,
};

const edgeLabelStyle = {
  fill: '#ffffff',
  fontSize: 12,
  fontWeight: 700,
};

const edgeBgStyle = {
  fill: 'rgba(5, 7, 11, 0.94)',
  stroke: 'rgba(255,255,255,0.14)',
  strokeWidth: 1,
};

const edgeBase = {
  type: 'smoothstep',
  labelStyle: edgeLabelStyle,
  labelShowBg: true,
  labelBgStyle: edgeBgStyle,
  labelBgPadding: [10, 6],
  labelBgBorderRadius: 8,
};

const initialNodes = [
  {
    id: 'zone-local',
    type: 'zoneNode',
    position: { x: 20, y: 100 },
    data: {
      kicker: 'Zona 1',
      label: 'Entorno local',
      description: 'Aquí vive la herramienta, la configuración y la salida visible para el operador.',
      width: 860,
      height: 1080,
    },
    draggable: false,
    selectable: false,
  },
  {
    id: 'zone-remote',
    type: 'zoneNode',
    position: { x: 1000, y: 100 },
    data: {
      kicker: 'Zona 2',
      label: 'Infraestructura remota',
      description: 'Conexiones SSH, grupos monitoreados y fuentes de log remotas.',
      width: 1100,
      height: 1080,
    },
    draggable: false,
    selectable: false,
  },

  // LOCAL
  {
    id: 'user',
    type: 'blockNode',
    position: { x: 80, y: 250 },
    data: {
      kicker: 'Inicio',
      label: 'Usuario / Operador',
      description: 'Ejecuta la herramienta e ingresa la MAC.',
      width: 250,
      maxWidth: 250,
      border: '1px solid rgba(147,197,253,0.28)',
      glow: '0 0 26px rgba(147,197,253,0.08)',
    },
    draggable: false,
  },
  {
    id: 'terminal',
    type: 'blockNode',
    position: { x: 80, y: 500 },
    data: {
      kicker: 'Entorno',
      label: 'Ubuntu Terminal',
      description: 'Entorno local donde corre la solución.',
      width: 250,
      maxWidth: 250,
      border: '1px solid rgba(147,197,253,0.28)',
      glow: '0 0 26px rgba(147,197,253,0.08)',
    },
    draggable: false,
  },
  {
    id: 'config',
    type: 'blockNode',
    position: { x: 430, y: 220 },
    data: {
      kicker: 'Entrada auxiliar',
      label: 'Configuración externa',
      description:
        'Define servidores web, servidores RADIUS, servidor RADIUS activo, políticas de ejecución y parámetros de conexión.',
      width: 290,
      maxWidth: 290,
      border: '1px solid rgba(250,204,21,0.24)',
      glow: '0 0 26px rgba(250,204,21,0.07)',
    },
    draggable: false,
  },
  {
    id: 'orchestrator',
    type: 'blockNode',
    position: { x: 430, y: 680 },
    data: {
      kicker: 'Componente central',
      label: 'Orquestador principal',
      description:
        'Coordina toda la ejecución: recibe entradas, interpreta configuración, abre conexiones remotas, consolida coincidencias y envía el resultado a la consola.',
      badge: 'Punto focal del flujo',
      badgeBg: 'rgba(96,165,250,0.14)',
      width: 380,
      maxWidth: 380,
      padding: 22,
      titleSize: 22,
      border: '1px solid rgba(96,165,250,0.40)',
      glow: '0 0 42px rgba(96,165,250,0.18)',
    },
    draggable: false,
  },
  {
    id: 'console',
    type: 'blockNode',
    position: { x: 250, y: 1010 },
    data: {
      kicker: 'Salida',
      label: 'Consola de salida',
      description: 'Muestra coincidencias, servidor origen y la MAC resaltada.',
      width: 300,
      maxWidth: 300,
      border: '1px solid rgba(134,239,172,0.28)',
      glow: '0 0 26px rgba(134,239,172,0.08)',
    },
    draggable: false,
  },

  // REMOTO
  {
    id: 'ssh',
    type: 'blockNode',
    position: { x: 1210, y: 640 },
    data: {
      kicker: 'Transporte',
      label: 'Conexiones SSH',
      description: 'Canal de comunicación entre el sistema local y los servidores remotos.',
      width: 270,
      maxWidth: 270,
      border: '1px solid rgba(148,163,184,0.28)',
      glow: '0 0 22px rgba(148,163,184,0.07)',
    },
    draggable: false,
  },
  {
    id: 'webGroup',
    type: 'blockNode',
    position: { x: 1420, y: 330 },
    data: {
      kicker: 'Grupo remoto',
      label: 'Grupo Web',
      description: '6 servidores web monitoreados en paralelo.',
      badge: '6 nodos',
      width: 280,
      maxWidth: 280,
      border: '1px solid rgba(96,165,250,0.28)',
      glow: '0 0 24px rgba(96,165,250,0.08)',
    },
    draggable: false,
  },
  {
    id: 'radiusGroup',
    type: 'blockNode',
    position: { x: 1420, y: 820 },
    data: {
      kicker: 'Grupo remoto',
      label: 'Grupo RADIUS',
      description: '2 servidores disponibles, pero solo 1 activo por ejecución.',
      badge: '2 nodos / 1 activo',
      width: 280,
      maxWidth: 280,
      border: '1px solid rgba(196,181,253,0.28)',
      glow: '0 0 24px rgba(196,181,253,0.08)',
    },
    draggable: false,
  },

  // LOGS recolocados para carriles limpios
  {
    id: 'webLogs',
    type: 'blockNode',
    position: { x: 1800, y: 150 },
    data: {
      kicker: 'Logs remotos',
      label: '/var/log/nginx/access.log',
      description: 'Fuente de búsqueda para coincidencias del dominio web.',
      width: 300,
      maxWidth: 300,
      border: '1px solid rgba(96,165,250,0.22)',
      glow: '0 0 18px rgba(96,165,250,0.06)',
    },
    draggable: false,
  },
  {
    id: 'radiusLogs',
    type: 'blockNode',
    position: { x: 1800, y: 1000 },
    data: {
      kicker: 'Logs remotos',
      label: '/var/log/freeradius/radius.log',
      description: 'Fuente de búsqueda para coincidencias del dominio RADIUS.',
      width: 300,
      maxWidth: 300,
      border: '1px solid rgba(196,181,253,0.22)',
      glow: '0 0 18px rgba(196,181,253,0.06)',
    },
    draggable: false,
  },
];

const initialEdges = [
  
    {
        ...edgeBase,
        id: 'web-logs',
        source: 'webGroup',
        sourceHandle: 'right-out',
        target: 'webLogs',
        targetHandle: 'left-in',
        animated: true,
        label: 'lee logs web',
        style: { stroke: 'rgba(96,165,250,0.92)', strokeWidth: 3 },
        pathOptions: { borderRadius: 24, offset: 30 },
    },
    {
        ...edgeBase,
        id: 'radius-logs',
        source: 'radiusGroup',
        sourceHandle: 'right-out',
        target: 'radiusLogs',
        targetHandle: 'top-in',
        animated: true,
        label: 'lee logs radius',
        style: { stroke: 'rgba(196,181,253,0.92)', strokeWidth: 3 },
        pathOptions: { borderRadius: 24, offset: 30 },
    },

    // retorno superior: Web -> orquestador por arriba
    {
        ...edgeBase,
        id: 'weblogs-orchestrator',
        source: 'webLogs',
        sourceHandle: 'bottom-out',
        target: 'orchestrator',
        targetHandle: 'top-in',
        animated: true,
        label: 'coincidencias web',
        style: {
            stroke: 'rgba(96,165,250,0.78)',
            strokeWidth: 2.5,
            strokeDasharray: '8 8',
        },
        pathOptions: { borderRadius: 28, offset: 120 },
    },

    // retorno inferior: RADIUS -> orquestador por abajo
    {
        ...edgeBase,
        id: 'radiuslogs-orchestrator',
        source: 'radiusLogs',
        sourceHandle: 'left-out',
        target: 'orchestrator',
        targetHandle: 'bottom-in',
        animated: true,
        label: 'coincidencias radius',
        style: {
            stroke: 'rgba(196,181,253,0.78)',
            strokeWidth: 2.5,
            strokeDasharray: '8 8',
        },
        pathOptions: { borderRadius: 28, offset: 120 },
    },
    {
    ...edgeBase,
    id: 'orchestrator-console',
    source: 'orchestrator',
    sourceHandle: 'bottom-out',
    target: 'console',
    targetHandle: 'top-in',
    animated: true,
    label: 'centraliza salida',
    style: { stroke: 'rgba(134,239,172,0.92)', strokeWidth: 3.2 },
    pathOptions: { borderRadius: 24, offset: 30 },
    },
    {
  ...edgeBase,
  id: 'user-terminal',
  source: 'user',
  sourceHandle: 'bottom-out',
  target: 'terminal',
  targetHandle: 'top-in',
  animated: true,
  label: 'ejecución local',
  style: { stroke: 'rgba(147,197,253,0.92)', strokeWidth: 3 },
  pathOptions: { borderRadius: 22, offset: 28 },
},
{
  ...edgeBase,
  id: 'terminal-orchestrator',
  source: 'terminal',
  sourceHandle: 'right-out',
  target: 'orchestrator',
  targetHandle: 'left-in',
  animated: true,
  label: 'lanza herramienta',
  style: { stroke: 'rgba(147,197,253,0.92)', strokeWidth: 3 },
  pathOptions: { borderRadius: 24, offset: 30 },
},
{
  ...edgeBase,
  id: 'config-orchestrator',
  source: 'config',
  sourceHandle: 'bottom-out',
  target: 'orchestrator',
  targetHandle: 'top-in',
  animated: true,
  label: 'lee configuración',
  style: { stroke: 'rgba(250,204,21,0.88)', strokeWidth: 3 },
  pathOptions: { borderRadius: 24, offset: 32 },
},
{
  ...edgeBase,
  id: 'orchestrator-ssh',
  source: 'orchestrator',
  sourceHandle: 'right-out',
  target: 'ssh',
  targetHandle: 'left-in',
  animated: true,
  label: 'abre sesiones remotas',
  style: { stroke: 'rgba(148,163,184,0.94)', strokeWidth: 3.5 },
  pathOptions: { borderRadius: 24, offset: 36 },
},
{
  ...edgeBase,
  id: 'ssh-web',
  source: 'ssh',
  sourceHandle: 'top-out',
  target: 'webGroup',
  targetHandle: 'left-in',
  animated: true,
  label: 'monitorea web',
  style: { stroke: 'rgba(96,165,250,0.92)', strokeWidth: 3 },
  pathOptions: { borderRadius: 24, offset: 34 },
},
{
  ...edgeBase,
  id: 'ssh-radius',
  source: 'ssh',
  sourceHandle: 'bottom-out',
  target: 'radiusGroup',
  targetHandle: 'left-in',
  animated: true,
  label: 'monitorea radius',
  style: { stroke: 'rgba(196,181,253,0.92)', strokeWidth: 3 },
  pathOptions: { borderRadius: 24, offset: 34 },
},
];

function HighLevelMacArchitectureDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: isMobile ? '550px' : 820,
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 24%), #05070b',
        borderRadius: 30,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          padding: '28px 30px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: '#fff', fontSize: 30, fontWeight: 700 }}>
          Arquitectura de alto nivel de la solución
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.64)',
            marginTop: 8,
            maxWidth: 1050,
            lineHeight: 1.5,
          }}
        >
          El operador ejecuta la herramienta en Ubuntu, el orquestador interpreta la configuración,
          abre conexiones SSH hacia Web y RADIUS, observa logs remotos y concentra el resultado
          en una consola local.
        </div>
      </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.05 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={!isMobile}
          panOnDrag={!isMobile}
          minZoom={isMobile ? 0.05 : 0.35}
          maxZoom={1.5}
          colorMode="dark"
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <Background gap={30} size={1} color="rgba(255,255,255,0.07)" />
          <Controls showInteractive={false} />
        </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <HighLevelMacArchitectureDiagram />
    </ReactFlowProvider>
  );
}