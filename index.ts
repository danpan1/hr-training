/**
 * Created by Danpan on 02.04.17.
 */
import {parse} from 'csv';
var fs = require('fs');

const csvPath = '2017-4-2-1.csv';
var csvData = [];
var hrData = [];
let skipCount, rest = 0, zone1 = 0, zone2 = 0, zone3 = 0, zone4 = 0, zone5 = 0;
let restHr = 54, zone1Base = 96, zone2Base = 116, zone3Base = 135, zone4Base = 154, zone5Base = 173, maxHR = 187;
fs.createReadStream(csvPath)
    .pipe(parse({
        delimiter: ',',
        auto_parse_date: true,
        relax_column_count: 5
    }))
    .on('data', function (csvrow) {
        // console.log(csvrow≥w);
        //do something with csvrow
        // csvData.push([csvrow[0], csvrow[1]]);
        let dataObj = {time: csvrow[0], hr: csvrow[1]};
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
    const length = arr.length;
    const sum = arr.reduce((a, b) => (parseInt(a) + parseInt(b)));
    const avg = sum / length;
    console.log('avg hr = ', avg.toFixed());
}
function getZones(arr) {
    const totalSec = arr.length/ 100;
    arr.forEach((item)=>{
        if(item < zone1Base){
            rest++;
        } else if(item < zone2Base){
            zone1++;
        } else if(item < zone3Base){
            zone2++;
        }else if(item < zone4Base){
            zone3++;
        }else if(item < zone5Base){
            zone4++;
        }else if(item < maxHR){
            zone5++;
        }
    });

    console.log({
      rest : getZoneInfo(rest, totalSec),
      zone1 : getZoneInfo(zone1, totalSec),
      zone2 : getZoneInfo(zone2, totalSec),
      zone3 : getZoneInfo(zone3, totalSec),
      zone4 : getZoneInfo(zone4, totalSec),
      zone5 : getZoneInfo(zone5, totalSec),
    });
}
function getZoneInfo(zone,totalSec){
    return {
        timeMin : (zone/60).toFixed(),
        timeSec : zone,
        percent:  (zone / totalSec).toFixed()
    }
}
function getMaxOfArray (arr){
    const maxNum = Math.max.apply(null, arr);
    console.log('max hr = ', maxNum);

}