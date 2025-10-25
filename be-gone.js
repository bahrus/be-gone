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
            whenStr: {},
            onDefined: {},
            onEmptyContents: {},
        },
        positractions: [resolved, rejected],
        compacts: {
            when_onDefined_changes_call_onOnDefined: 0,
            when_onEmptyContents_changes_call_onOnEmptyContents: 0,
            when_whenStr_changes_call_parseWhen: 0,
        }
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     */
    parseWhen(self){
        const {whenStr} = self;
        if(whenStr === 'contents are empty'){
            return  /** @type {PAP} */ ({
                onEmptyContents: true
            });
        }
        const withoutIsDefined = whenStr.replace(' is defined', '').trim();
        const customElementNames = withoutIsDefined.split(',').map(s => s.trim());
        return  /** @type {PAP} */ ({
            onDefined: customElementNames
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
    async onOnEmptyContents(self){
        const {enhancedElement} = self;
        //when enhancedElement contains no children, remove enhancementElement
        //use mutation observer to detect changes
        if(enhancedElement.children.length === 0){
            enhancedElement.remove();
            return /** @type {PAP} */ ({
                resolved: true
            });
        }
        const mutObserver = this.#mutObserver = new MutationObserver(() => {
            if(enhancedElement.children.length === 0){
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