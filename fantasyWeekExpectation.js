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
}

function loadNumbers() {
    $("#ExpectationsStatsRow").remove();
    var limitRow = $(".playerTableBgRowHead.tableHead.playertableSectionHeader").eq(1);
    var prevRow = limitRow.prevAll('tr:first');
    prevRow.after('<tr id="ExpectationsStatsRow">' + prevRow.html() + '</tr>');
    var statsRow = limitRow.prevAll('tr:first');
    var headerRow = limitRow.prevAll('.playerTableBgRowSubhead.tableSubHead:first');
    statsRow.children('td').html('');
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
        if (headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FG%") < 0 && headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FT%") < 0) {
            if (headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("MIN") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("3PM") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("REB") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("AST") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("STL") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("BLK") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("PTS") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("TO") >= 0) {
                var suma = 0;
                statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex + 1) + ")").each(function() {
                    var value = $(this).html();
                    if ($.isNumeric(value)) {
                        if (value.charAt(0) != ".") {
                            var cumulativeOpponents = $(this).parent().find('.cumulativeOpponents');
                            if (cumulativeOpponents.length > 0) {
                                var games = parseInt(cumulativeOpponents.html().charAt(0));
                            } else {
                                var games = 1;
                            }
                            suma = suma + (parseFloat(value) * games);
                        }
                    }
                });
                $(this).html(suma.toFixed(2));
            }
            if ((headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FGM") >= 0 && headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FGA") >= 0) || (headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FTM") >= 0 && headerRow.find("td:nth-child(" + (tdIndex + 1) + ")").html().indexOf("FTA") >= 0)) {
                var sumamade = 0;
                var sumaattempted = 0;
                statsRow.prevAll('tr').find("td:nth-child(" + (tdIndex + 1) + ")").each(function() {
                    var value = $(this).html();
                    if (/(?:\d*\.)?\d+\/(?:\d*\.)?\d+/g.test(value)) {
                        var made = value.split("/")[0];
                        var attempted = value.split("/")[1];
                        var cumulativeOpponents = $(this).parent().find('.cumulativeOpponents');
                        if (cumulativeOpponents.length > 0) {
                            var games = parseInt(cumulativeOpponents.html().charAt(0));
                        } else {
                            var games = 1;
                        }
                        sumamade = sumamade + (parseFloat(made) * games);
                        sumaattempted = sumaattempted + (parseFloat(attempted) * games);
                    }
                });
                var suma = "" + sumamade.toFixed(2) + "/" + sumaattempted.toFixed(2);
                $(this).html(suma);
                var sumaPorc = sumamade / sumaattempted;
                var sumaPorcString = "" + sumaPorc.toFixed(3);
                if (headerRow.find("td:nth-child(" + (tdIndex + 2) + ")").html().indexOf("FG%") >= 0 || headerRow.find("td:nth-child(" + (tdIndex + 2) + ")").html().indexOf("FT%") >= 0) {
                    $(this).next().html(sumaPorcString.substring(1));
                }
            }
        }
    });
}
