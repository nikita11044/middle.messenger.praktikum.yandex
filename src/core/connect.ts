import Block, { Events } from './Block';
import store, { Indexed } from './store';
import { isEqual } from '../utils';

export default function connect(mapStateToProps: (state: Indexed) => Indexed, alias: string, compareFunc?: (state: Indexed, newState: Indexed) => boolean) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: Indexed, events: Events = {}) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state }, events);

        const storeUpdateCallback = () => {
          const newState = mapStateToProps(store.getState());

          const equal = compareFunc ? compareFunc(state, newState) : isEqual(state, newState);

          if (!equal) {
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.subscribe({ componentName: alias, func: storeUpdateCallback });
      }
    };
  };
}
