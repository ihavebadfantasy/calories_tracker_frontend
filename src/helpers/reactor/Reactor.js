import Reactor from './index';
import {
  SOME_EVENT
} from './events';

const reactor = new Reactor();

reactor.registerEvent(SOME_EVENT);

export default reactor;
