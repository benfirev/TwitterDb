$(() => {

    let iframe
    const gridSize = 10

    //LOGIC

    drawGrid(gridSize)

    document.getElementById("start").onclick = () => {
        function iframeRef(frameRef) {
            return frameRef.contentWindow ?
                frameRef.contentWindow.document :
                frameRef.contentDocument
        }

        iframe = iframeRef(document.getElementById('twitter-widget-0'))

        refreshGrid(document.getElementById('grid-container'))
        console.log(getPixels())
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

    function getPixels() {
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

    function refreshGrid(grid) {
        console.log(grid);
        for(let node of grid.children) {
            console.log(node)
            changeNodeColor(node);
        }
    }


})
