const REFLECT_PARAMS = "design:paramtypes";
const INJECT_METADATA_KEY = Symbol("INJECT_KEY");
const INJECTABLE_METADATA_KEY = Symbol("INJECTABLE_KEY");

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
        if (!argTypes) {
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
        if (provider.useClass) {
            return this.injectClass(provider);
        } else if (provider.useValue) {
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
        if (!provider && type.useClass) {
            provider = { provide: provider, useClass: type };
        }
        return this.injectWithProvider(type, provider);
    }
}

function getInjectionToken(target, index) {
    return Reflect.getMetadata(INJECT_METADATA_KEY, target, `index-${index}`);
}

class InjectionToken {
    constructor(injectionIdentifier) {
        this.injectionIdentifier = injectionIdentifier;
    }
}

function Inject(token) {
    return function (target, _, index) {
        Reflect.defineMetadata(
            INJECT_METADATA_KEY,
            token,
            target,
            `index-${index}`
        );
        return target;
    };
}

function Injectable() {
    return function (target) {
        Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);
        return target;
    };
}

const API_URL = new InjectionToken("apiUrl");

@Injectable()
class HttpClient {}


@Injectable()
class HttpService {
    constructor(httpClient, @Inject(API_URL) apiUrl) {
        this.httpClient = httpClient;
        this.apiUrl = apiUrl;
    }
}

const container = new Container();
container.addProvider({
    provide: API_URL,
    useValue: "https://www.semlinker.com/",
});
container.addProvider({ provide: HttpClient, useClass: HttpClient });
container.addProvider({ provide: HttpService, useClass: HttpService });
const httpService = container.inject(HttpService);
console.log(httpService);
 