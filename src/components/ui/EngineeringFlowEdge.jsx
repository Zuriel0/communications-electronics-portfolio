import { BaseEdge, getSmoothStepPath, useViewport, ViewportPortal } from '@xyflow/react';

function FlowSignal({ path }) {
  const { zoom } = useViewport();
  return (
    <ViewportPortal>
      <span
        aria-hidden="true"
        className="diagram-flow-signal"
        style={{ offsetPath: `path('${path}')`, width: 6 / zoom, height: 6 / zoom }}
      />
    </ViewportPortal>
  );
}

export default function EngineeringFlowEdge({
  sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  pathOptions, data, ...edgeProps
}) {
  // Use the native SmoothStep calculation, including its original label position.
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
    borderRadius: pathOptions?.borderRadius,
    offset: pathOptions?.offset,
    stepPosition: pathOptions?.stepPosition,
  });
  // BaseEdge receives presentation props only; graph metadata belongs to React Flow.
  const {
    label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius,
    style, markerStart, markerEnd, interactionWidth,
  } = edgeProps;
  return (
    <>
      <BaseEdge
        path={path} labelX={labelX} labelY={labelY}
        label={label} labelStyle={labelStyle} labelShowBg={labelShowBg}
        labelBgStyle={labelBgStyle} labelBgPadding={labelBgPadding}
        labelBgBorderRadius={labelBgBorderRadius} style={style}
        markerStart={markerStart} markerEnd={markerEnd} interactionWidth={interactionWidth}
      />
      {data?.flowActive && <FlowSignal path={path} />}
    </>
  );
}
