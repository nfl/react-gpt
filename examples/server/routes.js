import InfiniteScrollApp from "../apps/infinite-scrolling/app";
import LazyRenderApp from "../apps/lazy-render/app";
import ResponsiveApp from "../apps/responsive/app";
import RoutingApp from "../apps/routing/app";
import SingleRequestApp from "../apps/single-request/app";
import StaticAdApp from "../apps/static-ad/app";
import InterstitialApp from "../apps/interstitial/app";

export default {
    "infinite-scrolling": {
        title: "Infinite Scrolling Example",
        app: InfiniteScrollApp
    },
    "lazy-render": {title: "Lazy Render Example", app: LazyRenderApp},
    responsive: {title: "Responsive Example", app: ResponsiveApp},
    routing: {title: "Routing Example", app: RoutingApp},
    "single-request": {title: "Single Request Example", app: SingleRequestApp},
    "static-ad": {title: "Static Ad Example", app: StaticAdApp},
    interstitial: {title: "Interstitial Example", app: InterstitialApp}
};
