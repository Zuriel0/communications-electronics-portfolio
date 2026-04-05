import React, { memo, useEffect, useMemo, useState } from 'react';
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

const CARD_BASE = {
  background: 'rgba(255,255,255,0.06)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 22,
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  backdropFilter: 'blur(12px)',
};

const ServiceNode = memo(({ data }) => {
  const activeGlow = data.active
    ? '0 0 0 1px rgba(164, 202, 254, 0.55), 0 0 36px rgba(164, 202, 254, 0.20)'
    : '0 10px 30px rgba(0,0,0,0.25)';

  return (
    <div
      style={{
        ...CARD_BASE,
        minWidth: 220,
        padding: 18,
        boxShadow: activeGlow,
        border: data.active
          ? '1px solid rgba(164, 202, 254, 0.45)'
          : '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, width: 8, height: 8 }}
      />

      <div style={{ fontSize: 15, opacity: 0.7, marginBottom: 8 }}>{data.kicker}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.75 }}>{data.description}</div>

      {data.badge && (
        <div
          style={{
            marginTop: 14,
            display: 'inline-flex',
            padding: '6px 10px',
            borderRadius: 999,
            fontSize: 12,
            background: data.active
              ? 'rgba(164, 202, 254, 0.18)'
              : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {data.badge}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, width: 8, height: 8 }}
      />
    </div>
  );
});

const InfoNode = memo(() => {
  return (
    <div
      style={{
        ...CARD_BASE,
        minWidth: 280,
        padding: 18,
        border: '1px solid rgba(255, 215, 128, 0.22)',
        boxShadow: '0 0 32px rgba(255, 215, 128, 0.10)',
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 8 }}>Problema operativo</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
        ¿En cuál servidor quedó esa MAC?
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.78 }}>
        Como el balanceador decide el destino en tiempo real, no puedes saber de antemano
        dónde fue procesada la solicitud. Necesitas correlación centralizada o revisar logs
        de varios servidores.
      </div>
    </div>
  );
});

const nodeTypes = {
  serviceNode: ServiceNode,
  infoNode: InfoNode,
};

const initialNodes = [
  {
    id: 'client',
    type: 'serviceNode',
    position: { x: 40, y: 240 },
    data: {
      kicker: 'Origen',
      label: 'Cliente',
      description: 'Solicitud entrante con una MAC específica.',
      badge: 'MAC: AA:BB:CC:11:22:33',
    },
    draggable: false,
  },
  {
    id: 'lb',
    type: 'serviceNode',
    position: { x: 440, y: 240 },
    data: {
      kicker: 'Decisión',
      label: 'Load Balancer',
      description: 'Selecciona dinámicamente el servidor que atenderá la petición.',
      badge: 'Routing dinámico',
      active: true,
    },
    draggable: false,
  },
  {
    id: 'ws1',
    type: 'serviceNode',
    position: { x: 950, y: 0 },
    data: {
      kicker: 'Destino',
      label: 'Web Server 1',
      description: 'Misma función que los demás servidores.',
      badge: 'Misma función',
    },
    draggable: false,
  },
  {
    id: 'ws2',
    type: 'serviceNode',
    position: { x: 950, y: 240 },
    data: {
      kicker: 'Destino',
      label: 'Web Server 2',
      description: 'Misma función que los demás servidores.',
      badge: 'Misma función',
    },
    draggable: false,
  },
  {
    id: 'ws3',
    type: 'serviceNode',
    position: { x: 950, y: 480 },
    data: {
      kicker: 'Destino',
      label: 'Web Server 3',
      description: 'Misma función que los demás servidores.',
      badge: 'Misma función',
    },
    draggable: false,
  },
  {
    id: 'info',
    type: 'infoNode',
    position: { x: 50, y: 720 },
    data: {},
    draggable: false,
  },
];

const initialEdges = [
  {
    id: 'client-lb',
    source: 'client',
    target: 'lb',
    animated: true,
    style: {
      stroke: 'rgba(255,255,255,0.30)',
      strokeWidth: 2,
    },
  },
  {
    id: 'lb-ws1',
    source: 'lb',
    target: 'ws1',
    animated: false,
    style: {
      stroke: 'rgba(255,255,255,0.18)',
      strokeWidth: 2,
    },
  },
  {
    id: 'lb-ws2',
    source: 'lb',
    target: 'ws2',
    animated: false,
    style: {
      stroke: 'rgba(255,255,255,0.18)',
      strokeWidth: 2,
    },
  },
  {
    id: 'lb-ws3',
    source: 'lb',
    target: 'ws3',
    animated: false,
    style: {
      stroke: 'rgba(255,255,255,0.18)',
      strokeWidth: 2,
    },
  },
];

function LoadBalancerTraceabilityDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeServerIndex, setActiveServerIndex] = useState(1);

  const serverIds = useMemo(() => ['ws1', 'ws2', 'ws3'], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveServerIndex((prev) => (prev + 1) % serverIds.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [serverIds.length]);

  useEffect(() => {
    const activeId = serverIds[activeServerIndex];

    setNodes((current) =>
      current.map((node) => {
        if (!serverIds.includes(node.id)) return node;

        return {
          ...node,
          data: {
            ...node.data,
            active: node.id === activeId,
            badge: node.id === activeId ? 'Procesando solicitud' : 'Misma función',
          },
        };
      })
    );

    setEdges((current) =>
      current.map((edge) => {
        const isActive = edge.id === `lb-${activeId}`;

        if (edge.source === 'lb' && edge.target.startsWith('ws')) {
          return {
            ...edge,
            animated: isActive,
            style: {
              stroke: isActive
                ? 'rgba(164, 202, 254, 0.85)'
                : 'rgba(255,255,255,0.18)',
              strokeWidth: isActive ? 3 : 2,
            },
          };
        }

        return edge;
      })
    );
  }, [activeServerIndex, serverIds, setEdges, setNodes]);

  return (
    <div
      style={{
        width: '100%',
        height: '760px',
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 25%), #05070b',
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          padding: '26px 28px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
          Trazabilidad en arquitectura horizontal
        </div>
        <div style={{ color: 'rgba(255,255,255,0.62)', marginTop: 8, maxWidth: 700 }}>
          Varios servidores web cumplen la misma función. El balanceador decide a cuál
          enviar la petición, lo que dificulta saber dónde buscar una MAC específica.
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        colorMode="dark"
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Background
          gap={24}
          size={1}
          color="rgba(255,255,255,0.08)"
        />
        <Controls showInteractive={false} />
        {/* <MiniMap
          pannable
          zoomable
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          nodeColor={() => 'rgba(255,255,255,0.45)'}
        /> */}
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <LoadBalancerTraceabilityDiagram />
    </ReactFlowProvider>
  );
}