// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/be-gone/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
class BeGone {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @param {AP} self 
     * @returns {PAP}
     */
    parseWhenDef(self){
        const {whenDef} = self;
        return /** @type {PAP} */ ({
            onDefined: whenDef.split(' ').map(s => s.trim()).filter(s => s.length > 0),
        });
    }

    /**
     * @param {AP} self 
     * @returns {Promise<PAP>}
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
     * @param {AP} self 
     * @returns {Promise<PAP>}
     */
    async hydrateOnMissing(self){
        const {enhancedElement, whenMissing} = self;
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

export { BeGone }
