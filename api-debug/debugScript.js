jQuery(function() {
    var BIGJSON = {};
    function request(method) {
        var url = jQuery('.area-url').val();
        var value = jQuery('.area').val();
        var data = value ? JSON.parse(value) : null;

        jQuery[method](url, data)
            .done(function(data) {
                jQuery('.output').text(JSON.stringify(data));
            })
            .error(function(data) {
                jQuery('.output').text(data.responseText);
            });
    }

    var sendButtonClickHandler = function() {
        if ($(".get-rb").prop("checked"))
            request('get');
        else
            request('post');

    };

    var groupSelectOnchangeHandler = function () {
        setPaths($(this).val());

    };


    var changePath = function (string) {
        $(".area-url").val('/'+string);
    }

    var changeRb = function (type) {
        //$(".area-url").val('/'+string);
        if (type == "get")
            $(".get-rb").prop("checked", true)
        else
            $(".post-rb").prop("checked", true)
    }

    var changeText = function (json) {
        $(".area").val(json);
    }

    var changeDescription = function (text) {
        $(".description").text(text);
    }

    var pathSelectOnchangeHandler = function () {
        var name =  $(".path-select").val();
        var group = $(".group-select").val();
        var item = BIGJSON.find(function(el){
            if (el.name == name && el.group == group)
                return true;
        }) || {url:"", type:"post", title: "null" };
        console.log(item);
        changePath(item.url);
        changeRb(item.type);
        changeDescription(item.title);
        var json;
        try {
            json = item.parameter.examples[0].content || "";
        } catch (e) {
            json = "";
        }
        changeText(json);
    };

    var loadData = function () {
        $.get( "debugdata", function( data ) {
            $( ".result" ).html( data );
            BIGJSON = data;
            var catArray = [];
            for (var i = 0; i < data.length; i++){
                //console.log(data[i].group);
                var gr = data[i].group;
                if (catArray.indexOf(gr) == -1)
                    catArray.push(gr);
            }
            setCategories(catArray);
            setPaths(catArray[0]);

        });

    };

    var setPaths = function(groupName) {
        $(".path-select").empty();
        for (var i = 0; i < BIGJSON.length; i++) {
            if (BIGJSON[i].group == groupName)
                $(".path-select").append( $('<option value='+BIGJSON[i].name+'>'+BIGJSON[i].name+'</option>'));
        }
    }

    var setCategories = function(catArray) {
        $(".group-select").empty();
        catArray.forEach (function(el){
            $(".group-select").append( $('<option value='+el+'>'+el+'</option>'));
        })
    }

    loadData();
    jQuery('.group-select').change(groupSelectOnchangeHandler );
    jQuery('.path-select').change(pathSelectOnchangeHandler);
    jQuery('.btn').click(sendButtonClickHandler);
});
