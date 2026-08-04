//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-gone/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'beGone',
        spawn: 'be-gone/be-gone.js',
        withAttrs: {
            base: 'be-gone',
            whenDef: '${base}-when-defined',
            _whenDef: {
                instanceOf: 'String'
            },
            whenMissing: '${base}-when-missing',
            _whenMissing: {
                instanceOf: 'String'
            }
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        compacts: {
            when_whenDef_changes_call_parseWhenDef: 0,
            when_onDefined_changes_call_onOnDefined: 0,
            when_whenMissing_changes_call_hydrateOnMissing: 0,
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
