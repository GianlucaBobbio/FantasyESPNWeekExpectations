if (document.title.indexOf("ESPN") != -1) {
    main();
}

function main() {
    reloadListener();
}

function reloadListener() {
    var btn = document.createElement("DIV");
    btn.className = "button-loadExpectedWeek";
    btn.onclick = loadNumbers;
    $("#playerTableContainerDiv").before(btn);
    // $("#loadExpectedWeek").click(loadNumbers);
}

function loadNumbers() {
    $("#ExpectationsStatsRow").remove();
    var index;
    var limitRow = $(".playerTableBgRowHead.tableHead.playertableSectionHeader").eq(1);
    var prevRow = limitRow.prevAll('tr:first');
    prevRow.after('<tr id="ExpectationsStatsRow">' + prevRow.html() + '</tr>');
    var statsRow = limitRow.prevAll('tr:first');
    statsRow.children('td.playerSlot').html('');
    statsRow.children('td.playertableData').html('');
    statsRow.children('td[id*=playeredit]').html('');
    statsRow.children('td.playerEditSlot').html('');
    statsRow.children('td.playertablePlayerName').html('Expectations');
    statsRow.children('td.cumulativeOpponents').each(function() {
        var tdIndex = $(this).index();
        var suma = 0;
        statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex + 1) + ")").each(function() {
            var value = $(this).html().charAt(0);
            if ($.isNumeric(value)) {
                suma = suma + parseFloat(value);
            }
        });
        suma = "Total Games: " + suma;
        $(this).html(suma);
    });
    statsRow.children('td.playertableStat').each(function() {
        var tdIndex = $(this).index();
        var suma = 0;
        var sumamade = 0;
        var sumaattempted = 0;
        statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex + 1) + ")").each(function() {
            var value = $(this).html();
            if ($.isNumeric(value)) {
                if (value.charAt(0) != ".") {
                    var games = parseInt($(this).parent().find('.cumulativeOpponents').html().charAt(0));
                    suma = suma + (parseFloat(value) * games);
                }
            } else {
                if (/(?:\d*\.)?\d+\/(?:\d*\.)?\d+/g.test(value)) {
                    var games = parseInt($(this).parent().find('.cumulativeOpponents').html().charAt(0));
                    var made = value.split("/")[0];
                    var attempted = value.split("/")[1];
                    sumamade = sumamade + (parseFloat(made) * games);
                    sumaattempted = sumaattempted + (parseFloat(attempted) * games);
                }
            }
        });
        if (sumaattempted > 0) {
            suma = "" + sumamade.toFixed(2) + "/" + sumaattempted.toFixed(2);
            $(this).html(suma);
            var sumaPorc = sumamade / sumaattempted;
            var sumaPorcString = "" + sumaPorc.toFixed(3);
            $(this).next().html(sumaPorcString.substring(1));
        } else {
            if ($(this).html().charAt(0) != ".") {
                $(this).html(suma.toFixed(2));
            }
        }
    });
}
