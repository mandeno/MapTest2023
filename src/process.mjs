//importing the modules that are needed
import {collect} from "@turf/turf";
import sites from "../data/sites.json" assert {type: "json"};
import neighborhoods from "../data/neighborhoods.json" assert {type: "json"};
import fs from "fs";

//code below adds data only to the points in memory, does not change the json file
sites.features.forEach(function(feature) {
    feature.properties = {
        count: 1
    };
});

//this is the code that actual aggregates the data into the polygons in memory only and turns the array of counts into an integer and adds an ID to each feature
let output = collect(neighborhoods, sites, "count", "count");
output.features.forEach(function(feature, index) {
    feature.properties.count = feature.properties.count.length;
    feature.id = index;
});

//this writes it to a new json file
output = JSON.stringify(output);
fs.writeFile("../data/output.json",output,function(error) {
    if (error) throw error;
    console.log("success. 👍");
});
