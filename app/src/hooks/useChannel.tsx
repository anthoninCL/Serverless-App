import { useContext } from 'react';
import { ChannelContext } from 'providers/ChannelProvider';

export const useChannel = () => useContext(ChannelContext);

export default useChannel;
