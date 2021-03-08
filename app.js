const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)


/**
 * @function formatStringToSec
 * @description Formats String-{hh:mm:ss} to seconds format
 * @param {String} 'hh:mm:ss'
 * @returns {Number} seconds
 * */
function formatStringToSec(timeString='00:00:00') {
    //param should be in format HH:MM:SS
    let seconds = 0
    timeString.trim().split(':').reverse().forEach((time, index) => {
        if (index == 0) {
            seconds = seconds + (+time)
        } else {
            seconds = seconds + ((+time) * (index * 60))
        }
    })
    console.log('HH:MM:SS -> ' + timeString + ' => converted to seconds : ' + seconds)
    return seconds
}


/**
 * @function trimVideo
 * @description Trims video from start time to end time
 * @param {String, String} 'hh:mm:ss', 'hh:mm:ss'
 * @returns {} outputs file
 * */
function trimVideo(startTime='00:00:00', endTime='00:00:00', fileName='input', extention='mp4') {
    let startSec = formatStringToSec(startTime)
    let endSec = formatStringToSec(endTime)
    let duration = endSec - startSec

    //File Location
    let fileLocation = './input_video/'+fileName.trim()+'.'+extention

    ffmpeg(fileLocation) // MENTION file name and extention
        .setStartTime(startTime) //hh:mm:ss
        .setDuration(duration.toString()) // seconds 
        .output('./output_video/video_out.mp4')
        .on('end', function (err) {
            if (!err) { console.log('conversion Done') }
        })
        .on('error', function (err) {
            console.log('error: ', err)
        }).run()
}


function mergeVideos() {
}


// start time, end time, filename, extention
trimVideo('00:04:00','00:07:00','input','webm');
