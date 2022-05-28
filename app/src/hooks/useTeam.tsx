import { useContext } from 'react';
import { TeamContext } from 'providers/TeamProvider';

export const useTeam = () => useContext(TeamContext);

export default useTeam;
