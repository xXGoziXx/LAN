//alert("I'm not bugged!");

function setupCurrentWindowNormal(page) {
    overwolf.games.getRunningGameInfo(function(gameInfo) {
        if (true) {
            overwolf.utils.getMonitorsList(function(result) {
                _screenWidth = 0;
                _screenHeight = 0;
                for (var display in result.displays) {
                    if (result.displays[display].is_primary) {
                        this._screenWidth = result.displays[display].width;
                        this._screenHeight = result.displays[display].height;
                    }
                }
                overwolf.windows.getCurrentWindow(function(result) {
                    _windowWidth = 560;
                    _windowHeight = 750;
                    _subWindowWidth = 560;
                    _subWindowHeight = 450;
                    _left = Math.round((_screenWidth - _windowWidth) / 2);
                    _top = Math.round((_screenHeight - _windowHeight) / 2);

                    if (page == 'home') {
                        overwolf.windows.changePosition(result.window.id, _left, _top, null);
                        overwolf.windows.changeSize(result.window.id, _windowWidth, _windowHeight, null);
                        location.href += '#!Home';
                    } else if (page == 'sub') {
                        overwolf.windows.changePosition(result.window.id, 0, Math.round(_screenHeight - _subWindowHeight), null);
                        overwolf.windows.changeSize(result.window.id, _subWindowWidth, _subWindowHeight, null);
                        location.href += '#!SubHome';
                    }
                });
            });
        }
    });
}

// removes tips
function removeTips(type) {
    var box = document.getElementsByName(type + "Check");
    var Tips = JSON.parse(localStorage.getItem(type + "TipsStorage"));
    var Time = JSON.parse(localStorage.getItem(type + "Time"));

    for (var i = 0; i < box.length; i++) {
        if (box[i].checked) {
            box[i].checked = false;
            Tips[Tips.length - i - 1] = null;
            Time[Time.length - i - 1] = null;
        }
    }

    //removes all the gaps(nulls) in the array
    var tempTips = [];
    var tempTime = [];
    for (var i = 0; i < box.length; i++) {
        if (Tips[i] !== null) {
            tempTips.push(Tips[i]);
            tempTime.push(Time[i]);
        }
    }
    var TimeKey = type + "Time";
    var TimeValue = JSON.stringify(tempTime);

    var TipsKey = type + "TipsStorage";
    var TipsValue = JSON.stringify(tempTips);

    window.localStorage.setItem(TimeKey, TimeValue);
    window.localStorage.setItem(TipsKey, TipsValue);
}

//flashes animation background
function flash() {
    document.getElementById("clearme").style.background = "linear-gradient(270deg, #1e5799, #019fde, #1e5799)";
    document.getElementById("clearme").style.backgroundSize = "200% 200%";
    document.getElementById("clearme").style.WebkitAnimation = "selected 1s linear 1";
    document.getElementById("clearme").style.animation = "selected 1s linear 1";
    setTimeout(flashback, 785);
}

function flashback() {
    document.getElementById("clearme").style.background = "rgb(30, 87, 153)";
    document.getElementById("clearme").style.background = "-moz-linear-gradient(left, rgba(30, 87, 153, 1) 10%, rgba(41, 137, 216, 1) 50%, rgba(30, 87, 153, 1) 90%)";
    document.getElementById("clearme").style.background = "-webkit-linear-gradient(left, rgba(30, 87, 153, 1) 10%, rgba(41, 137, 216, 1) 50%, rgba(30, 87, 153, 1) 90%)";
    document.getElementById("clearme").style.background = "linear-gradient(to right, rgba(30, 87, 153, 1) 10%, rgba(41, 137, 216, 1) 50%, rgba(30, 87, 153, 1) 90%)";
    document.getElementById("clearme").style.filter = "progid: DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#1e5799', GradientType=1)";
    document.getElementById("clearme").style.webkitAnimation = 'none';
    document.getElementById("clearme").style.animation = 'none';
}
//checks all the boxes
function selectAll(type) {
    var selected = true;

    var box = document.getElementsByName(type + 'Check');
    for (var i = 0; i < box.length; i++) {
        if (box[i].checked === false) {
            box[i].checked = true;
            box[i].parentElement.style.background = "linear-gradient(270deg, #1e5799, #019fde, #1e5799)";
            box[i].parentElement.style.backgroundSize = "250% 250%";
            box[i].parentElement.style.WebkitAnimation = "selected 2s  linear infinite";
            box[i].parentElement.style.animation = "selected 2s  linear infinite";
            selected = false;

        }
    }
    if (selected === true) {
        for (var i = 0; i < box.length; i++) {
            box[i].checked = false;
            box[i].parentElement.style.background = "inherit";
        }
    }
}

