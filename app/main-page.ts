import { NavigatedData, Page } from '@nativescript/core';
import { TripPlannerViewModel } from './components/trip-planner';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new TripPlannerViewModel();
}