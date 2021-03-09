(function($){
	$(document).ready(function(){
		var $defaultSetting = {
			formatNoMatches: devvn_array.formatNoMatches,
		};
		var loading_billing = loading_shipping = false;
        var billing_city_field = $('#billing_city_field');
        var billing_address_2_field = $('#billing_address_2_field');
        var shipping_city_field = $('#shipping_city_field');
        var shipping_address_2_field = $('#shipping_address_2_field');
		//billing
		$('#billing_state').select2($defaultSetting);
		$('#billing_city').select2($defaultSetting);
		$('#billing_address_2').select2($defaultSetting);
		
		$('body #billing_state').on('change select2-selecting',function(e){
            $( "#billing_city option" ).val('');
			var matp = e.val;			
			if(!matp) matp = $( "#billing_state option:selected" ).val();
			if(matp && !loading_billing){
				loading_billing = true;
				$.ajax({
					type : "post",
					dataType : "json",
					url : devvn_array.admin_ajax,
					data : {action: "load_diagioihanhchinh", matp : matp},
					context: this,
                    beforeSend: function(){
                        billing_city_field.addClass('devvn_loading');
                        billing_address_2_field.addClass('devvn_loading');
                    },
					success: function(response) {
						loading_billing = false;
						$("#billing_city,#billing_address_2").html('').select2();
						if(response.success) {
							var listQH = response.data;
							var newState = new Option('', '');
							$("#billing_city").append(newState);
							$.each(listQH,function(index,value){
								var newState = new Option(value.name, value.maqh);
								$("#billing_city").append(newState);
							});
						}
                        billing_city_field.removeClass('devvn_loading');
                        billing_address_2_field.removeClass('devvn_loading');
					}
				});
			}
		});
		if($('#billing_address_2').length > 0){
			$('#billing_city').on('change select2-selecting',function(e){			
				var maqh = e.val;
                if(!maqh) maqh = $( "#billing_city option:selected" ).val();
                if(maqh) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: devvn_array.admin_ajax,
                        data: {action: "load_diagioihanhchinh", maqh: maqh},
                        context: this,
                        beforeSend: function(){
                            billing_address_2_field.addClass('devvn_loading');
                        },
                        success: function (response) {
                            $("#billing_address_2").html('').select2($defaultSetting);
                            if (response.success) {
                                var listQH = response.data;
                                var newState = new Option('', '');
                                $("#billing_address_2").append(newState);
                                $.each(listQH, function (index, value) {
                                    var newState = new Option(value.name, value.xaid);
                                    $("#billing_address_2").append(newState);
                                });
                            }
                            billing_address_2_field.removeClass('devvn_loading');
                        }
                    });
                }
			});
		}
		//shipping
		$('#shipping_state').select2($defaultSetting);
		$('#shipping_city').select2($defaultSetting);
		$('#shipping_address_2').select2($defaultSetting);
		
		$('body #shipping_state').on('change select2-selecting',function(e){
            $( "#shipping_city option" ).val('');
			var matp = e.val;
			if(!matp) matp = $( "#shipping_state option:selected" ).val();
			if(matp && !loading_shipping){
				loading_shipping = true;
				$.ajax({
					type : "post",
					dataType : "json",
					url : devvn_array.admin_ajax,
					data : {action: "load_diagioihanhchinh", matp : matp},
					context: this,
                    beforeSend: function(){
                        shipping_city_field.addClass('devvn_loading');
                        shipping_address_2_field.addClass('devvn_loading');
                    },
					success: function(response) {
						loading_shipping = false;
						$("#shipping_city,#shipping_address_2").html('').select2();
						if(response.success) {
							var listQH = response.data;
							var newState = new Option('', '');
							$("#shipping_city").append(newState);
							$.each(listQH,function(index,value){
								var newState = new Option(value.name, value.maqh);
								$("#shipping_city").append(newState);
							});
						}
                        shipping_city_field.removeClass('devvn_loading');
                        shipping_address_2_field.removeClass('devvn_loading');
					}
				});
			}
		});
		if($('#shipping_address_2').length > 0){
			$('#shipping_city').on('change select2-selecting',function(e){
				var maqh = e.val;
                if(!maqh) maqh = $( "#shipping_city option:selected" ).val();
                if(maqh) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: devvn_array.admin_ajax,
                        data: {action: "load_diagioihanhchinh", maqh: maqh},
                        context: this,
                        beforeSend: function(){
                            shipping_address_2_field.addClass('devvn_loading');
                        },
                        success: function (response) {
                            $("#shipping_address_2").html('').select2($defaultSetting);
                            if (response.success) {
                                var listQH = response.data;
                                var newState = new Option('', '');
                                $("#shipping_address_2").append(newState);
                                $.each(listQH, function (index, value) {
                                    var newState = new Option(value.name, value.xaid);
                                    $("#shipping_address_2").append(newState);
                                });
                            }
                            shipping_address_2_field.removeClass('devvn_loading');
                        }
                    });
                }
			});
		}
		$(window).on('load', function(){
			$('#billing_state,#shipping_state').trigger('change');
		});
	});
})(jQuery);