/*
    Build some arrays and save them in the localStorage.
    Then clears the text field.
    If it doesn't work it alerts that there's an error.
    */
function storeIt(e, type) {
    /*clear localStorage*/
    //localStorage.removeItem("deathTime");
    //localStorage.removeItem("deathTipsStorage");
    //localStorage.removeItem("matchTime");
    //localStorage.removeItem("matchTipsStorage");
    e.preventDefault();

    if (type == 'death') {
        // deathTime to save in localStorage
        if (localStorage.getItem("deathTime") === null) {
            var deathTimeValue = [];
            deathTimeValue[deathTimeValue.length] = currentTime();
            // name of localStorage key
            var deathTimeKey = "deathTime";
            // parse json object to string
            deathTimeValue = JSON.stringify(deathTimeValue);
            // save the string in localStorage
            window.localStorage.setItem(deathTimeKey, deathTimeValue);
        } else {
            var deathTimeTemp = localStorage.getItem("deathTime");
            var deathTimeValue = JSON.parse(deathTimeTemp);
            deathTimeValue[deathTimeValue.length] = currentTime();
            // name of localStorage key
            var deathTimeKey = "deathTime";
            // parse json object to string
            deathTimeValue = JSON.stringify(deathTimeValue);
            // save the string in localStorage
            window.localStorage.setItem(deathTimeKey, deathTimeValue);
        }

        // deathTipsStorage to save in localStorage
        if (localStorage.getItem("deathTipsStorage") === null) {
            var deathTipValue = [];
            deathTipValue[deathTipValue.length] = $('.input-text').val();
            // name of localStorage key
            var deathTipKey = "deathTipsStorage";
            // parse json object to string
            deathTipValue = JSON.stringify(deathTipValue);
            // save the string in localStorage
            window.localStorage.setItem(deathTipKey, deathTipValue);
        } else {
            var deathTipTemp = localStorage.getItem("deathTipsStorage");
            var deathTipValue = JSON.parse(deathTipTemp);
            deathTipValue[deathTipValue.length] = $('.input-text').val();
            // name of localStorage key
            var deathTipKey = "deathTipsStorage";
            // parse json object to string
            deathTipValue = JSON.stringify(deathTipValue);
            // save the string in localStorage
            window.localStorage.setItem(deathTipKey, deathTipValue);
        }
    } else if (type == 'match') {
        // matchTime to save in localStorage
        if (localStorage.getItem("matchTime") === null) {
            var matchTimeValue = [];
            matchTimeValue[matchTimeValue.length] = currentTime();
            // name of localStorage key
            var matchTimeKey = "matchTime";
            // parse json object to string
            matchTimeValue = JSON.stringify(matchTimeValue);
            // save the string in localStorage
            window.localStorage.setItem(matchTimeKey, matchTimeValue);
        } else {
            var matchTimeTemp = localStorage.getItem("matchTime");
            var matchTimeValue = JSON.parse(matchTimeTemp);
            matchTimeValue[matchTimeValue.length] = currentTime();
            // name of localStorage key
            var matchTimeKey = "matchTime";
            // parse json object to string
            matchTimeValue = JSON.stringify(matchTimeValue);
            // save the string in localStorage
            window.localStorage.setItem(matchTimeKey, matchTimeValue);
        }
        // matchTipsStorage to save in localStorage
        if (localStorage.getItem("matchTipsStorage") === null) {
            var matchTipValue = [];
            matchTipValue[matchTipValue.length] = $('.input-text').val();
            // name of localStorage key
            var matchTipKey = "matchTipsStorage";
            // parse json object to string
            matchTipValue = JSON.stringify(matchTipValue);
            // save the string in localStorage
            window.localStorage.setItem(matchTipKey, matchTipValue);
        } else {
            var matchTipTemp = localStorage.getItem("matchTipsStorage");
            var matchTipValue = JSON.parse(matchTipTemp);
            matchTipValue[matchTipValue.length] = $('.input-text').val();
            // name of localStorage key
            var matchTipKey = "matchTipsStorage";
            // parse json object to string
            matchTipValue = JSON.stringify(matchTipValue);
            // save the string in localStorage
            window.localStorage.setItem(matchTipKey, matchTipValue);
        }
    } else {
        alert("Storing Error!");
    }
    clearme.value = "";
};

