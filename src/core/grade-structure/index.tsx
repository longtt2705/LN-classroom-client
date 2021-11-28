import React, { useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    ResponderProvided,
    DraggableProvided,
    DroppableProvided,
    DraggableStateSnapshot
} from "react-beautiful-dnd";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";

/* 
Note: this is a working example, but more can be done to improve it.

In particular, on drag, the table cells in the dragged row may collapse and shrink the overall row.

If you wish to preserve their size mid-drag, you can create a custom component that wraps
the material TableCell and saves the pre-drag dimensions (e.g. in a ref or in state).
The component can be passed an 'isDragging' prop (via snapshot.isDragging) and can conditionally
apply pre-drag width/height via styles.

Pre-drag dimensions can be obtained via the new-ish ResizeObserver API. If you are using class 
components, the getSnapshotBeforeUpdate() lifecycle method can work with getBoundingClientRect(), 
*/

export interface DataItem {
    uuid: string;
    description: string;
    unitPrice: number;
    quantity: number;
}

export const MaterialTable: React.FC<{ items: DataItem[] }> = ({ items }) => {
    // cache the items provided via props in state for purposes of this demo
    const [localItems, setLocalItems] = useState<Array<DataItem>>(items);

    // normally one would commit/save any order changes via an api call here...
    const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        setLocalItems((prev: any) => {
            const temp = [...prev];
            const d = temp[result.destination!.index];
            temp[result.destination!.index] = temp[result.source.index];
            temp[result.source.index] = d;

            return temp;
        });
    };

    return (
        <TableContainer>
            <Table>
                <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "35%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">&nbsp;</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Unit Cost</TableCell>
                        <TableCell align="right">Qty/Rate</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                        {(droppableProvided: DroppableProvided) => (
                            <TableBody
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                            >
                                {localItems.map((item: DataItem, index: number) => (
                                    <Draggable
                                        key={item.uuid}
                                        draggableId={item.uuid}
                                        index={index}
                                    >
                                        {(
                                            draggableProvided: DraggableProvided,
                                            snapshot: DraggableStateSnapshot
                                        ) => {
                                            return (
                                                <TableRow
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.draggableProps}
                                                    style={{
                                                        ...draggableProvided.draggableProps.style,
                                                        background: snapshot.isDragging
                                                            ? "rgba(245,245,245, 0.75)"
                                                            : "none"
                                                    }}
                                                >
                                                    {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
                                                    <TableCell align="left">
                                                        <div {...draggableProvided.dragHandleProps}>
                                                            <ReorderIcon />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell align="right">{item.unitPrice}</TableCell>
                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                    <TableCell align="right">
                                                        {(item.unitPrice * item.quantity).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
        </TableContainer>
    );
};
