import type { SessionStore } from './types';

export const sessionActionsSelector = (state: SessionStore) => state.actions;
export const sessionFlagsSelector = ({ is_auth_in_progress, is_authorized }: SessionStore) => ({ is_auth_in_progress, is_authorized });