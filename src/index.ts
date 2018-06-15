import elementResizeDetectorMaker = require('element-resize-detector');

export default class ResizeObserverLite {
  private hasResizeObserver: boolean;
  private erd?: elementResizeDetectorMaker.ElementResizeDetectorInstance;
  private listenedElement: Element | null = null;
  private rz?: ResizeObserver;

  constructor(private handler: ResizeObserverLiteEntriesHandler) {
    this.hasResizeObserver = typeof (<any> window).ResizeObserver !== 'undefined';
    if (this.hasResizeObserver) {
      this.rz = new ResizeObserver((entries) => {
        this.handler(getSize(entries[0].target));
      });
    } else {
      this.erd = elementResizeDetectorMaker({strategy: 'scroll'});
    }
  }

  observe(element: Element) {
    if (this.listenedElement !== element) {
      if (this.listenedElement) {
        this.disconnect();
      }

      if (element) {
        if (this.hasResizeObserver) {
          this.rz!.observe(element);
        } else {
          this.erd!.listenTo(element, (element) => {
            this.handler(getSize(element));
          });
        }
      }

      this.listenedElement = element;
    }
  }

  disconnect() {
    if (this.listenedElement) {
      if (this.hasResizeObserver) {
        this.rz!.disconnect();
      } else {
        this.erd!.uninstall(this.listenedElement!);
      }

      this.listenedElement = null;
    }
  }
}

function getSize(element: Element): ResizeObserverSize {
  const computedStyle = window.getComputedStyle(element) || {
    width: 0,
    height: 0
  };
  return {
    width: getNumber(computedStyle['width']!),
    height: getNumber(computedStyle['height']!)
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
  observe(element: Element): void;
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
  target: Element;
}
