import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {
  private scrollPositions: { [key: string]: number } = {};

  // Save scroll position for a specific route
  saveScrollPosition(route: string, position: number): void {
    this.scrollPositions[route] = position;
  }

  // Get saved scroll position for a route
  getScrollPosition(route: string): number {
    return this.scrollPositions[route] || 0;
  }

  // Clear scroll position for a route
  clearScrollPosition(route: string): void {
    delete this.scrollPositions[route];
  }

  // Clear all saved scroll positions
  clearAllScrollPositions(): void {
    this.scrollPositions = {};
  }
}
