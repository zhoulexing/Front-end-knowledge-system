import App, { Container } from "next/app";
import Layout from "../layouts/BasicLayout";


class MyApp extends App {
    static async getInitialProps({ Component, router, ctx}) {
        let pageProps = {};
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return pageProps;
    }

    render() {
        const { Component, pageProps } = this.props;
        console.log(pageProps);
        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        );
    }
}

export default MyApp;
