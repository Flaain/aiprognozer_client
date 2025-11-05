import { lazy } from 'react';

export const View = lazy(() => import('../ui/ui').then((module) => ({ default: module.VerificationForm })));