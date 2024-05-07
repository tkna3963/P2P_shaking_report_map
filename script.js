function updateClock() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // 2桁表示にするための補完
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    var timeString = year + '年' + month + '月' + date + '日' + hours + '時' + minutes + '分' + seconds + '秒';
    document.getElementById('clock').innerText = timeString;
}

function getOrangeColor(value) {
    var hue = 30 + (value * 30) / 100; // 0〜100の範囲の数値を30〜60の範囲にマッピング
    return 'hsl(' + hue + ', 100%, 50%)'; // Saturation（彩度）は100%、Lightness（明度）は50%固定
}

function P2P_9611() {
    const apiUrl = `https://api.p2pquake.net/v2/history?codes=9611&limit=1`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
        const P2P_9611_data = JSON.parse(xhr.responseText);
        const time = P2P_9611_data[0].time;
        const count = P2P_9611_data[0].count;
        const started_at = P2P_9611_data[0].started_at;
        const updated_at = P2P_9611_data[0].updated_at;
        const confidence=P2P_9611_data[0].confidence;
        if (typeof P2P_9611_data[0].area_confidences !== 'undefined' && P2P_9611_data[0].area_confidences !== null) {
            return { "time": time, "count": count, "started_at": started_at, "updated_at": updated_at,"confidence":confidence,"teleglam":P2P_9611_data};
        }else{
            const area_confidences=P2P_9611_data[0].area_confidences;
            return { "time": time, "count": count, "started_at": started_at, "updated_at": updated_at,"confidence":confidence,"area_confidences":area_confidences,"teleglam":P2P_9611_data};
        }
    }
}

function P2P_555(){
    const apiUrl = `https://api.p2pquake.net/v2/history?codes=555&limit=1`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
        const P2P_555_data = JSON.parse(xhr.responseText);
    }   
}