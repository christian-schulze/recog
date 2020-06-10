import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DraggableCore, DraggableEventHandler } from "react-draggable";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: 2,
    backgroundColor: "gray",
    cursor: "col-resize",
  },
}));

interface Props {
  onMove: DraggableEventHandler;
}

function VerticalSeparator({ onMove }: Props) {
  const classes = useStyles();

  const handleDrag: DraggableEventHandler = (event, data) => {
    onMove(event, data);
  };

  return (
    <DraggableCore onDrag={handleDrag}>
      <div>
        <div className={classes.root} />
      </div>
    </DraggableCore>
  );
}

export { VerticalSeparator };
