import toast from "react-hot-toast";

export default function createToast(
  type: "success" | "error" | "loading",
  msg: string,
  toastId?: string
) {
  if (type === "success") {
    return toast.success(msg, {
      id: toastId,
      duration: 5000,
      position: "top-right",
      style: {
        minWidth: "100px",
        fontWeight: 500,
      },
    });
  } else if (type === "error") {
    return toast.error(msg, {
      id: toastId,
      duration: 5000,
      position: "top-right",
      style: {
        minWidth: "100px",
        fontWeight: 500,
      },
    });
  } else if (type === "loading") {
    let toastId = toast.loading(msg, {
      duration: Infinity,
      position: "top-right",
      style: {
        minWidth: "100px",
        fontWeight: 500,
      },
    });
    return toastId;
  }
}
