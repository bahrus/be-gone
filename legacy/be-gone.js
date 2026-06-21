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
            whenDef: {},
            onDefined: {},
            whenMissing: {},
        },
        positractions: [resolved, rejected],
        compacts: {
            when_onDefined_changes_call_onOnDefined: 0,
            when_whenMissing_changes_call_hydrateOnMissing: 0,
            when_whenDef_changes_call_parseWhenDef: 0,
        }
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     */
    parseWhenDef(self){
        const {whenDef} = self;
        return  /** @type {PAP} */ ({
            onDefined: whenDef.split(' ').map(s => s.trim()).filter(s => !s),
        });
    }

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

    /**
     * @type {MutationObserver|undefined}
     */
    #mutObserver;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async hydrateOnMissing(self){
        const {enhancedElement, whenMissing} = self;
        //when enhancedElement contains no children, remove enhancementElement
        //use mutation observer to detect changes
        if(!enhancedElement.querySelector(whenMissing)){
            enhancedElement.remove();
            return /** @type {PAP} */ ({
                resolved: true
            });
        }
        const mutObserver = this.#mutObserver = new MutationObserver(() => {
            if(!enhancedElement.querySelector(whenMissing)){
                mutObserver.disconnect();
                enhancedElement.remove();
            }
        });
        mutObserver.observe(enhancedElement, {
            childList: true,
        });
        return /** @type {PAP} */ ({
            resolved: true
        });
    }
}

await BeGone.bootUp();
export {BeGone}