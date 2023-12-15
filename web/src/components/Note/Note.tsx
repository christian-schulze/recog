import { Fragment } from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import type { Note } from '@/types';

const mdParser = new MarkdownIt({ html: true });

const StyledHeader = styled(Paper)`
  width: 100%;
  padding: 8px 8px 4px;
`;

const StyledTagsRow = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const StyledNoteBody = styled.div`
  padding: 0 8px 0;
  overflow-x: scroll;
  height: calc(100% - 60px);
`;

export interface NoteProps {
  note: Note;
}

function Note({ note }: NoteProps) {
  return (
    <>
      <StyledHeader>
        <div>
          <span>
            <strong>Title:&nbsp;</strong>
          </span>
          <span>{note.title}</span>
        </div>
        <StyledTagsRow>
          <span>
            <strong>Tags:&nbsp;</strong>
          </span>
          <span>
            {(note.tags || []).map((tag) => (
              <Fragment key={tag.id}>
                <Chip label={tag.name} size="small" />
                &nbsp;
              </Fragment>
            ))}
          </span>
        </StyledTagsRow>
      </StyledHeader>

      <StyledNoteBody
        dangerouslySetInnerHTML={{
          __html: mdParser.render(note.body),
        }}
      />
    </>
  );
}

export { Note };
