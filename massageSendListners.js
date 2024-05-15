import { massageSendButton } from "./api.js";

export const massageSendListners = (massageSendButton, {addComment}) => {
  return massageSendButton.addEventListener("click", addComment);
  
}