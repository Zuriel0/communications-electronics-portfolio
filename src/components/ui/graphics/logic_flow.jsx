import React, { memo } from 'react';
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

const cardBase = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 22,
  color: '#fff',
  boxShadow: '0 12px 36px rgba(0,0,0,0.28)',
  backdropFilter: 'blur(10px)',
};

const FlowNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...cardBase,
        minWidth: data.width || 250,
        maxWidth: data.maxWidth || 300,
        padding: 18,
        border: data.border || cardBase.border,
        boxShadow: data.glow || cardBase.boxShadow,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0 }} />

      <div style={{ fontSize: 12, opacity: 0.62, marginBottom: 8 }}>{data.kicker}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.8 }}>
        {data.description}
      </div>

      {data.badge && (
        <div
          style={{
            marginTop: 14,
            display: 'inline-flex',
            padding: '6px 10px',
            borderRadius: 999,
            fontSize: 12,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {data.badge}
        </div>
      )}
    </div>
  );
});

const NoteNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...cardBase,
        minWidth: 380,
        maxWidth: 420,
        padding: 16,
        border: '1px solid rgba(250,204,21,0.18)',
        boxShadow: '0 0 28px rgba(250,204,21,0.08)',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>{data.kicker}</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.8 }}>{data.description}</div>
    </div>
  );
});

const nodeTypes = {
  flowNode: FlowNode,
  noteNode: NoteNode,
};

const initialNodes = [
  {
    id: 'mac',
    type: 'flowNode',
    position: { x: 40, y: 230 },
    data: {
      kicker: 'Entrada',
      label: 'MAC ingresada',
      description: 'Valida y normaliza la MAC recibida por consola.',
      badge: 'Paso 1',
      width: 240,
      maxWidth: 240,
      border: '1px solid rgba(147,197,253,0.28)',
      glow: '0 0 30px rgba(147,197,253,0.08)',
    },
    draggable: false,
  },
  {
    id: 'ssh',
    type: 'flowNode',
    position: { x: 340, y: 230 },
    data: {
      kicker: 'Conectividad',
      label: 'SSH',
      description: 'Abre sesiones remotas directas o mediante alias SSH.',
      badge: 'Paso 2',
      width: 240,
      maxWidth: 240,
      border: '1px solid rgba(147,197,253,0.28)',
      glow: '0 0 30px rgba(147,197,253,0.08)',
    },
    draggable: false,
  },

  // Ramas paralelas
  {
    id: 'web',
    type: 'flowNode',
    position: { x: 690, y: 100 },
    data: {
      kicker: 'Monitoreo paralelo',
      label: 'Web x6',
      description:
        'Monitorea concurrentemente los 6 nodos web para ubicar dónde atendió la petición.',
      badge: 'Paso 3',
      width: 340,
      maxWidth: 340,
      border: '1px solid rgba(96,165,250,0.26)',
      glow: '0 0 26px rgba(96,165,250,0.08)',
    },
    draggable: false,
  },
  {
    id: 'radius',
    type: 'flowNode',
    position: { x: 690, y: 355 },
    data: {
      kicker: 'Monitoreo paralelo',
      label: 'RADIUS x1',
      description: 'Observa el servidor RADIUS activo, con soporte principal y respaldo.',
      badge: 'Paso 4',
      width: 340,
      maxWidth: 340,
      border: '1px solid rgba(196,181,253,0.30)',
      glow: '0 0 30px rgba(196,181,253,0.08)',
    },
    draggable: false,
  },

  // Convergencia
  {
    id: 'detect',
    type: 'flowNode',
    position: { x: 1140, y: 230 },
    data: {
      kicker: 'Correlación',
      label: 'Detección de coincidencias',
      description: 'Busca en tiempo real líneas relacionadas con la MAC en ambos dominios.',
      badge: 'Paso 5',
      width: 320,
      maxWidth: 320,
      border: '1px solid rgba(134,239,172,0.28)',
      glow: '0 0 30px rgba(134,239,172,0.08)',
    },
    draggable: false,
  },
  {
    id: 'console',
    type: 'flowNode',
    position: { x: 1540, y: 230 },
    data: {
      kicker: 'Salida',
      label: 'Consola centralizada',
      description:
        'Muestra origen lógico, tipo de servidor y línea detectada, resaltando la MAC.',
      badge: 'Paso 6',
      width: 320,
      maxWidth: 320,
      border: '1px solid rgba(248,250,252,0.18)',
      glow: '0 0 30px rgba(255,255,255,0.05)',
    },
    draggable: false,
  },

  {
    id: 'policy',
    type: 'noteNode',
    position: { x: 1110, y: 470 },
    data: {
      kicker: 'Regla opcional',
      label: 'Política sobre el grupo Web',
      description:
        'Puede conservar el servidor web que hizo match y detener solo los demás, sin afectar RADIUS.',
    },
    draggable: false,
    selectable: false,
  },
];

const initialEdges = [
  {
    id: 'mac-ssh',
    source: 'mac',
    target: 'ssh',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'rgba(147,197,253,0.9)',
      strokeWidth: 3,
    },
  },

  // SSH se divide en paralelo
  {
    id: 'ssh-web',
    source: 'ssh',
    target: 'web',
    type: 'smoothstep',
    animated: true,
    label: 'monitoreo web',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(96,165,250,0.9)',
      strokeWidth: 3,
    },
  },
  {
    id: 'ssh-radius',
    source: 'ssh',
    target: 'radius',
    type: 'smoothstep',
    animated: true,
    label: 'monitoreo RADIUS',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(196,181,253,0.9)',
      strokeWidth: 3,
    },
  },

  // Ambas ramas convergen
  {
    id: 'web-detect',
    source: 'web',
    target: 'detect',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'rgba(96,165,250,0.88)',
      strokeWidth: 3,
    },
  },
  {
    id: 'radius-detect',
    source: 'radius',
    target: 'detect',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'rgba(196,181,253,0.88)',
      strokeWidth: 3,
    },
  },

  {
    id: 'detect-console',
    source: 'detect',
    target: 'console',
    type: 'smoothstep',
    animated: true,
    label: 'coincidencias centralizadas',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(134,239,172,0.9)',
      strokeWidth: 3,
    },
  },

  {
    id: 'policy-detect',
    source: 'policy',
    target: 'detect',
    type: 'smoothstep',
    animated: false,
    style: {
      stroke: 'rgba(250,204,21,0.55)',
      strokeWidth: 2,
      strokeDasharray: '8 8',
    },
  },
];

function MacTracingParallelFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      style={{
        width: '100%',
        height: 690,
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 24%), #05070b',
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          padding: '24px 26px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
          Flujo de trazabilidad por MAC
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.62)',
            marginTop: 8,
            maxWidth: 980,
            lineHeight: 1.45,
          }}
        >
          Desde SSH se dispara el monitoreo en paralelo sobre Web x6 y RADIUS x1;
          ambos alimentan la detección de coincidencias y la salida se centraliza al final.
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.14 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        colorMode="dark"
        defaultEdgeOptions={{ type: 'smoothstep' }}
      >
        <Background gap={24} size={1} color="rgba(255,255,255,0.07)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <MacTracingParallelFlow />
    </ReactFlowProvider>
  );
}