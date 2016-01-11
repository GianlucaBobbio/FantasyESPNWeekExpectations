if (document.title.indexOf("ESPN") != -1) {
    main();
}

function main() {
    var index;
    var limitRow = $(".playerTableBgRowHead.tableHead.playertableSectionHeader").eq(1);
    console.log(limitRow);
    var prevRow = limitRow.prevAll('tr:first');
    console.log(prevRow);
    prevRow.after('<tr>' + prevRow.html() + '</tr>');
    console.log('<tr>' + limitRow.prev() + '</tr>');
    var statsRow = limitRow.prevAll('tr:first');
    statsRow.children('td.playerSlot').html('');
    statsRow.children('td.playertableData').html('');
    statsRow.children('td[id*=playeredit]').html('');
    statsRow.children('td.playertablePlayerName').html('Expectations');
    statsRow.children('td.cumulativeOpponents').each(function() {
        var tdIndex = $(this).index();
        var suma = 0;
        statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex+1) + ")").each(function(){
            var value = $(this).html().charAt(0);
            if($.isNumeric(value)){
                suma = suma + parseFloat(value);
            }
        });
        suma = "Total Games: " + suma;
        $(this).html(suma);
    });
    statsRow.children('td.playertableStat').each(function() {
        var tdIndex = $(this).index();
        var suma = 0;
        statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex+1) + ")").each(function(){
            var value = $(this).html();
            if($.isNumeric(value)){
                var games = $(this).parent().find('.cumulativeOpponents').html().charAt(0);
                suma = suma + (parseFloat(value) * parseInt(games));
            }
        });
        suma = suma;
        $(this).html(suma.toFixed(2));
    });
}

function addDynamicallyRedditButton() {
    var tweet = $(this).get(0);
    addRedditButton(tweet);
}

function addRedditButton(argTweet) {
    var tweet = argTweet;
    if (tweet.getElementsByClassName("button-retwddit").length < 1) {
        var fullname = tweet.getElementsByClassName("fullname")[0];
        var tweetText = tweet.getElementsByClassName("tweet-text")[0];
        var url = tweet.getElementsByClassName("js-permalink")[0];
        if (fullname && tweetText && url) {
            var btn = document.createElement("DIV");
            btn.className = "button-retwddit";
            btn.fullname = "[" + fullname.innerText + "]";
            btn.tweetText = tweetText.innerText;
            btn.text = btn.fullname + " " + btn.tweetText;
            btn.url = url.href;
            btn.onclick = copyToClipboard;
            tweet.getElementsByClassName("ProfileTweet-actionList")[0].appendChild(btn);
        }
    }
}

function copyToClipboard(event) {
    var text = event.target.text;
    var url = event.target.url;
    window.prompt("Copy to the title and url", text + " " + url);
}
