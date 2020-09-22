import App, { Container } from "next/app";
import Layout from "../layouts/BasicLayout";


class MyApp extends App {
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
