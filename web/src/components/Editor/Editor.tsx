import { ChangeEvent, useEffect, useRef, useState, Fragment } from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import 'react-markdown-editor-lite/lib/index.css';

import { deleteElement } from '@/utils/array';

import type { Note } from '@/components/Note/NoteContainer.tsx';

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

const StyledFooter = styled.div`
  width: 100%;
  text-align: right;
  padding: 4px;
`;

const ButtonSpacer = styled.span`
  width: 4px;
`;

interface EditorProps {
  note: Note;
  onDeleteTag: (tagToDelete: string) => Promise<boolean>;
  onAddTag: (newTag: string) => Promise<boolean>;
  onSaveNote: (title: string, body: string) => void;
  onReloadNote: () => void;
}

function Editor({
  note,
  onDeleteTag,
  onAddTag,
  onSaveNote,
  onReloadNote,
}: EditorProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [newTag, setNewTag] = useState('');
  const newTagRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle(note.title || '');
    setBody(note.body || '');
    setTags(note.tags?.map((tag) => tag.name) || []);
  }, [note]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeEditor = ({
    html: _,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setBody(text);
  };

  const handleSaveNote = () => {
    onSaveNote(title, body);
  };

  const handleChangeNewTag = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleClickAddTag = async () => {
    const result = await onAddTag(newTag);
    if (result) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleDeleteTag = async (tagToDelete: string) => {
    const result = await onDeleteTag(tagToDelete);
    if (result) {
      const t = deleteElement(tags, tagToDelete);
      setTags(t);
    }
  };

  return (
    <>
      <StyledHeader>
        <div>
          <span>
            <strong>Title:&nbsp;</strong>
          </span>
          <Input
            placeholder="title"
            value={title}
            aria-label="title"
            onChange={handleChangeTitle}
          />
        </div>
        <StyledTagsRow>
          <span>
            <strong>Tags:&nbsp;</strong>
          </span>
          <span>
            {(tags || []).map((tag) => (
              <Fragment key={tag}>
                <Chip
                  label={tag}
                  size="small"
                  onDelete={() => handleDeleteTag(tag)}
                />
                &nbsp;
              </Fragment>
            ))}
          </span>
          <Input
            onChange={handleChangeNewTag}
            placeholder="new tag"
            ref={newTagRef}
            value={newTag}
          />
          <IconButton size="small" onClick={handleClickAddTag}>
            <AddIcon />
          </IconButton>
        </StyledTagsRow>
      </StyledHeader>
      <MdEditor
        value={body}
        style={{ height: 'calc(100% - 118px)' }}
        renderHTML={(markdownText) => {
          return mdParser.render(markdownText);
        }}
        onChange={handleChangeEditor}
      />
      <StyledFooter>
        <Button variant="outlined" color="secondary" onClick={onReloadNote}>
          Reload
        </Button>
        <ButtonSpacer>&nbsp;</ButtonSpacer>
        <Button variant="outlined" color="primary" onClick={handleSaveNote}>
          Save
        </Button>
      </StyledFooter>
    </>
  );
}

export { Editor };
