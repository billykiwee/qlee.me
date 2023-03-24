import { useStateValue } from "../../../provider/StateProvider";

export function usePopUp() {
  const [{ popUp }, dispatch] = useStateValue();

  const show = (content) => {
    dispatch({
      type: "SET_POPUP",
      popUp: content,
    });
  };

  return { popUp, show };
}
