/**
 * JQuery Plugin for a modal box
 * Will create a simple modal box with all HTML and styling
 * 
 * Author: Paul Underwood
 * URL: http://www.paulund.co.uk
 * 
 * Available for free download from http://www.paulund.co.uk
 */

(function($){

	// Defining our jQuery plugin

	$.fn.paulund_modal_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "150",
			width : "500",
			title:"Select the acquisition system",
			top: "20%",
			left: "30%",
		},prop);
				
		//Click event on element
		return this.click(function(e){
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.paulund_modal_box').fadeIn();
		});
		
		/**
		 * Add styles to the html markup
		 */
		 function add_styles(){			
			$('.paulund_modal_box').css({ 
				'position':'absolute', 
				'left':options.left,
				'top':options.top,
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2', 
				'z-index':'50',
				'overflow': 'visible'
			});
			$('.paulund_modal_close').css({
				'position':'relative',
				'top':'-25px',
				'left':'20px',
				'float':'right',
				'display':'block',
				'height':'50px',
				'width':'50px',
				'background': 'url(../images/close.png) no-repeat'
			});
			$('.paulund_block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':'100%',
				'width':'100%',
				'z-index':'10'
			});
			$('.paulund_inner_modal_box').css({
				'background-color':'#fff',
				'height':'calc(100% - 50px)',
				'width':(options.width - 50) + 'px',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});
			$('.button_style').css({
				'height': '100%',
				'width' : '50%',
				'background' : 'none repeat scroll 0 0 #2c2c2b',
				'border': '1px solid #595957',
				'padding': '5px',
				'padding-left': '11px',
				'color': '#999',
				'margin-bottom': '10px',
				'bottom': '0px',
				'border': '1px solid #FFF'
			});
			$('.button_style.import_PC span').css({
				'padding-left': '30px',
				'background': 'url(../images/frame.png) no-repeat 0 0px',			
				'background-size':'contain'
			});
			$('.button_style.take_pict span').css({
				'padding-left': '30px',
				'background': 'url(../images/camera.png) no-repeat 0 0px',
				'background-size':'contain'
			});
			$('.bottom_pos').css({
				'position': 'absolute',
				'height': '50px',
				'border': '1px solid',
				'width': '450px',
				'bottom': '15px'
			});
		}
		
		 /**
		  * Create the block page div
		  */
		 function add_block_page(){
			var block_page = $('<div class="paulund_block_page"></div>');
						
			$(block_page).prependTo('body');
		}
		
			function prev(){
				// freeze camera so user can preview pic
				Webcam.freeze();
				
				// swap button sets
				document.getElementById('post_take_buttons').style.display = '';
			}
			
			 function cancel_preview(){
				 // cancel preview freeze and return to live camera feed
				Webcam.unfreeze();
				document.getElementById('post_take_buttons').style.display = 'none';
			 }
			 function save_photo() {
				// actually snap photo (from preview freeze) and display it
				Webcam.snap( function(data_uri) {
					$('div#final_photo').empty();
					$('<img src = "' + data_uri +'"/>').appendTo($('div#final_photo'));
					document.getElementById('post_take_buttons').style.display = 'none';
				} );
			}	
			var opened = false;
		 /**
		  * Creates the modal box
		  */
		 function add_popup_box(){
			 opened = false;
			 var pop_up = $('<div class="paulund_modal_box">' + 
			 					'<a href="#" class="paulund_modal_close"></a>' + 
								'<div class="paulund_inner_modal_box">' + 
									'<h2>' + options.title + '</h2>' + 
									'<center><div id="my_cam" style="position: relative"></div></center>'+
									'<div id="post_take_buttons" style="display:none">' + 
										'<input id="takeAn" type=button value="&lt; Take Another" style="float: left;">' +
										'<input id="save_pic" type=button value="Save Photo &gt;" onClick="save_photo()" style="font-weight:bold;float:right;">' +
									'</div><input type="file" id="myfile" style="display:none;">'+
									'<div class="bottom_pos"><button class="button_style import_PC"><span>Import from PC</span></button>' +
									'<button class="button_style take_pict"><span>Import from Camera</span></button></div>' +
								'</div>' + 
							'</div>');
			 $(pop_up).appendTo('.paulund_block_page');
			 Webcam.set({
					width: 400,
					height: 300,
					image_format: 'jpeg',
					jpeg_quality: 90
			});
			$('input#takeAn').click(cancel_preview);
			$('input#save_pic').click(save_photo);
			$('button.button_style.import_PC').click(function(){
				$('#myfile').click();
			});
			$('#myfile').change(function() {
				//$('#mytext').val($(this).val());
				 var input = this;
				 if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
					  $('div#final_photo').empty();
					  $('<img src = "' + e.target.result + '"/>').appendTo($('div#final_photo'));
					  $('.paulund_modal_box').stop().animate({height:'500px'});
					  if(opened == false){
						  opened = true;
						  $('<img src = "' + e.target.result + '" style="max-width: 400px; max-height: 300px;"/>').appendTo('#my_cam');						
					  }
$('#boxes').css('height', $('.sidebar_container').outerHeight() - ($('#boxes').position().top - $('#boxes').parent().offset().top) - 10 + 'px');
					};
					reader.readAsDataURL(input.files[0]);
				  }
			});
			 $('button.button_style.take_pict').click(function(){
				 if(opened == false){
					opened = true;
					$('.paulund_modal_box').stop().animate({height:'500px'});
				 }
				 Webcam.attach('my_cam');
				 Webcam.on( 'live', function() {
 					$('<div class="button_snap"></div>').appendTo('#my_cam');
					 $('.button_snap').css({
						'background-image': 'url("../images/pic_conf.png")',
						'cursor': 'pointer',
						'width': '50px',
						'height': '50px',
						'position': 'absolute',
						'background-repeat': 'no-repeat',
						'background-size': 'contain',
						'left': 'calc(50% - 25px)',
						'top': '250px'
					});				
					$('div.button_snap').click(prev);
				} );
			 });
			 $('.paulund_modal_close').click(function(){
				Webcam.reset();
				$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();				 
			 });
		}
		return this;
	};
	
})(jQuery);
