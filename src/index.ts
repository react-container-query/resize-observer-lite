import elementResizeDetectorMaker = require('element-resize-detector');

export default class ResizeObserverLite {
  private hasResizeObserver: boolean;
  private erd?: elementResizeDetectorMaker.ElementResizeDetectorInstance;
  private listenedElements: HTMLElement[] = [];
  private rz?: ResizeObserver;

  constructor(private handler: ResizeObserverLiteEntriesHandler) {
    this.hasResizeObserver = typeof (<any> window).ResizeObserver !== 'undefined';
    if (!this.hasResizeObserver) {
      this.erd = elementResizeDetectorMaker({strategy: 'scroll'});
    } else {
      this.rz = new ResizeObserver((entries) => {
        this.handler(getSize(entries[0].target));
      });
    }
  }

  observe(element: HTMLElement) {
    if (!this.hasResizeObserver) {
      this.erd!.listenTo(element, (element) => {
        this.handler(getSize(element));
      });
      this.listenedElements.push(element);
    } else {
      this.rz!.observe(element);
    }
  }

  disconnect() {
    if (!this.hasResizeObserver) {
      for (const element of this.listenedElements) {
        this.erd!.uninstall(element);
      }
      this.listenedElements = [];
    } else {
      this.rz!.disconnect();
    }
  }
}

function getSize(element: HTMLElement): ResizeObserverSize {
  return {
    width: getNumber(window.getComputedStyle(element)['width']!),
    height: getNumber(window.getComputedStyle(element)['height']!)
  };
}

function getNumber(str: string): number {
  const m = /^([0-9\.]+)px$/.exec(str);
  return m ? parseFloat(m[1]) : 0;
}

export interface ResizeObserverLiteEntriesHandler {
  (size: ResizeObserverSize): void;
}

export interface ResizeObserverSize {
  width: number;
  height: number;
}

declare class ResizeObserver {
  constructor(handler: ResizeObserverEntriesHandler);
  observe(element: HTMLElement): void;
  disconnect(): void;
}

interface ResizeObserverEntriesHandler {
  (entries: ResizeObserverEntry[]): void;
}

interface ResizeObserverEntry {
  contentRect: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };
  target: HTMLElement;
}
