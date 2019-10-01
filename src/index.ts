import { Event, Response, Status, Transport } from '@sentry/types';

export default class SentryConsoleTransport implements Transport {
  /**
   * @inheritDoc
   */
  public sendEvent(event: Event): Promise<Response> {
    if(event.exception && event.exception.values) {
      event.exception.values.forEach(error => {
        console.groupCollapsed('Sending to Sentry:', error.value);

        console.log('TYPE:', error.type);
        console.log('MESSAGE:', error.value);
        error.stacktrace && error.stacktrace.frames && console.log('LAST FRAME:', error.stacktrace.frames[0]);
        console.log('EXTRA:', event.extra);

        console.groupCollapsed('EVENT');
        console.log(error);
        console.groupEnd();

        console.groupEnd();
      });
    }


    return Promise.resolve({
      status: Status.Success,
    });
  }

  /**
   * @inheritDoc
   */
  public close(timeout?: number): Promise<boolean> {
    return Promise.resolve(true);
  }
}