import { Note } from "@/services/notes/types";
import { useNavbarStore } from "@/stores/navbar";
import classNames from "classnames";
import { createElement, useEffect, useRef } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type TextElement = "input" | "textarea";

type Props = {
  as?: TextElement;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>; // temp
  hidden?: boolean;
  disabled?: boolean;
  setValue?: UseFormSetValue<any>;
};

function useTextAutoResize(target: HTMLTextAreaElement | EventTarget & HTMLTextAreaElement) {
  target.style.height = "inherit";
  target.style.height = `${Math.max(target.scrollHeight, 32)}px`;
}

export function CustomInput({
  as = "input",
  register,
  options,
  type = "text",
  name,
  disabled,
  setValue,
  ...props
}: Props) {
  const { isColumn } = useNavbarStore();
  const formRegister = register && name ? register(name, options) : null;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const classes = classNames({
    input: true,
    "pointer-events-none": disabled,
  });

  useEffect(() => {
    if (textareaRef.current) useTextAutoResize(textareaRef.current);
  }, [textareaRef, isColumn]);

  return (
    <>
      {createElement(as, {
        className: classes,
        ...formRegister,
        ...props,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (setValue && name) setValue(name as any, e.target.value);
          useTextAutoResize(e.target)
        },
        ref: textareaRef,
      })}
    </>
  );
}
