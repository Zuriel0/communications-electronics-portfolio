import { memo, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ReactFlow, ReactFlowProvider, Background, Controls, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodalumeDiagrams } from '../../../data/nodalume';
import { observeDiagramPlayback } from '../../../utils/diagramVisibility';
import useReducedMotion from '../../../hooks/useReducedMotion';
import useTranslation from '../../../i18n/useTranslation';
import useFlowLabels from '../../../i18n/useFlowLabels';
import DiagramPlaybackControls from '../DiagramPlaybackControls';
import { engineeringEdgeTypes } from '../engineeringEdgeTypes';

const subscribe = notify => {
  const media = window.matchMedia('(max-width: 959px)');
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const snapshot = () => window.matchMedia('(max-width: 959px)').matches;
const serverSnapshot = () => false;
const ServiceNode = memo(function ServiceNode({ data }) {
  return <div className={`nodalume-node ${data.core ? 'nodalume-node--core' : ''}`}>
    <Handle type="target" position={data.vertical ? Position.Top : Position.Left} />
    <strong>{data.label}</strong><span>{data.detail}</span>
    <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} />
  </div>;
});
const nodeTypes = { service: ServiceNode };
const desktop = [{x:0,y:150},{x:350,y:150},{x:700,y:0},{x:700,y:300},{x:1050,y:300}];

function Diagram({ kind }) {
  const model = nodalumeDiagrams[kind];
  const { t } = useTranslation();
  const ariaLabelConfig = useFlowLabels();
  const frame = useRef(null);
  const reducedMotion = useReducedMotion();
  const vertical = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const count = model.edges.length;
  useEffect(() => observeDiagramPlayback(frame.current, {
    paused, reducedMotion, onPlaying:setPlaying,
    onStep:()=>setStep(previous=>(previous+1)%count), delay:2400,
  }), [paused,reducedMotion,count]);
  const playback = {paused,reducedMotion,playing:playing&&!paused&&!reducedMotion,toggle:()=>setPaused(value=>!value)};
  const nodes = useMemo(()=>model.nodes.map((node,index)=>({
    id:node.id,type:'service',position:vertical?{x:30,y:index*180}:kind==='evolution'?{x:index*300,y:160}:desktop[index],
    data:{label:t(node.label),detail:t(node.detail),core:index===1,vertical},
    ariaLabel:`${t(node.label)}: ${t(node.detail)}`,draggable:false,
  })),[model,t,vertical,kind]);
  const edges = useMemo(()=>model.edges.map((edge,index)=>({
    ...edge,type:'engineering',animated:false,
    ariaLabel:`${t(model.nodes.find(node=>node.id===edge.source).label)}: ${t(edge.label)}: ${t(model.nodes.find(node=>node.id===edge.target).label)}`,
    // Relationship reading only: no packet arrows, decisions or fabricated transfers.
    data:{flowActive:index===step},className:index===step?'diagram-edge--flow':'',
    style:{stroke:'var(--border)',strokeWidth:1.5},
    labelStyle:{fill:'var(--text-primary)',fontSize:13},
    labelBgStyle:{fill:'var(--background-secondary)'},labelBgPadding:[8,5],
  })),[model,t,step]);
  return <div className="nodalume-flow">
    <DiagramPlaybackControls id={model.id} title={model.title} playback={playback}/>
    <div ref={frame} id={model.id} tabIndex={-1} className="diagram-frame nodalume-flow-frame" data-playing={String(playback.playing)} aria-label={t(model.title)}>
      <ReactFlow key={vertical ? 'mobile' : 'desktop'} id={`rf-nodalume-${kind}`} nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={engineeringEdgeTypes}
        ariaLabelConfig={ariaLabelConfig} fitView fitViewOptions={{padding:.12}}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        zoomOnScroll={false} zoomOnDoubleClick={false} preventScrolling={false} panOnDrag={!vertical}
        minZoom={.15} maxZoom={2.5} colorMode="dark">
        <Background gap={28} size={1} color="var(--border)"/>
        <Controls showInteractive={false}/>
      </ReactFlow>
    </div>
  </div>;
}
export default function NodalumeFlow({kind}) {return <ReactFlowProvider><Diagram kind={kind}/></ReactFlowProvider>;}
