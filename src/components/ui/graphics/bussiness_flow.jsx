import React, { memo, useMemo } from 'react';
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 22,
  color: '#fff',
  boxShadow: '0 12px 36px rgba(0,0,0,0.28)',
  backdropFilter: 'blur(10px)',
};

const zoneStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 28,
  color: '#fff',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
};

const StepNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...glassCard,
        width: data.width,
        minWidth: data.minWidth !== undefined ? data.minWidth : 240,
        padding: 18,
        boxShadow: data.active
          ? '0 0 0 1px rgba(147,197,253,0.45), 0 0 36px rgba(147,197,253,0.18)'
          : glassCard.boxShadow,
        border: data.active
          ? '1px solid rgba(147,197,253,0.38)'
          : '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
      <div style={{ fontSize: 12, opacity: 0.62, marginBottom: 8 }}>{data.kicker}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.78 }}>
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

      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
    </div>
  );
});

const MonitorNode = memo(({ data }) => {
  return (
    <div
      style={{
        ...glassCard,
        minWidth: 220,
        padding: 16,
        border: `1px solid ${data.borderColor}`,
        boxShadow: `0 0 28px ${data.glow}`,
      }}
    >
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
      <div style={{ fontSize: 12, opacity: 0.62, marginBottom: 8 }}>Monitoreo</div>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.78 }}>
        {data.description}
      </div>
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
        padding: 18,
        pointerEvents: 'none',
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>{data.kicker}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{data.label}</div>
      <div style={{ fontSize: 13, opacity: 0.72, marginTop: 6, maxWidth: 360 }}>
        {data.description}
      </div>
    </div>
  );
});

const NoteNode = memo(() => {
  return (
    <div
      style={{
        ...glassCard,
        minWidth: 330,
        padding: 18,
        border: '1px solid rgba(253,224,71,0.18)',
        boxShadow: '0 0 30px rgba(253,224,71,0.08)',
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.62, marginBottom: 8 }}>Lectura del diagrama</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
        Secuencial en negocio, paralelo en observabilidad
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>
        El negocio avanza paso a paso desde la web hasta RADIUS. La observabilidad, en cambio,
        sigue ambos dominios al mismo tiempo mediante dos grupos independientes.
      </div>
    </div>
  );
});

const nodeTypes = {
  stepNode: StepNode,
  monitorNode: MonitorNode,
  zoneNode: ZoneNode,
  noteNode: NoteNode,
};

const initialNodes = [
  // ZONAS
  {
    id: 'zone-web',
    type: 'zoneNode',
    position: { x: 0, y: 420 },
    data: {
      kicker: 'Dominio 1',
      label: 'Capa Web',
      description: 'Aquí inicia la interacción del usuario y se valida que la navegación/servicio concluyan correctamente.',
      width: 620,
      height: 800,
    },
    draggable: false,
    selectable: false,
  },
  {
    id: 'zone-radius',
    type: 'zoneNode',
    position: { x: 830, y: 420 },
    data: {
      kicker: 'Dominio 2',
      label: 'Capa RADIUS',
      description: 'Posteriormente se genera la solicitud hacia RADIUS y se confirma la autenticación.',
      width: 620,
      height: 800,
    },
    draggable: false,
    selectable: false,
  },

  // FLUJO NEGOCIO
  {
    id: 'user-request',
    type: 'stepNode',
    position: { x: 168, y: 710 },
    data: {
      kicker: 'Inicio',
      label: 'Petición web del usuario',
      description: 'El usuario inicia la interacción por medio de la navegación o del servicio web.',
      badge: 'Paso 1',
      active: true,
      width: 350,
      minWidth: 350,
    },
    draggable: false,
  },
  {
    id: 'web-ok',
    type: 'stepNode',
    position: { x: 168, y: 1010 },
    data: {
      kicker: 'Validación web',
      label: 'Navegación / servicio web correcto',
      description: 'Solo si la operación web concluye correctamente, el flujo continúa hacia autenticación.',
      badge: 'Paso 2',
      active: true,
      width: 350,
      minWidth: 350,
    },
    draggable: false,
  },
  {
    id: 'radius-request',
    type: 'stepNode',
    position: { x: 968, y: 710 },
    data: {
      kicker: 'Autenticación',
      label: 'Solicitud a RADIUS',
      description: 'Después del éxito en la capa web, se dispara la solicitud de autenticación a RADIUS.',
      badge: 'Paso 3',
      active: true,
      width: 350,
      minWidth: 350,
    },
    draggable: false,
  },
  {
    id: 'radius-ok',
    type: 'stepNode',
    position: { x: 968, y: 1010 },
    data: {
      kicker: 'Confirmación',
      label: 'Autenticación confirmada',
      description: 'RADIUS confirma la autenticación y se cierra el flujo operativo de negocio.',
      badge: 'Paso 4',
      active: true,
      width: 350,
      minWidth: 350,
    },
    draggable: false,
  },

  // MONITOREO PARALELO
  {
    id: 'monitor-web',
    type: 'monitorNode',
    position: { x: 170, y: 550 },
    data: {
      label: 'Grupo de monitoreo Web',
      description: 'Observa el dominio web sin depender del grupo RADIUS.',
      borderColor: 'rgba(125,211,252,0.30)',
      glow: 'rgba(125,211,252,0.10)',
    },
    draggable: false,
  },
  {
    id: 'monitor-radius',
    type: 'monitorNode',
    position: { x: 930, y: 550 },
    data: {
      label: 'Grupo de monitoreo RADIUS',
      description: 'Observa autenticación en paralelo, con independencia del grupo web.',
      borderColor: 'rgba(196,181,253,0.30)',
      glow: 'rgba(196,181,253,0.10)',
    },
    draggable: false,
  },

  // NOTA
  {
    id: 'note',
    type: 'noteNode',
    position: { x: 260, y: 1300 },
    data: {},
    draggable: false,
  },
];

