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

const StepNode = memo(({ data }) => {
  return (
    <div
      style={{
        minWidth: 270,
        maxWidth: 270,
        padding: 18,
        borderRadius: 18,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#fff',
        boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 8 }}>{data.kicker}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{data.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.8 }}>{data.description}</div>
    </div>
  );
});

const nodeTypes = { stepNode: StepNode };

const initialNodes = [
  {
    id: 'a',
    type: 'stepNode',
    position: { x: 420, y: 80 },
    data: {
      kicker: 'Paso 1',
      label: 'Análisis de la página nativa',
      description: 'Se revisa la página original para entender su estructura y comportamiento.',
    },
    draggable: false,
  },
  {
    id: 'b',
    type: 'stepNode',
    position: { x: 420, y: 240 },
    data: {
      kicker: 'Paso 2',
      label: 'Identificación de patrones y restricciones',
      description: 'Se detectan reglas visuales, técnicas y limitaciones de integración.',
    },
    draggable: false,
  },
  {
    id: 'c',
    type: 'stepNode',
    position: { x: 420, y: 400 },
    data: {
      kicker: 'Paso 3',
      label: 'Construcción de contexto técnico',
      description: 'Se organiza la información necesaria para guiar la solución.',
    },
    draggable: false,
  },
  {
    id: 'd',
    type: 'stepNode',
    position: { x: 420, y: 560 },
    data: {
      kicker: 'Paso 4',
      label: 'Generación asistida por IA',
      description: 'Se propone una primera implementación apoyada en IA.',
    },
    draggable: false,
  },
  {
    id: 'e',
    type: 'stepNode',
    position: { x: 420, y: 720 },
    data: {
      kicker: 'Paso 5',
      label: 'Ajuste y validación manual',
      description: 'Se corrigen detalles y se valida el resultado final.',
    },
    draggable: false,
  },
  {
    id: 'f',
    type: 'stepNode',
    position: { x: 420, y: 880 },
    data: {
      kicker: 'Resultado',
      label: 'Personalización no invasiva lista para integrar',
      description: 'La solución queda preparada para incorporarse sin alterar de forma agresiva la página base.',
    },
    draggable: false,
  },
];

const initialEdges = [
  {
    id: 'a-b',
    source: 'a',
    target: 'b',
    animated: true,
    type: 'smoothstep',
    style: { stroke: 'rgba(147,197,253,0.9)', strokeWidth: 3 },
  },
  {
    id: 'b-c',
    source: 'b',
    target: 'c',
    animated: true,
    type: 'smoothstep',
    style: { stroke: 'rgba(147,197,253,0.9)', strokeWidth: 3 },
  },
  {
    id: 'c-d',
    source: 'c',
    target: 'd',
    animated: true,
    type: 'smoothstep',
    style: { stroke: 'rgba(147,197,253,0.9)', strokeWidth: 3 },
  },
  {
    id: 'd-e',
    source: 'd',
    target: 'e',
    animated: true,
    type: 'smoothstep',
    style: { stroke: 'rgba(147,197,253,0.9)', strokeWidth: 3 },
  },
  {
    id: 'e-f',
    source: 'e',
    target: 'f',
    animated: true,
    type: 'smoothstep',
    style: { stroke: 'rgba(134,239,172,0.9)', strokeWidth: 3 },
  },
];

function ProblemFlowContent() {
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
        height: isMobile ? '650px' : 1100,
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 24%), #05070b',
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', zIndex: 10, padding: '24px 26px', pointerEvents: 'none' }}>
        <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
          Flujo de personalización no invasiva
        </div>
        <div style={{ color: 'rgba(255,255,255,0.62)', marginTop: 8, maxWidth: 760, lineHeight: 1.45 }}>
          Del análisis inicial hasta una personalización lista para integrar.
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        preventScrolling={false}
        colorMode="dark"
        defaultEdgeOptions={{ type: 'smoothstep' }}
      >
        <Background gap={28} size={1} color="rgba(255,255,255,0.07)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default function MetodologiaProblemFlow() {
  return (
    <ReactFlowProvider>
      <ProblemFlowContent />
    </ReactFlowProvider>
  );
}
