$(() => {

    let iframe
    const gridSize = 10

    updateColor()

    //LOGIC

    drawGrid(gridSize)
    document.getElementById("start").onclick = () => {
        function iframeRef(frameRef) {
            return frameRef.contentWindow ?
                frameRef.contentWindow.document :
                frameRef.contentDocument
        }

        iframe = iframeRef(document.getElementById('twitter-widget-0'))
        updateTweetFeed()
        refreshGridData(document.getElementById('grid-container'))
    }



    function updateTweetFeed() {
        const loadButton = iframe.getElementsByClassName("timeline-LoadMore-prompt")[0]
        console.log(loadButton);
        loadButton.click()
    }

    function tweetsContentToList() {
        const tweetList = iframe.getElementsByClassName("timeline-Tweet-text")
        let tweetsContentList = [];
        for (let ti of tweetList) {
            tweetsContentList.push(ti.textContent)
        }
        return tweetsContentList
    }

    function getTweetData(tweet) {
        let res = []
        res.push(tweet.substring(27, 29)) //x
        res.push(tweet.substring(30, 32)) //y
        res.push(tweet.substring(33, 39)) //colorcode

        if (res[0].match(/^\d{1,2}$/) && res[1].match(/^\d{1,2}$/) && res[2].match(/^[0-9A-F]{6}$/i))
            res.push(true)
        else
            res.push(false)
        return res
    }

    function getAllvalidTweets() {
        let res = []
        for (let tweet of tweetsContentToList()) {
            if (getTweetData(tweet)[3])
                res.push(getTweetData(tweet))
        }
        return res
    }



    //VIEW

    function drawGrid(gridSize) {
        const gridContiner = document.getElementById("grid-container")
        for (let i = 0; i <= gridSize; i++) {
            for (let j = 0; j <= gridSize; j++) {
                const node = document.createElement('div')
                node.setAttribute('class', 'paint-block');
                node.setAttribute('x', j);
                node.setAttribute('y', i);
                node.setAttribute('color', 'ffffff');
                gridContiner.appendChild(node)
            }
            gridContiner.appendChild(document.createElement('br'))
        }
    }

    function changeNodeColor(node) {
        const nodeColor = node.getAttribute('color')
        node.style.background = `#${nodeColor}`
    }

    // called every x seconds
    function refreshGridColor(grid) {
        for (let node of grid.children) {
            changeNodeColor(node);
        }
    }

    // called every x seconds
    function refreshGridData(grid) {
        let tweetsList = getAllvalidTweets()
        for (let node of grid.children) {
            for (let tweet of tweetsList) {
                if (`${parseInt(tweet[0], 10)}` === node.getAttribute('x') && `${parseInt(tweet[1], 10)}` === node.getAttribute('y')) {
                    node.setAttribute('color', tweet[2])
                    console.log('node is ' + node);
                }
            }
        }
        refreshGridColor(grid)
    }
})

function updateColor() {
    let rgb = []
    rgb[0] = document.getElementById("R").value
    rgb[1] = document.getElementById("G").value
    rgb[2] = document.getElementById("B").value
    document.getElementById("hexColor").innerHTML = rgb2hex(rgb[0], rgb[1], rgb[2])
    rgb[3] = rgb2hex(rgb[0], rgb[1], rgb[2])
    document.getElementById("color-picker-block").style.background = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    //console.log(rgb)
    //console.log(rgb2hex(rgb[0], rgb[1], rgb[2]))
    return rgb
}

function rgb2hex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

function tweetNewPixel(hexColor, x, y) {
    let htmlhex = hexColor.substring(1, 7)
    var formattedX = ("0" + x).slice(-2);
    var formattedY = ("0" + y).slice(-2);
    window, open(`https://twitter.com/intent/tweet/?text=%23PaintMeLikeOneOfYourBots%20(${formattedX},${formattedY},${htmlhex})`)
}