const initialEdges = [
  // Flujo secuencial de negocio
  {
    id: 'e1',
    source: 'user-request',
    target: 'web-ok',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    animated: true,
    label: '1. interacción web',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(147,197,253,0.9)',
      strokeWidth: 3,
    },
  },
  {
    id: 'e2',
    source: 'web-ok',
    target: 'radius-request',
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'smoothstep',
    animated: true,
    label: '2. si web termina bien → RADIUS',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(147,197,253,0.9)',
      strokeWidth: 3,
    },
  },
  {
    id: 'e3',
    source: 'radius-request',
    target: 'radius-ok',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    animated: true,
    label: '3. autenticación confirmada',
    labelStyle: { fill: '#cbd5e1', fontSize: 12 },
    style: {
      stroke: 'rgba(147,197,253,0.9)',
      strokeWidth: 3,
    },
  },

  // Monitoreo paralelo e independiente
  {
    id: 'm1',
    source: 'monitor-web',
    target: 'user-request',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'rgba(125,211,252,0.8)',
      strokeWidth: 2,
      strokeDasharray: '8 8',
    },
  },
  {
    id: 'm2',
    source: 'monitor-radius',
    target: 'radius-request',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: 'rgba(196,181,253,0.85)',
      strokeWidth: 2,
      strokeDasharray: '8 8',
    },
  },
];

function ParallelMonitoringDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'smoothstep',
    }),
    []
  );

  return (
    <div
      style={{
        width: '100%',
        height: 660,
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 24%), #05070b',
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          zIndex: 10,
          padding: '24px 26px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
          Flujo secuencial + monitoreo paralelo
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.62)',
            marginTop: 8,
            maxWidth: 860,
            lineHeight: 1.45,
          }}
        >
          El negocio avanza primero por la capa web y después hacia RADIUS. La solución observa
          ambos dominios al mismo tiempo, manteniendo independencia entre el grupo web y el grupo RADIUS.
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={true}
        panOnDrag={true}
        colorMode="dark"
      >
        <Background gap={24} size={1} color="rgba(255,255,255,0.07)" />
        <Controls showInteractive={false} />
        {/* <MiniMap
          pannable
          zoomable
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          nodeColor={(node) => {
            if (node.id.startsWith('monitor')) return 'rgba(196,181,253,0.9)';
            if (node.id.startsWith('zone')) return 'rgba(255,255,255,0.18)';
            return 'rgba(147,197,253,0.9)';
          }}
        /> */}
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <ParallelMonitoringDiagram />
    </ReactFlowProvider>
  );
}