jQuery(function() {
    var BIGJSON = {};
    function request(method) {
        var url = jQuery('.area-url').val();
        var value = jQuery('.area').val();
        var data = (method == 'get' && value) ?
            JSON.parse(value) :
            value;

        var ajaxParams = {
            url: url,
            data: data,
            method: method
        };

        if (method != 'get') {
            ajaxParams.contentType = 'application/json';
        }

        jQuery.ajax(ajaxParams)
            .done(function(data) {
               // jQuery('.output').text(JSON.stringify(data));
               $('.output').empty();
               $('.output').jsonView(data);
            })

            .error(function(data) {
                jQuery('.output').text(data.responseText);
            });
    }

    var sendButtonClickHandler = function() {
        if ($(".get-rb").prop("checked")) {
            request('get');
        }
        if ($(".post-rb").prop("checked")) {
            request('post');
        }
        if ($(".put-rb").prop("checked")) {
            request('put');
        }
        if ($(".delete-rb").prop("checked")) {
            request('delete');
        }

    };

    var groupSelectOnchangeHandler = function () {
        setPaths($(this).val());

    };


    var changePath = function (string) {
        $(".area-url").val('/'+string);
    }

    var changeRb = function (type) {
        //$(".area-url").val('/'+string);
        if (type == "get") {
            $(".get-rb").prop("checked", true)
        }
        if (type == "post") {
            $(".post-rb").prop("checked", true)
        }
        if (type == "put") {
            $(".put-rb").prop("checked", true)
        }
        if (type == "delete") {
            $(".delete-rb").prop("checked", true)
        }
    }

    var changeText = function (json) {
        console.log(json);
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
            $('.group-select :nth-child(1)').attr("selected", "selected");
            $('.path-select :nth-child(1)').attr("selected", "selected");
            pathSelectOnchangeHandler();
        });

    };

    var setPaths = function(groupName) {
        $(".path-select").empty();
        for (var i = 0; i < BIGJSON.length; i++) {
            if (BIGJSON[i].group == groupName)
                $(".path-select").append( $('<option value='+BIGJSON[i].name+'>'+BIGJSON[i].name+'</option>'));
        }
        $('.path-select :nth-child(1)').attr("selected", "selected");
        pathSelectOnchangeHandler();
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
