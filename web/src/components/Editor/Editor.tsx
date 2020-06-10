import React, { useEffect, useRef, useState, Fragment } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import styled from "styled-components";

import { deleteElement } from "utils/array";
import { Note } from "./EditorContainer";

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

interface Props {
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
}: Props) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(note.title || "");
  }, [note]);

  const [body, setBody] = useState("");
  useEffect(() => {
    setBody(note.body || "");
  }, [note]);

  const newTagRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    setTags(note.tags || []);
  }, [note]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeEditor = ({
    html,
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

  const [newTag, setNewTag] = useState("");
  const handleChangeNewTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleClickAddTag = async () => {
    const result = await onAddTag(newTag);
    if (result) {
      setTags([...tags, newTag]);
      if (newTagRef && newTagRef.current) {
        newTagRef.current.value = "";
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const result = onDeleteTag(tagToDelete);
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
            ref={newTagRef}
            placeholder="new tag"
            onChange={handleChangeNewTag}
          />
          <IconButton size="small" onClick={handleClickAddTag}>
            <AddIcon />
          </IconButton>
        </StyledTagsRow>
      </StyledHeader>
      <MdEditor
        value={body}
        style={{ height: "calc(100% - 118px)" }}
        renderHTML={(mardownText) => {
          return mdParser.render(mardownText);
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
