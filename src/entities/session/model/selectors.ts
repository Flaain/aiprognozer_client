import type { SessionStore } from './types';

export const sessionActionsSelector = (state: SessionStore) => state.actions;
export const sessionFlagsSelector = ({ isAuthInProgress, isAuthorized }: SessionStore) => ({ isAuthInProgress, isAuthorized });