(function( $ ) {

  $.fn.select = function(customOptions) {

  	var options = {

  		'list' : 'select-list',
  		'item' : 'select-list__item',
  		'btn' : 'select-btn'

  	};

  	options = $.extend(true, options, customOptions);
	  
	  // Проверяем инициализирован уже селект или нет, на случай подгрузки Ajax`ом

	  if(this.parent('.select-style').length){
	  	return; // Если селект уже инициализирован, то просто завершаем работу
	  }
  
    var select = this; //Создаем переменную с селектом

    select.css('display','none'); // Скрываем селект

	select.after('<ul class="' + options.list + '"></ul>') // Создаем выпадающий список кастомного селекта

	var list = $('.' + options.list);

	list.css({'display':'none'}); // Скрываем выпадающий список

	list.before('<div class="' + options.btn + '"></div>'); // Сам кастомный селект

	var selectBtn = $('.' + options.btn);

	var i = 0;

	select.find('option').each(function () { // Копируем значения из селекта в наш список

		var optionText = $(this).text();

		list.append('<li data-number="' + i + '" class="' + options.item + '">' + optionText + '</li>');

		i++;

	});

	selectBtn.text(list.find('li').eq(0).text()); // Добавляем текст из первого элемента списка в кастомный селект

	selectBtn.click(function () {
		
		$(this).next('.' + options.list).slideToggle(); // По клику на псевдо-селекте показываем/скрываем список

	});

	list.find('li').click(function(){

		// По клику на пункте списка копируем текст из выбранного пункта в псевдо-селект
		// и устанавливаем соответствующее значение в настоящем селекте

		selectBtn.text($(this).text());

		var dataNumber = $(this).attr('data-number');

		select.find('option').eq(dataNumber).prop('selected', true);

		$(this).parent().toggle();

	});

  };

})(jQuery);
