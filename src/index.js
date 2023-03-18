import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import settings from "./settings.json";
import custom from "./custom-style.json";

let map;

async function init() {
    // line below should be repeated to add more data sources (along with all the other code in custom-style.json)
    // const sites = await import("../data/sites.json")
    const neighborhoods = await import("../data/output.json")
    const style = map.getStyle();

    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);
    map.setStyle(style);
    // This one below should also be repeated to add more data sources
    // map.getSource("sites").setData(sites);
    map.getSource("neighborhoods").setData(neighborhoods)
}

mapboxgl.accessToken = settings.accessToken;
map = new mapboxgl.Map(settings);
map.on("load", init);
