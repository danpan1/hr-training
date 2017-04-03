"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Danpan on 02.04.17.
 */
var csv_1 = require("csv");
var fs = require('fs');
var csvPath = '2017-4-2-1.csv';
var csvData = [];
var hrData = [];
var skipCount, rest = 0, zone1 = 0, zone2 = 0, zone3 = 0, zone4 = 0, zone5 = 0;
var restHr = 54, zone1Base = 96, zone2Base = 116, zone3Base = 135, zone4Base = 154, zone5Base = 173, maxHR = 187;
fs.createReadStream(csvPath)
    .pipe(csv_1.parse({
    delimiter: ',',
    auto_parse_date: true,
    relax_column_count: 5
}))
    .on('data', function (csvrow) {
    // console.log(csvrow≥w);
    //do something with csvrow
    // csvData.push([csvrow[0], csvrow[1]]);
    var dataObj = { time: csvrow[0], hr: csvrow[1] };
    csvData.push(dataObj);
    if (dataObj.hr > 60 && dataObj.hr < 1000) {
        hrData.push(parseInt(dataObj.hr));
    }
})
    .on('end', function () {
    //do something wiht csvData
    // console.log(csvData);
    // console.log(hrData);
    getAverage(hrData);
    getZones(hrData);
    getMaxOfArray(hrData);
});
// fs.createReadStream(csvPath).pipe(parser);
function getAverage(arr) {
    var length = arr.length;
    var sum = arr.reduce(function (a, b) { return (parseInt(a) + parseInt(b)); });
    var avg = sum / length;
    console.log('avg hr = ', avg.toFixed());
}
function getZones(arr) {
    var totalSec = arr.length / 100;
    arr.forEach(function (item) {
        if (item < zone1Base) {
            rest++;
        }
        else if (item < zone2Base) {
            zone1++;
        }
        else if (item < zone3Base) {
            zone2++;
        }
        else if (item < zone4Base) {
            zone3++;
        }
        else if (item < zone5Base) {
            zone4++;
        }
        else if (item < maxHR) {
            zone5++;
        }
    });
    console.log({
        rest: getZoneInfo(rest, totalSec),
        zone1: getZoneInfo(zone1, totalSec),
        zone2: getZoneInfo(zone2, totalSec),
        zone3: getZoneInfo(zone3, totalSec),
        zone4: getZoneInfo(zone4, totalSec),
        zone5: getZoneInfo(zone5, totalSec),
    });
}
function getZoneInfo(zone, totalSec) {
    return {
        timeMin: (zone / 60).toFixed(),
        timeSec: zone,
        percent: (zone / totalSec).toFixed()
    };
}
function getMaxOfArray(arr) {
    var maxNum = Math.max.apply(null, arr);
    console.log('max hr = ', maxNum);
}