function rand(ideas) {
    return Math.round(Math.random() * (ideas.length - 1));
}

function ideasPlease() {
    // if (localStorage.getItem("ideasStorage") === null) {
    /*helpful tips to save in ideasStorage*/
    var ideasStorageValue = ["Don't pretend you didn't mess up or try to blame others for your mistake. Own up to it and apologise especially if it has made someone else's lane harder...",
        "Don't be afraid to ask questions, because learning from your mistakes is the silver lining of making mistakes...",
        "Once you've identified the 'why' of your mistake, you can implement measures to make sure it doesn't happen again...",
        "Focusing on one mistake and redeeming it while sacrificing other work is just going to cause more mistakes...",
        "Don't let one mistake overshadow everything else...",
        "If you're constantly beating yourself up about one mistake it will reflect in your attitude and playstyle...",
        "Don't waste time doing nothing. Be proactive!",
        "Stay positive, and don't be too hard on yourself!",
        "When behind during the laning phase, keep these three steps in mind: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1. If you're not sure you can win a trade or a fight, don't enter into it. &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2. Try to freeze the wave and farm under the tower. &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;3. Make sure your lane is warded before trying anything aggressive. If possible, get a Vision Ward. Safety is definitely worth the 75g...",
        "Pay attention to pings and warnings from your team to avoid getting caught out of position...",
        "Avoid flamming at all costs! If you have nothing positive or productive to say, then don't say anything at all.                                          Silence is the best answer given to a fool...",
        "If you're getting flamed and you're starting to get tilted, mute the teammate. The button's there for a reason...",
        "Focus on objectives instead of kills! This game is all about strategy and fun, but don't get sidetracked...",
        "Bored? Not sure what to do? Try to figure out where the missing enemy teammates are..."
    ];
    // name of localStorage key
    var ideasStorageKey = "ideasStorage";
    // parse json object to string
    ideasStorageValue = JSON.stringify(ideasStorageValue);
    // save the string in localStorage
    window.localStorage.setItem(ideasStorageKey, ideasStorageValue);
    // }
    var ideas = JSON.parse(localStorage.getItem("ideasStorage"));
    var x = rand(ideas);
    return "#" + (x + 1) + " - " + ideas[x];
}

function currentTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    yyyy = yyyy.toString();
    var yy = yyyy.substring(2); //changes it to 2-digit format
    var hH = today.getHours();
    var mM = today.getMinutes();
    var sS = today.getSeconds();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    if (hH < 10) {
        hH = '0' + hH
    }
    if (mM < 10) {
        mM = '0' + mM
    }
    if (sS < 10) {
        sS = '0' + sS
    }

    today = dd + '/' + mm + '/' + yy + ' ' + hH + ':' + mM;
    return today;
}

