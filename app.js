var localData, search;

$.getJSON("localData.json", function (response) {
    localData = response;
}).fail(function (xhr, status, error) {
    console.log("Terjadi kesalahan: " + status, error);
});

function searchData(object) {
    let result = [];
    for(let key in localData){
        if(localData.hasOwnProperty(key) && key.toLowerCase().startsWith(object.toLowerCase())){
            let thisData = localData[key];
            thisData['name'] = key;
            result.push(thisData);
        }
    }
    return result;
}

function searchSelector(){
    $(".selectOptions").each(function (index, element) {
        $(element).click(function(){
            $("#search").val(searchData($(this).attr('data-index'))[0].name);

            $("span.dataName").text(searchData($(this).attr('data-index'))[0].name);
            $("span.dataSpell").text(searchData($(this).attr('data-index'))[0].spelling);
            $("span.dataTranslate").text(searchData($(this).attr('data-index'))[0].translate);
            $("span.dataType").text(searchData($(this).attr('data-index'))[0].type);
            $("span.dataDefenition").text(searchData($(this).attr('data-index'))[0].defenition);
            $("span.dataFunction").text(searchData($(this).attr('data-index'))[0].function);
        });
    });
}

$("#search").keydown(function() {
    clearTimeout(search);

    search = setTimeout(() => {
        $(".searchOptions").html("");
        if($(this).val()){
            searchData($(this).val()).forEach(element => {
                $(".searchOptions").append(`<div class="selectOptions col-12" data-index="${element.name}">${element.name}</div>`);
            });
        };
        searchSelector();
    }, 250);
}).focus(function() {
    if($(this).val()){
        searchData($(this).val()).forEach(element => {
            $(".searchOptions").append(`<div class="selectOptions col-12" data-index="${element.name}">${element.name}</div>`);
        });
        searchSelector();
    }
}).blur(function() {
    setTimeout(() => {
        $(".searchOptions").html("");
    }, 25);
});
