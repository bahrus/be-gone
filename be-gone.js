// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP} from './ts-refs/be-gone/types' */;

/**
 * @implements {Actions}
 * 
 */
class BeGone extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
        propInfo: {
            ...propInfo,
        },
        positractions: [resolved, rejected],
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async onOnDefined(self){
        const {onDefined, enhancedElement} = self;
        for(const def of onDefined){
            await customElements.whenDefined(def);
        }
        enhancedElement.remove();
        return /** @type {PAP} */ ({
            resolved: true
        });
    }
}

await BeGone.bootUp();
export {BeGone}