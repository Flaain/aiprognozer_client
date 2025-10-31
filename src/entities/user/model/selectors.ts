import type { UserStore } from "./types";

export const userSelector = (state: UserStore) => state.user;