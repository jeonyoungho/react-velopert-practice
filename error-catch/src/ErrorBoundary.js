import React, { Component } from 'react';
import * as Sentry from "@sentry/react";

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error, info) {
        console.log('에러가 발생했습니다.');
        console.log({
            error,
            info
        });
        this.setState({
            error: true
        });

        /*
            프로젝트를 완성하여 실제 배포를 하게 됐을 때는 componentDidCatch 로 이미 에러를 잡아줬을 경우 Sentry 에게 자동으로 전달이 되지 않는다.
            그러기에 프로젝트 환경이 production 인지 확인 후 직접 error 정보를 보내주는 처리가 필요하다.
         */
        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, { extra: info });
        }
    }

    render() {
        if (this.state.error) {
            return <h1>에러 발생!</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;