import { useEffect, useState } from "react";
import eventMessage from "../../utils/eventMessage";
import { MessageContainer, MessageText } from "./Message.style";

interface Message {
  message: string,
  type: "success" | "error";
}

export default function Message() {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    const flashMessage = ({ message, type }: Message) => {
      setVisible(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setMessage("");
        setType("default");
        setVisible(false);
      }, 5000);
    };

    eventMessage.addListener("flash", flashMessage);

    return () => {
      eventMessage.removeListener("flash", flashMessage);
    };
  }, []);

  return (
    <MessageContainer type={type} $visible={visible ? true : false}>
      <MessageText type={type}>{message}</MessageText>
    </MessageContainer>
  );
}
