declare module 'element-resize-detector' {
  namespace elementResizeDetectorMaker {
    interface ElementResizeDetectorMaker {
      (opts: ElementResizeDetectorMakerOptions): ElementResizeDetectorInstance;
    }

    interface ElementResizeDetectorMakerOptions {
      strategy: 'scroll';
    }

    interface ElementResizeDetectorInstance {
      listenTo(element: HTMLElement, handler: ElementResizeDetectorEventHandler): void;
      uninstall(element: HTMLElement): void;
    }

    interface ElementResizeDetectorEventHandler {
      (element: HTMLElement): void;
    }
  }

  const elementResizeDetectorMaker: elementResizeDetectorMaker.ElementResizeDetectorMaker;

  export = elementResizeDetectorMaker;
}
