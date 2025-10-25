// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-gone/types' */;

/**
 * @type {EMC<any, AP>}
 */
export const emc = {
    base: 'be-gone',
    branches: ['', 'when'],
    map: {
        '0.0': {
            instanceOf: 'Object',
            mapsTo: '.',
            
        },
        '1.0': {
            instanceOf: 'String',
            mapsTo: 'whenStr',
        }
    },
    enhPropKey: 'beGone',
    importEnh: async () => {
        const { BeGone } = await import('./be-gone.js');
        return BeGone;
    },
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
