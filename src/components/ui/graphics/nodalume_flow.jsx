import { memo, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ReactFlow, ReactFlowProvider, Background, Controls, Handle, Position, BaseEdge, EdgeLabelRenderer, getSmoothStepPath, ViewportPortal, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodalumeDiagrams } from '../../../data/nodalume';
import { observeDiagramPlayback } from '../../../utils/diagramVisibility';
import useReducedMotion from '../../../hooks/useReducedMotion';
import useTranslation from '../../../i18n/useTranslation';
import useFlowLabels from '../../../i18n/useFlowLabels';
import DiagramPlaybackControls from '../DiagramPlaybackControls';
import { engineeringEdgeTypes } from '../engineeringEdgeTypes';
import EngineeringFlowEdge from '../EngineeringFlowEdge';
import Button from '../button';
import { walkthroughAt, walkthroughSteps } from '../../../utils/nodalumeWalkthrough';

// Wrapped labels belong only to the additional evidence views.
function EvidenceEdge(props) {
  const { t } = useTranslation();
  const { zoom } = useViewport();
  const [defaultPath, defaultX, defaultY] = getSmoothStepPath(props);
  const {sourceX:sx,sourceY:sy,targetX:tx,targetY:ty} = props;
  const shortcut = props.id === 'start-stop';
  const detour = props.data.vertical && Math.abs(ty-sy)>230;
  const side = sx+125;
  const path = detour ? `M${sx},${sy} L${sx},${sy+20} L${side},${sy+20} L${side},${ty-20} L${tx},${ty-20} L${tx},${ty}`
    : shortcut ? `M${sx},${sy} L${sx},${(sy+ty)/2} L${tx+32},${(sy+ty)/2} L${tx+32},${ty} L${tx},${ty}` : defaultPath;
  const x = detour ? tx : shortcut ? (sx+tx)/2 : defaultX;
  const y = detour ? ty-28 : shortcut ? (sy+ty)/2 : defaultY;
  return <>{detour || shortcut ? <BaseEdge path={path} style={props.style} markerEnd={props.markerEnd}/> : <EngineeringFlowEdge {...props} label={undefined}/>}
    {detour && props.data.flowActive && <ViewportPortal><span aria-hidden="true" className="diagram-flow-signal" style={{offsetPath:`path('${path}')`,width:6/zoom,height:6/zoom}}/></ViewportPortal>}
    <EdgeLabelRenderer>{!(shortcut && props.data.vertical) && <span className="nodalume-edge-label" style={{transform:`translate(-50%, -50%) translate(${x}px,${y}px)`}}>{t(props.label)}</span>}</EdgeLabelRenderer>
  </>;
}
const evidenceEdgeTypes = {engineering:EvidenceEdge};
const subscribe = notify => {
  const media = window.matchMedia('(max-width: 959px)');
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const snapshot = () => window.matchMedia('(max-width: 959px)').matches;
const serverSnapshot = () => false;
const ServiceNode = memo(function ServiceNode({ data }) {
  return <div className={`nodalume-node ${data.core ? 'nodalume-node--core' : ''} ${data.selected ? 'nodalume-node--selected' : ''} ${data.current ? 'nodalume-node--current' : ''}`}>
    <Handle type="target" position={data.vertical ? Position.Top : port[data.input || 'left']} />
    <strong>{data.label}</strong><span>{data.detail}</span>
    <Handle type="source" position={data.vertical ? Position.Bottom : port[data.output || 'right']} />
  </div>;
});
const port = {left:Position.Left,right:Position.Right,top:Position.Top,bottom:Position.Bottom};
const nodeTypes = { service: ServiceNode };
const desktop = [{x:0,y:150},{x:350,y:150},{x:700,y:0},{x:700,y:300},{x:1050,y:300}];

function Diagram({ kind, model: customModel }) {
  const model = customModel || nodalumeDiagrams[kind];
  const inspected = Boolean(model.inspected);
  const { t } = useTranslation();
  const ariaLabelConfig = useFlowLabels();
  const frame = useRef(null);
  const reducedMotion = useReducedMotion();
  const vertical = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(model.nodes[0].id);
  const steps = useMemo(() => walkthroughSteps(model), [model]);
  const phase = walkthroughAt(model, step);
  const count = steps.length;
  const selected = model.nodes.find(node => node.id === selectedId) || model.nodes[0];
  function selectComponent(id) { setSelectedId(id); setPaused(true); }
  function selectStage(index) {
    setStep(index);
    setSelectedId(walkthroughAt(model, index).target);
    setPaused(true);
  }
  useEffect(() => observeDiagramPlayback(frame.current, {
    paused, reducedMotion, onPlaying:setPlaying,
    onStep:()=>setStep(previous=>(previous+1)%count), delay:2400,
  }), [paused,reducedMotion,count]);
  const playback = {paused,reducedMotion,playing:playing&&!paused&&!reducedMotion,toggle:()=>setPaused(value=>!value)};
  const nodes = useMemo(()=>model.nodes.map((node,index)=>({
    id:node.id,type:'service',position:vertical?{x:30,y:index*(inspected?190:180)}:node.position || (kind==='evolution'?{x:index*300,y:160}:desktop[index]),
    data:{label:t(node.label),detail:t(node.detail),core:!inspected&&index===1,vertical,input:node.input,output:node.output,selected:inspected&&node.id===selectedId,current:inspected&&(node.id===phase.source||node.id===phase.target)},
    ariaLabel:`${t(node.label)}: ${t(node.detail)}`,draggable:false,
  })),[model,t,vertical,kind,inspected,selectedId,phase.source,phase.target]);
  const edges = useMemo(()=>model.edges.map(edge=>({
    ...edge,type:'engineering',animated:false,
    ariaLabel:`${t(model.nodes.find(node=>node.id===edge.source).label)}: ${t(edge.label)}: ${t(model.nodes.find(node=>node.id===edge.target).label)}`,
    // Relationship reading only: no packet arrows, decisions or fabricated transfers.
    data:{flowActive:edge.id===phase.edgeId,vertical},className:edge.id===phase.edgeId?'diagram-edge--flow':'',
    markerEnd:inspected?{type:'arrowclosed',width:12,height:12,color:'var(--accent)'}:undefined,
    style:{stroke:'var(--border)',strokeWidth:1.5,...(edge.conditional?{strokeDasharray:'5 5'}:{})},
    labelStyle:{fill:'var(--text-primary)',fontSize:13},
    labelBgStyle:{fill:'var(--background-secondary)'},labelBgPadding:[8,5],
  })),[model,t,phase.edgeId,inspected,vertical]);
  return <div className={`nodalume-flow ${inspected?'nodalume-flow--evidence':''}`}>
    {inspected && <><p className="nodalume-reading-note">{t('Code-guided walkthrough. Selecting a stage or component pauses the motion.')}</p>
      <p className="nodalume-stage-title">{t(phase.title)}</p><div className="nodalume-stage-controls" role="group" aria-label={t('Walkthrough stages')}>{steps.map((item,index)=><Button key={item.edge} aria-label={t('Stage {0}: {1}',[index+1,t(item.title)])} aria-pressed={index===phase.index} onClick={()=>selectStage(index)}>{index+1}</Button>)}</div>
    </>}
    <DiagramPlaybackControls id={model.id} title={model.title} playback={playback}/>
    <div ref={frame} id={model.id} tabIndex={-1} className="diagram-frame nodalume-flow-frame" data-playing={String(playback.playing)} aria-label={t(model.title)}>
      <ReactFlow key={vertical ? 'mobile' : 'desktop'} id={`rf-${model.id}`} nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={inspected?evidenceEdgeTypes:engineeringEdgeTypes}
        onNodeClick={inspected?(_event,node)=>selectComponent(node.id):undefined}
        ariaLabelConfig={ariaLabelConfig} fitView fitViewOptions={{padding:.12}}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        zoomOnScroll={false} zoomOnDoubleClick={false} preventScrolling={false} panOnDrag={!vertical}
        minZoom={.15} maxZoom={2.5} colorMode="dark">
        <Background gap={28} size={1} color="var(--border)"/>
        <Controls showInteractive={false}/>
      </ReactFlow>
    </div>
    {inspected && <div className="nodalume-component-inspection">
      <label className="nodalume-component-list" htmlFor={`${model.id}-component`}>{t('Inspect a component')}<select id={`${model.id}-component`} aria-controls={`${model.id}-inspection`} value={selectedId} onChange={event=>selectComponent(event.target.value)}>{model.nodes.map(node=><option key={node.id} value={node.id}>{t(node.label)}</option>)}</select></label>
      <div id={`${model.id}-inspection`} className="nodalume-inspection-copy" aria-live="polite" aria-atomic="true"><h4>{t(selected.label)}</h4><p>{t(selected.explanation)}</p><p className="nodalume-source-note">{t('Source inspected')}: <code>{selected.source.split('/').at(-1)}</code></p></div>
    </div>}
  </div>;
}
export default function NodalumeFlow({kind,model}) {return <ReactFlowProvider><Diagram key={model?.id || kind} kind={kind} model={model}/></ReactFlowProvider>;}
