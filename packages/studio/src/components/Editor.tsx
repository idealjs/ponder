import clsx from "clsx";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  className?: string;
  initialValue?: string;
}

const Editor = (props: IProps) => {
  const { className, initialValue } = props;
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current) {
      const editor = monaco.editor.create(monacoEl.current, {
        language: "javascript",
      });
      setEditor(editor);

      return () => {
        editor?.dispose();
        setEditor(null);
      };
    }
  }, []);

  return (
    <div className={clsx("h-full w-full", className)} ref={monacoEl}></div>
  );
};

export default Editor;
