import { makeStyles } from '@material-ui/core/styles';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';

const useStyles = makeStyles((_theme) => ({
  root: {
    height: '100%',
    width: 2,
    backgroundColor: 'gray',
    cursor: 'col-resize',
  },
}));

export interface VerticalSeparatorProps {
  onMove: DraggableEventHandler;
}

function VerticalSeparator({ onMove }: VerticalSeparatorProps) {
  const classes = useStyles();

  const handleDrag: DraggableEventHandler = (event, data) => {
    onMove(event, data);
  };

  return (
    // @ts-ignore
    <DraggableCore onDrag={handleDrag}>
      <div>
        <div className={classes.root} />
      </div>
    </DraggableCore>
  );
}

export { VerticalSeparator };
