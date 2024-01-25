import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export function toast(toast: { status: string, message: string}){
    return (
      Toastify({
        text: `${toast.message}`,
        gravity: "top",
        position: "center",
        style: {
          background: 
            toast.status === "success" ? "#9eff8b" : 
            toast.status === "warning" ? "#FFE8AC" : "#F99494",
          color: "#4F4F4D",
          fontWeight: "500",
          borderRadius: "3px",
        }
      }).showToast()
    )
}