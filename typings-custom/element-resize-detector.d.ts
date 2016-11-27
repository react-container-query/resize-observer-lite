declare module 'element-resize-detector' {
  namespace elementResizeDetectorMaker {
    interface ElementResizeDetectorMaker {
      (opts: ElementResizeDetectorMakerOptions): ElementResizeDetectorInstance;
    }

    interface ElementResizeDetectorMakerOptions {
      strategy: 'scroll';
    }

    interface ElementResizeDetectorInstance {
      listenTo(element: Element, handler: ElementResizeDetectorEventHandler): void;
      uninstall(element: Element): void;
    }

    interface ElementResizeDetectorEventHandler {
      (element: Element): void;
    }
  }

  const elementResizeDetectorMaker: elementResizeDetectorMaker.ElementResizeDetectorMaker;

  export = elementResizeDetectorMaker;
}
