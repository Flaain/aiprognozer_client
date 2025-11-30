import { lazy } from 'react';

export const ProductView = lazy(() => import('../ui/ui').then((module) => ({ default: module.Product })));
export const DailyProductView = lazy(() => import('../ui/daily').then((module) => ({ default: module.DailyProduct })));