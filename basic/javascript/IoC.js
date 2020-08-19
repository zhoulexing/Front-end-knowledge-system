const REFLECT_PARAMS = "design:paramtypes";
const INJECT_METADATA_KEY = Symbol("INJECT_KEY");


class Container {
    constructor() {
        this.providers = new Map();
    }

    injectClass(classProvider) {
        const target = classProvider.useClass;
        const params = this.getInjectedParams(target);
        return Reflect.construct(target, params);
    }

    injectValue(valueProvider) {
        return valueProvider.useValue;
    }

    injectFactory(factoryProvider) {
        return factoryProvider.useFactory();
    }

    getInjectedParams(target) {
        const argTypes = Reflect.getMetadata(REFLECT_PARAMS, target);
        if(!argTypes) {
            return [];
        }
        return argTypes.map((argType, index) => {
            const overrideToken = getInjectionToken(target, index);
            const actualToken = overrideToken || argType;
            let provider = this.providers.get(actualToken);
            return this.injectWithProvider(actualToken, provider);
        });
    }

    injectWithProvider(type, provider) {
        if(!provider.useClass) {
            return this.injectClass(provider);
        } else if(!provider.useValue) {
            return this.injectValue(provider);
        } else {
            return this.injectFactory(provider);
        }
    }

    addProvider(provider) {
        this.providers.set(provider.provide, provider);    
    }

    inject(type) {
        let provider = this.providers.get(type);
        if(!provider && type.useClass) {
            provider = { provide: provider, useClass: type };
        }
        return this.injectWithProvider(type, provider);
    }
}

function getInjectionToken(target, index) {
    return Reflect.getMetadata(INJECT_METADATA_KEY, target, `index-${index}`);
}