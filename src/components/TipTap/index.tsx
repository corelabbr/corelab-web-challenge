import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Emojis from "../../util/Emojis";
import { RiCloseLine, RiListOrdered2, RiListUnordered } from "react-icons/ri";
import Placeholder from "@tiptap/extension-placeholder";
import { FaBold } from "react-icons/fa";
import { FiItalic } from "react-icons/fi";
import { MdEmojiEmotions } from "react-icons/md";

interface MenuBar {
  editor: Editor;
  isEditingContent?: boolean;
  setIsEditingContent?: (content: boolean) => void;
}

const MenuBar = ({
  editor,
  setIsEditingContent,
  isEditingContent,
}: MenuBar) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiModalRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

  function handleShowEmoji(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    setShowEmoji((prev) => !prev);
  }

  function handleChooseEmoji(
    e: React.MouseEvent<HTMLLIElement>,
    emoji: { character: string },
  ) {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().insertContent(emoji.character).run();
    setShowEmoji(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      emojiModalRef.current &&
      !emojiModalRef.current.contains(event.target as Node)
    ) {
      setShowEmoji(false);
    }
  }

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  return (
    <div className="button-group">
      {showEmoji && (
        <div className="emoji-modal" ref={emojiModalRef}>
          <div className="emoji-header">
            <span>Emojis</span>
            <button
              onClick={(e) => {
                handleShowEmoji(e);
                if (setIsEditingContent && isEditingContent === true) {
                  setIsEditingContent(false);
                }
              }}
            >
              <RiCloseLine />
            </button>
          </div>
          <ul className="emoji-ul">
            {Emojis.map((emoji, index) => (
              <li
                key={index}
                onClick={(e) => {
                  handleChooseEmoji(e, emoji);
                }}
              >
                {emoji.character}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="emoji-button"
        onClick={(e) => {
          handleShowEmoji(e);
        }}
      >
        <MdEmojiEmotions />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FiItalic />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <RiListUnordered />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <RiListOrdered2 />
      </button>
    </div>
  );
};

const getExtensions = () => {
  let extensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: "Escreva sua próxima tarefa ",
    }),
  ];

  return extensions;
};

interface MenuBarProps {
  setContent: (content: string) => void;
  initialContent: string;
  isEditingContent?: boolean;
  setIsEditingContent?: (content: boolean) => void;
}

const Tiptap = forwardRef(
  (
    {
      setContent,
      initialContent,
      setIsEditingContent,
      isEditingContent,
    }: MenuBarProps,
    ref,
  ) => {
    const [isInitialContentApplied, setIsInitialContentApplied] =
      useState(false);

    const previousContentRef = useRef<string | null>(null);

    const editor = useEditor({
      extensions: getExtensions(),
      content: initialContent || "<p> </p>",
      onUpdate: ({ editor }) => {
        const text = editor.getHTML();

        if (text !== previousContentRef.current) {
          setContent(text);
          previousContentRef.current = text;
        }
      },
    });

    useImperativeHandle(ref, () => ({
      resetContent: () => {
        if (editor) {
          editor.commands.clearContent();
          setIsInitialContentApplied(false);
        }
      },
    }));

    useEffect(() => {
      if (editor && initialContent && !isInitialContentApplied) {
        editor.commands.setContent(initialContent, false);
        setIsInitialContentApplied(true);
      }
    }, [initialContent, editor, isInitialContentApplied]);

    if (!editor) {
      return null;
    }

    return (
      <div className="container-tiptap">
        <div className="content-tiptap">
          <EditorContent editor={editor} />
        </div>
        <div className="wrap-menu-tiptap">
          <MenuBar
            editor={editor}
            setIsEditingContent={setIsEditingContent}
            isEditingContent={isEditingContent}
          />
        </div>
      </div>
    );
  },
);

export default Tiptap;