function dragResize(edge) {
    overwolf.windows.getCurrentWindow(function(result) {
        if (result.status == "success") {
            overwolf.windows.dragResize(result.window.id, edge);
        }
    });
}

function dragMove() {
    overwolf.windows.getCurrentWindow(function(result) {
        if (result.status == "success") {
            overwolf.windows.dragMove(result.window.id);
            document.getElementById('content').style.cursor = "move";
        }
    });
}

function cursorNormal() {
    document.getElementById('content').style.cursor = "default";
}

function closeWindow() {
    overwolf.windows.getCurrentWindow(function(result) {
        if (result.status == "success") {
            overwolf.windows.close(result.window.id);
        }
    });
}

function openSubWindow() {
    //alert("the subwindow will only be visible inside a game");
    overwolf.windows.obtainDeclaredWindow("SubWindow", function(result) {
        if (result.status == "success") {
            overwolf.windows.restore(result.window.id, function(result) {
                console.log(result);
            });
        }
    });
}

function takeScreenshot() {
    overwolf.media.takeScreenshot(function(result) {
        if (result.status == "success") {
            var img = document.getElementById("screenshot");
            img.src = result.url;
            img.onload = function() {
                overwolf.media.shareImage(img, "Screen Shot");
            };
        }
    });
}

function runTeamSpeak() {
    overwolf.extensions.launch("lafgmhfbkjljkgoggomibmhlpijaofafbdhpjgif");
}

// this a subset of the features that LoL events provides - however,
// when writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retreiving all
// features
var g_interestedInFeatures = [
    'summoner_info',
    'gameMode',
    'teams',
    'matchState',
    'spellsAndAbilities',
    'death',
    'kill',
    'assist',
    'minions'
    //'gold'
];

function setFeatures() {
    overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(info) {
        if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
        }

        console.log("Set required features:");
        console.log(JSON.stringify(info));
    });
}

function registerEvents() {
    // general events errors
    overwolf.games.events.onError.addListener(function(info) {
        console.log("Error: " + JSON.stringify(info));
    });

    // "static" data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(function(info) {
        console.log("Info UPDATE: " + JSON.stringify(info));
    });

    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(function(info) {
        console.log("EVENT FIRED: " + JSON.stringify(info));
        //opens the SubWindow when the death event has occured
        if (info.events[0].name == "death") {
            overwolf.windows.obtainDeclaredWindow("SubWindow",
                function(result) {
                    if (result.status == "success") {
                        overwolf.windows.restore(result.window.id,
                            function(result) {}
                        );
                    }
                }
            );
        }
    });

    // on hotkey pressed
    overwolf.settings.registerHotKey(
        "disable_marquee",
        function(arg) {
            if (arg.status == "success") {
                var x = document.getElementById("hotkey");
                if (x.style.display === 'none') {
                    x.style.display = 'block';
                } else {
                    x.style.display = 'none';
                }
            }
        }
    );
}

function gameLaunched(gameInfoResult) {
    if (!gameInfoResult) {
        return false;
    }

    if (!gameInfoResult.gameInfo) {
        return false;
    }

    if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
        return false;
    }

    if (!gameInfoResult.gameInfo.isRunning) {
        return false;
    }

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfoResult.gameInfo.id / 10) != 5426) {
        return false;
    }

    console.log("LoL Launched");
    return true;

}

function gameRunning(gameInfo) {

    if (!gameInfo) {
        return false;
    }

    if (!gameInfo.isRunning) {
        return false;
    }

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfo.id / 10) != 5426) {
        return false;
    }

    console.log("LoL Running");
    return true;

}

// Start here
overwolf.games.onGameInfoUpdated.addListener(function(res) {
    console.log("onGameInfoUpdated: " + JSON.stringify(res));
    if (gameLaunched(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
});

overwolf.games.getRunningGameInfo(function(res) {
    if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
    console.log("getRunningGameInfo: " + JSON.stringify(res));
});
