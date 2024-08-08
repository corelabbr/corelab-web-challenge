import eventMessage from "../utils/eventMessage";

export default function useFlashMessage() {
  function setFlashMessage(msg: string, type: string) {
    eventMessage.emit("flash", {
      message: msg,
      type: type,
    });
  }

  return { setFlashMessage };
}
