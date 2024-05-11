function Print_checker_for_debugging(data, name) {
    console.log(data, name)
}

function List_checker_for_debugging(listData, name) {
    var printText = '';

    function checkData(data, currentName) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (Array.isArray(data[key])) { // もし要素が配列なら再帰的に処理する
                    checkData(data[key], `${currentName} - ${key}`);
                } else if (typeof data[key] === 'object') { // もし要素がオブジェクトなら再帰的に処理する
                    checkData(data[key], `${currentName} - ${key}`);
                } else {
                    printText += `元リスト: ${currentName} データ: "${key}": ${data[key]}\n\n`;
                }
            }
        }
    }

    checkData(listData, name);
    console.log(printText);
}



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

function SUM(array) {
    // reduce() メソッドを使用してリストの総和を計算する
    var sum = array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);

    return sum;
}

function getOrangeColor(value) {
    var hue =(value * 30); // 0〜100の範囲の数値を30〜60の範囲にマッピング
    return 'hsl(' + hue + ', 100%, 50%)'; // Saturation（彩度）は100%、Lightness（明度）は50%固定
}

function P2P_Locatedatas() {
    const savedData = localStorage.getItem('P2P_locates_data');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://tkna3963.github.io/P2P_shaking_report_map/import_folder/P2P_code_locate.json', false); // 同期的にリクエストを行う
        xhr.send();
        if (xhr.status === 200) {
            const json_data = JSON.parse(xhr.responseText);
            localStorage.setItem('P2P_locates_data', JSON.stringify(json_data));
            return json_data;
        } else {
            console.error('Error loading settings:', xhr.status);
            return null;
        }
    }
}

function P2P_area_name_finder(numericCode) {
    var P2P_locate_json=P2P_Locatedatas()
    var numericCodeString = String(numericCode);
    return P2P_locate_json.find(function(item) {
        // 文字列型に変換した地域コード(数値型)と一致するかどうかを確認
        return item["地域コード(数値型)"] === numericCodeString;
    });
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
        const confidence = P2P_9611_data[0].confidence;
        if (typeof P2P_9611_data[0].area_confidences !== 'undefined' && P2P_9611_data[0].area_confidences !== null) {
            return { "time": time, "count": count, "started_at": started_at, "updated_at": updated_at, "confidence": confidence, "teleglam": P2P_9611_data };
        } else {
            const area_confidences = P2P_9611_data[0].area_confidences;
            return { "time": time, "count": count, "started_at": started_at, "updated_at": updated_at, "confidence": confidence, "area_confidences": area_confidences, "teleglam": P2P_9611_data };
        }
    }
}

function P2P_555() {
    const apiUrl = `https://api.p2pquake.net/v2/history?codes=555&limit=1`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
        const P2P_555_data = JSON.parse(xhr.responseText);
        const time = P2P_555_data[0].time;
        const created_at = P2P_555_data[0].created_at;
        const areas = P2P_555_data[0].areas;
        return { "time": time, "created_at": created_at, "areas": areas }
    }
}

function combineListsIntoObjects(Peer_list, area_list) {
    const combinedList = [];

    // Peer_listとarea_listの要素数が同じであることを確認
    if (Peer_list.length !== area_list.length) {
        console.error("Peer_listとarea_listの要素数が異なります");
        return combinedList;
    }

    for (let i = 0; i < Peer_list.length; i++) {
        const combinedObject = {
            "Peer": Peer_list[i],
            "area": area_list[i]["都道府県"]
        };
        combinedList.push(combinedObject);
    }

    return combinedList;
}

function calculateTotalPeers(data) {
    const result = {};

    // リスト内の各要素を処理して、地域ごとのPeerの合計を計算する
    data.forEach(item => {
        if (item.area in result) {
            result[item.area] += item.Peer;
        } else {
            result[item.area] = item.Peer;
        }
    });

    return result;
}

function pref_name_renamer(data) {
    const result = {};

    for (const [region, value] of Object.entries(data)) {
        if (region !== "県") {
            result[region] = value;
        }
    }

    return Object.fromEntries(
        Object.entries(result).map(([region, value]) => {
            if (region === "北海道") {
                return [region, value];
            } else {
                return [
                    region === "東京" ? "東京都" : (region === "京都" || region === "大阪") ? region + "府" : region + "県", 
                    value
                ];
            }
        })
    );
}




function colorizeNumbers(data) {
    const result = {};

    for (const [region, value] of Object.entries(data)) {
        result[region] = getOrangeColor(value);
    }

    return result;
}

function P2P_555_count() {
    const ID_list = [];
    const Peer_list = [];
    const area_list=[]
    const P2P_555_list = P2P_555();
    P2P_555_list["areas"].forEach(function (area) {
        ID_list.push(area.id);
        Peer_list.push(area.peer);
        area_list.push(P2P_area_name_finder(area.id));
    });
    const areas_info_list=combineListsIntoObjects(Peer_list,area_list);
    const pref_report_count=pref_name_renamer(calculateTotalPeers(areas_info_list));
    const area_color=colorizeNumbers(pref_report_count) 
    List_checker_for_debugging(area_color,"jｑ")

    const Peer_SUM = SUM(Peer_list)
    return {"ID_list":ID_list,"Peer_list":Peer_list,"Peer_SUM":Peer_SUM,"Each_prefecture_Number_of_peers":area_color}
}
