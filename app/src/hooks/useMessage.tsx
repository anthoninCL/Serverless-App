import { useContext } from 'react';
import {MessageContext} from "../providers/MessageProvider";

export const useMessage = () => useContext(MessageContext);

export default useContext;
