$(() => {
    $('button').click(() => {
        function iframeRef(frameRef) {
            return frameRef.contentWindow ?
                frameRef.contentWindow.document :
                frameRef.contentDocument
        }

        const inside = iframeRef(document.getElementById('twitter-widget-0'))

        function tweetsToList() {
            const tweetList = inside.getElementsByClassName("timeline-Tweet-text")
            for(let ti of tweetList){
                console.log(ti.textContent)
            }
        }


        tweetsToList();
    })
})
