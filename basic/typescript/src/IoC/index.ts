export class Container {
    private providers = new Map<Token<any>, Provider<any>>();

    private assertInjectableIfClassProvider<T>(provider: Provider<T>) {
        if (isClassProvider(provider) && !isInjectable(provider.useClass)) {
            throw new Error(
                `Cannot provide ${this.getTokenName(
                    provider.provide
                )} using class ${this.getTokenName(
                    provider.useClass
                )}, ${this.getTokenName(provider.useClass)} isn't injectable`
            );
        }
    }

    private getTokenName<T>(token: Token<T>) {
        return token instanceof InjectionToken
            ? token.injectionIdentifier
            : token.name;
    }

    private injectWithProvider<T>(type: Token<T>, provider?: Provider<T>): T {
        if (provider === undefined) {
            throw new Error(`No provider for type ${this.getTokenName(type)}`);
        }
        if (isClassProvider(provider)) {
            return this.injectClass(provider as ClassProvider<T>);
        } else if (isValueProvider(provider)) {
            return this.injectValue(provider as ValueProvider<T>);
        } else {
            return this.injectFactory(provider as FactoryProvider<T>);
        }
    }

    private injectValue<T>(valueProvider: ValueProvider<T>): T {
        return valueProvider.useValue;
    }

    private injectFactory<T>(valueProvider: FactoryProvider<T>): T {
        return valueProvider.useFactory();
    }

    private injectClass<T>(classProvider: ClassProvider<T>): T {
        const target = classProvider.useClass;
        const params = this.getInjectedParams(target);
        return Reflect.construct(target, params);
    }

    private getInjectedParams<T>(target: Type<T>) {
        const argTypes = Reflect.getMetadata(REFLECT_PARAMS, target) as (
            | InjectableParam
            | undefined
        )[];
        if (argTypes === undefined) {
            return [];
        }
        return argTypes.map((argType, index) => {
            // The reflect-metadata API fails on circular dependencies, and will return undefined
            // for the argument instead.
            if (argType === undefined) {
                throw new Error(
                    `Injection error. Recursive dependency detected in constructor for type ${target.name} 
                 with parameter at index ${index}`
                );
            }
            const overrideToken = getInjectionToken(target, index);
            const actualToken =
                overrideToken === undefined ? argType : overrideToken;
            let provider = this.providers.get(actualToken);
            return this.injectWithProvider(actualToken, provider);
        });
    }

    addProvider<T>(provider: Provider<T>) {
        this.assertInjectableIfClassProvider(provider);
        this.providers.set(provider.provide, provider);
    }
    inject<T>(type: Token<T>): T {
        let provider = this.providers.get(type);
        if (provider === undefined && !(type instanceof InjectionToken)) {
            provider = { provide: type, useClass: type };
            this.assertInjectableIfClassProvider(provider);
        }
        return this.injectWithProvider(type, provider);
    }
}

interface Type<T> extends Function {
    new (...args: any[]): T;
}
class InjectionToken {
    constructor(public injectionIdentifier: string) {}
}
type Token<T> = Type<T> | InjectionToken;

export type Factory<T> = () => T;
export interface BaseProvider<T> {
    provide: Token<T>;
}
export interface ClassProvider<T> extends BaseProvider<T> {
    provide: Token<T>;
    useClass: Type<T>;
}
export interface ValueProvider<T> extends BaseProvider<T> {
    provide: Token<T>;
    useValue: T;
}
export interface FactoryProvider<T> extends BaseProvider<T> {
    provide: Token<T>;
    useFactory: Factory<T>;
}
export type Provider<T> =
    | ClassProvider<T>
    | ValueProvider<T>
    | FactoryProvider<T>;

export function isClassProvider<T>(
    provider: BaseProvider<T>
): provider is ClassProvider<T> {
    return (provider as any).useClass !== undefined;
}

export function isValueProvider<T>(
    provider: BaseProvider<T>
): provider is ValueProvider<T> {
    return (provider as any).useValue !== undefined;
}

export function isFactoryProvider<T>(
    provider: BaseProvider<T>
): provider is FactoryProvider<T> {
    return (provider as any).useFactory !== undefined;
}

export function isInjectable<T>(target: Type<T>) {
    return Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;
}

declare type ClassDecorator = <TFunction extends Function>(
    target: TFunction
) => TFunction | void;

declare type ParameterDecorator = (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) => void;



const API_URL = new InjectionToken("apiUrl");

@Injectable()
class HttpClient {}

@Injectable()
class HttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}
}

const container = new Container();

container.addProvider({
  provide: API_URL,
  useValue: "https://www.semlinker.com/",
});

container.addProvider({ provide: HttpClient, useClass: HttpClient });
container.addProvider({ provide: HttpService, useClass: HttpService });

const httpService = container.inject(HttpService);
console.dir(httpService);