let rendererModule = {
    status: "pending",
    promise: null,
    result: null,
};

export default function lazyLegacyRoot(getLegacyComponent) {
    let componentModule = {
        status: "pending",
        promise: null,
        result: null,
    };

    return function Wrapper(props, context) {
        const createLegacyRoot = readModule(rendererModule, () =>
            import("./legacy/createLegacyRoot")
        ).default;

        const Component = readModule(componentModule, getLegacyComponent)
            .default;

        const rootRef = useRef(null);
        const containerRef = useRef(null);

        useLayoutEffect(() => {
            if (!rootRef.current) {
                rootRef.current = createLegacyRoot(containerRef.current);
            }
            const root = rootRef.current;
            return () => {
                root.unmount();
            };
        }, [createLegacyRoot]);

        useLayoutEffect(() => {
            if (rootRef.current) {
                rootRef.current.render(Component, props, context);
            }
        }, [Component, props, context]);

        return <div style={{ display: "contents" }} ref={containerRef} />;
    };
}

function readModule(record, createPromise) {
    if (record.status === "fulfilled") {
        return record.result;
    }

    if (record.status === "rejected") {
        throw record.result;
    }

    if (!record.promise) {
        record.promise = createPromise().then(
            (value) => {
                if (record.status === "pending") {
                    record.status = "fulfilled";
                    record.promise = null;
                    record.result = value;
                }
            },
            (error) => {
                if (record.status === "pending") {
                    record.status = "rejected";
                    record.promise = null;
                    record.result = error;
                }
            }
        );
    }
    throw record.promise;
}
