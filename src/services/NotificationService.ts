import { toast } from "react-toastify";

export interface INotificationService {
  sucesso(mensagem: string): void;
  erro(mensagem: string): void;
  info(mensagem: string): void;
}

class ToastifyAdapter implements INotificationService {
  public sucesso(mensagem: string): void {
    toast.success(mensagem);
  }

  public erro(mensagem: string): void {
    toast.error(mensagem);
  }

  public info(mensagem: string): void {
    toast.info(mensagem);
  }
}

export const notificationService = new ToastifyAdapter();
