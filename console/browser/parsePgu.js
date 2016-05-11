function addItem(curr, i) {
	curr0 = curr.classificatior ? curr.classificatior : undefined;
	// может быть несколько родителей в иерархии
    if (curr0) {
        var napravlenie = curr0.name;
    	while (typeof(curr0.parent) != 'undefined') {
    		curr0 = curr0.parent;
    		napravlenie = curr0.name + '&nbsp;&gt;&nbsp;' + napravlenie;
    	}
    }

	searchData[i + 1 + first_item_number] = curr;
	// заголовок блока, чего то может и не быть
	var headers = [];
	if (curr0 && curr.classificatior.name) {
		headers.push(curr.classificatior.name);
	}
	if (curr.shortName) {
		headers.push(curr.shortName);
	}
	var header = headers.join(', ') + '<br/>' + get_program_type(curr);

	// возраст
	var vozrast = get_vozrast_string(curr);

	var teacher = '';
	if (typeof(curr.teacher) != 'undefined') {
		teacher = '<strong>Преподаватель</strong>: ' + curr.teacher;
	}
	var test = 'без вступительных испытаний';
	if (typeof(curr.testService) != 'undefined' && curr.testService) {
		test = 'с вступительными испытаниями';
	}
	var raspisanie = '<span class="empty"></span>';
	if (typeof(curr.sheduleOfService) != 'undefined') {
		raspisanie = curr.sheduleOfService;
		// иногда бывает пустая строка
		if (raspisanie) {
			raspisanie = curr.sheduleOfService;
		} else {
			//raspisanie = '<span class="empty"></span>';
		}
	}
	var uchrezhdenie = '<span class="empty"></span>';//'DEBUG: нет organization.name';
	if (typeof(curr.organization.name) != 'undefined') {
		uchrezhdenie = curr.organization.name;
	}

	var address = '', unom = '';
	var address_show = '<span class="empty"></span>';//'DEBUG: нет organization.address.fullAddress';
	if (typeof(curr.placeService.address.fullAddress) != 'undefined') {
		address = curr.placeService.address.fullAddress;
		unom = (curr.placeService.address.unom) ? curr.placeService.address.unom : '';
		address_show = address || '<span class="empty"></span>'; // если нет адреса
	}
	var metro_id = false;
	var metro_txt = '';
	// metroStationId может быть массивом или одиночным значением
	if (typeof(curr.placeService.address.metro) != 'undefined'
		&& typeof(curr.placeService.address.metro.metroStationId) != 'undefined') {
		if (typeof(curr.placeService.address.metro.metroStationId) == 'object') {
			metro_id = curr.placeService.address.metro.metroStationId;
			var metro_arr = metro_id.map(get_metro_name);
			metro_txt = metro_arr.join(', ');

		} else {
			metro_id = curr.placeService.address.metro.metroStationId;
			metro_txt = get_metro_name(metro_id);
		}
	}
	if (!metro_txt) {
		metro_txt = '<span class="empty"></span>';
	}
	var priem = '';
	var priem_txt = '';
	var button_send = ' style="display: none;"';
	var button_info = ' style="display: none;"';
	if (typeof(curr.statusId) != 'undefined') {
		priem = curr.statusId;
	}
	if (priem != '-') {
		priem_txt = '<strong>Идет прием</strong>';
		button_send = '' //'Подать заявление';
	} else {
		priem_txt = '<strong>Приема нет</strong>';
		button_info = '';//'Уведомить об открытии записи';
	}

	var opisanie = '<span class="empty"></span>';
	if (curr.programmService != undefined && curr.programmService.string != undefined && !!curr.programmService.string) {
		opisanie = '<br>' + curr.programmService.string;
	}

	var poryadokpredost = '<span class="empty"></span>';
	if (curr.ruleService != undefined && curr.ruleService.string != undefined && !!curr.ruleService.string) {
		poryadokpredost = '<br>' + curr.ruleService.string;
	}

	var oplata = '<span class="empty"></span>';
	if (curr.finansing != undefined) {
		oplata = curr.finansing;
	}

	/*
	var contact_name_phone = '<span class="empty"></span>';
	if (curr.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource.name != undefined && curr.OrganizationResource.OrganizationResource.phone != undefined && curr.OrganizationResource.OrganizationResource.name && curr.OrganizationResource.OrganizationResource.phone) {
	contact_name_phone = '<strong>Контактное лицо</strong>: ' + curr.OrganizationResource.OrganizationResource.name + ', тел.: ' + curr.OrganizationResource.OrganizationResource.phone;
	}
	else {
	if (curr.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource.phone != undefined && curr.OrganizationResource.OrganizationResource.phone) {
	contact_name_phone = '<strong>Контактный телефон</strong>: ' + curr.OrganizationResource.OrganizationResource.phone;
	}
	}
	*/

	var contact_name = '<span class="empty"></span>';

	if (curr.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource.name != undefined && curr.OrganizationResource.OrganizationResource.phone != undefined && curr.OrganizationResource.OrganizationResource.name && curr.OrganizationResource.OrganizationResource.phone) {
		contact_name = curr.OrganizationResource.OrganizationResource.name;
	}

	var contact_phone = '<span class="empty"></span>';

	if (curr.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource != undefined && curr.OrganizationResource.OrganizationResource.phone != undefined && curr.OrganizationResource.OrganizationResource.phone) {
		contact_phone = curr.OrganizationResource.OrganizationResource.phone;
	}


	// в данный момент не реализовано на сервисе ЕСЗ, появится позже
	var has_foto = '<span class="empty"></span>';
	//	if (typeof(curr.organization.photos) != 'undefined') {
	//		has_foto = curr.organization.photos;
	//	}


	$('#search_result').append(OPR.templater('sServices_template', {
		style:          (i < 5) ? '' : 'display: none;',
		num:            i + 1 + first_item_number,
		napravlenie:    napravlenie,
		name:           curr.name.replace(/"/g, "&quot;").replace(/\r/g, " ").replace(/\n/g, " "),
		prepodavatel:   teacher,
		zachislenie:    test,
		raspisanie:     raspisanie,
		uchrezhdenie:   uchrezhdenie,
		address:        address_show,
		metro:          metro_txt,
		priem:          priem_txt,
		opisanie:       opisanie,
		poryadokpredost:poryadokpredost,
		oplata:         oplata,
		//contact_name_phone:   contact_name_phone,
		contact_name:	contact_name,
		contact_phone:	contact_phone,
		has_foto:		has_foto,
		unom:			unom,

		header:			header,
		vozrast:		vozrast,

		button_send_style:     button_send,
		button_info_style:     button_info
	}));
	if (!button_info) {
		add_button_info.push(i + 1 + first_item_number);
	}

	var parent_node = '#service_result_' + (i + 1 + first_item_number);
	$(parent_node + ' .item:has(span.empty)').remove();
	$(parent_node + ' a[data-unom=""]').remove(); // убрать ссылки "показать на карте" для которых сервис не выдал unom

	var shedule = (typeof(curr.itemsWorks) != 'undefined') && (typeof(curr.itemsWorks.ItemsWork) != 'undefined') && (typeof(curr.itemsWorks.ItemsWork.sheduleOfItemWork) != 'undefined') ? curr.itemsWorks.ItemsWork.sheduleOfItemWork : '';
	$('#button_send_' + (i + 1 + first_item_number)).attr('idNode', curr.id).attr('oivCode', curr.oivCode).attr('testService', !!curr.testService).data('sheduleOfItemWork', shedule);

	$('#button_info_' + (i + 1 + first_item_number)).attr('idNode', curr.id);

	// === данные для карты

	if (button_send) { // Уведомить
		tplBaloonFoot = '<center style="padding-top: 7px; white-space: nowrap;">' + $('<div></div>').append($('#button_info_' + (i + 1 + first_item_number)).clone().attr({
			'id': '#button_info_' + (i + 1 + first_item_number) + '_map',
			'onclick': '$("#button_info_' + (i + 1 + first_item_number) + '").trigger("click"); return false;'
		})).html() + '</center>';
	}
	if (button_info) { // Подать
		tplBaloonFoot = '<center style="padding-top: 7px;">' + $('<div></div>').append($('#button_send_' + (i + 1 + first_item_number)).clone().removeClass('button_send').attr({
			'id': '#button_send_' + (i + 1 + first_item_number) + '_map',
			'onclick': '$("#button_send_' + (i + 1 + first_item_number) + '").trigger("click"); return false;'
		})).html() + '</center>';
	}

	var tplBaloonBody = '<div style="line-height: 16px;">' +
	//'<a href="javascript:" onclick="if ($(\'#service_result_' + (i + 1 + first_item_number) + '\').is(\':visible\')) {$(\'html,body\').animate({\'scrollTop\': $(\'#service_result_' + (i + 1 + first_item_number) + '\').offset().top});} else {$(document).bind(\'ajaxComplete\', function() {$(\'html,body\').animate({\'scrollTop\': $(\'#service_result_' + (i + 1 + first_item_number) + '\').offset().top}); $(document).unbind(\'ajaxComplete\'); }); goToPage(' + Math.ceil((i + first_item_number) / 5) + ');}">' + curr.name + '</a>' +
	'<a href="javascript:" onclick="goto_record('+i+', this);return false;">' + curr.name + '</a>' +
	(raspisanie ? '<br><b>Расписание занятий</b>: ' + raspisanie : '' ) +
	(teacher ? '<br>' + teacher : '' ) +
	(uchrezhdenie ? '<br><b>Учреждение</b>: ' + uchrezhdenie : '' ) +
	'<br>' + tplBaloonFoot +
	'</div>';

	var tplBaloonHead = (curr0 && curr.classificatior.name) ? curr.classificatior.name : '';

	return {unom: unom, addr: '', baloon: {title:tplBaloonHead, content:tplBaloonBody}}; // не выводим адрес на карту
	//return {unom: unom, addr: address, baloon: {title:tplBaloonHead, content:tplBaloonBody}}; // выводим адрес на карту
};

var getItemFields = function(sectionBlock, i) {
    for (var item in sectionBlock) {
        if (item >= 0 && item <= 9) {
            var value = [
                beforeColon($(sectionBlock[item]).text()),
                afterColon($(sectionBlock[item]).text())
            ];
            switch (value[0]) {
                case 'Зачисление':
                    i.exam = value[1].trim();
                    break;
                case 'Расписание занятий':
                    i.schedule = value[1].trim();
                    break;
                case 'Учреждение':
                    i.school = value[1].trim();
                    break;
                case 'Возраст':
                    i.age = value[1].trim();
                    break;
                case 'Стоимость оказания услуги':
                    i.cost = value[1].trim();
                    break;
                case 'Контактное лицо':
                    i.contact = value[1].trim();
                    break;
                case 'Телефон':
                    i.phone = value[1].trim();
                    break;
            }
        }
    }
    return i;
};

var beforeColon = function(string) {
    return string.slice(0, string.indexOf(':'));
}

var afterColon = function(string) {
    return string.slice(string.indexOf(':') + 2).trim();
};

var afterComma = function(string) {
	return string.slice(string.indexOf(',') + 2).trim();
}

var parseItem = function(section) {
    var item = {};
    // Направление
    item.sphere = $(section[0]).find('.item_header').html().split('<br>')[0].split(',')[0];
    // Уровень
    item.level = $(section[0]).find('.item_header').html().split('<br>')[1];
    // Метро
    item.metro = $(section[0]).find('.metro2').text();
    // Адрес
    item.address = $(section[1]).find('.address').text();
    // Название
    var name = afterComma($(section[0]).find('.item_header').html().split('<br>')[0]);
    if (name) {
        item.name = name.trim();
    }
    // Описание
    var description = $(section[5]).find('.item').find('.expand_div');
    item.description = (description[1]) ?
        $(description[0]).text() :
        description.text();

	if (description[1]) {
		item.description = $(description[0]).text();
		// Допуск
		item.conditions = $(description[1]).text();
	} else {
		item.description = description.text();
	}

	item = getItemFields($(section[2]).find('.item'), item);
	item = getItemFields($(section[3]).find('.item'), item);
    item = getItemFields($(section[5]).find('.item'), item);
    return item;
};

var appendResult = function(data) {
	var leftDivData = data.slice(0, data.length / 2),
		rightDivData = data.slice(data.length / 2);
	$('body').replaceWith(
		'<div style="display: inline-block; width: 50%;">' +
		JSON.stringify(leftDivData) +
		'</div>' +
		'<div style="display: inline-block; width: 50%;">' +
		JSON.stringify(rightDivData) +
		'</div>'
	);
};

var result = [],
    delay = 7500;

var processBlock = function(pag, del) {
    setTimeout(function(){
        var resBlock = $('.result-block');
        for (var i = 0, l = resBlock.length - 3; i < l; i++) {
            var section = $(resBlock[i]).find('.r-l');
            result.push(parseItem(section));
        }

        goToPage(pag);
        console.log('Processed ' + parseFloat(pag - 20));
        if (page >= 16981) {
            appendResult(result);
        }
    }, del);
};

for (var page = 21; page < 16901; page += 20) {

    processBlock(page, delay);

    delay += 7500;
}
