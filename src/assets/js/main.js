(function() {
  
	var app = {
		
		initialize : function () {	
			this.setUpListeners();
		},

		setUpListeners: function () {
			$('form').on('submit', app.submitForm);
			$('form').on('keydown', '.has-error', app.removeError);
		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]'); 

			// если валидация не проходит - то дальше не идём
			if ( app.validateForm(form) === false )	return false; 

			var str = form.serialize();   

			// против повторного нажатия
	        submitBtn.attr({disabled: 'disabled'});

            $.ajax({
                type: "POST",
                url: "assets/php/contact_process.php",
                data: str                
            }).done(function(msg) {
                	if(msg == 1) {
                		result = '<div class="bg-success message">Спасибо за Ваше обращение, наш специалист свяжется с Вами в ближайшее время.</div><div class="out_message_BTN"><button id="submit" type="button" class="btn" data-dismiss="modal">Закрыть</button></div>';
                    	form.html(result);
                    }
                	else {
                		result = '<div class="bg-error message">Произошла ошибка, попробуйте повторить запрос через несколько минут.</div><div class="out_message_BTN"><button id="submit" type="button" class="btn btn" data-dismiss="modal">Закрыть</button></div>';
                    	form.html(result);
                    };
                    
                	
            }).always(function(){
            	submitBtn.removeAttr("disabled");
            })
		},

		validateForm: function (form){

			var inputs = form.find('input'),
				valid = true;
			
			inputs.tooltip('destroy');

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formGrout = input.parents('.form-group'),
					label = formGrout.find('label').text().toLowerCase(),
					textError = 'Введите ' + label;

				if(val.length === 0){
					formGrout.addClass('has-error').removeClass('has-success');	
					input.tooltip({
						trigger: 'manual',
						placement: 'bottom',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formGrout.removeClass('has-error').addClass('has-success');
					input.tooltip('hide');
				}	
			});

			return valid;
			
		},

		removeError: function() {
			$(this).removeClass('has-error').find('input').tooltip('destroy');
		}
		
	}

	app.initialize();

}());