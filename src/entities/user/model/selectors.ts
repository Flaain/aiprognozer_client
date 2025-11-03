import type { UserStore } from "./types";

export const userSelector = (state: UserStore) => state.user;
export const userActionsSelector = (state: UserStore) => state.actions;